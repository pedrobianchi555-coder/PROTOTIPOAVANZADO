-- Add new columns for the refined capacity logic
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS production_factor numeric DEFAULT 0; -- The "factor" (kg/ha ?)
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS yearly_production_kg numeric DEFAULT 0; -- hectares * factor

-- Ensure other columns exist (from previous schema check, they should, but good to be safe)
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS hectares numeric DEFAULT 0;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS used_capacity numeric DEFAULT 0;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS available_capacity numeric DEFAULT 0;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS yield_estimate numeric DEFAULT 0; -- Now represents % yield

-- Function to recalculate metrics for a single producer
CREATE OR REPLACE FUNCTION recalculate_producer_metrics(target_producer_id uuid)
RETURNS void AS $$
DECLARE
    _hectares numeric;
    _factor numeric;
    _yearly_production numeric;
    _used_capacity numeric;
    _available_capacity numeric;
    _yield_estimate numeric;
BEGIN
    -- 1. Get current static data
    SELECT hectares, production_factor INTO _hectares, _factor
    FROM suppliers WHERE id = target_producer_id;
    
    _hectares := COALESCE(_hectares, 0);
    _factor := COALESCE(_factor, 0);

    -- 2. Calculate Yearly Production
    _yearly_production := _hectares * _factor;
    
    -- 3. Calculate Used Capacity (Sum of all assignments)
    SELECT COALESCE(SUM(contribution_kg), 0) INTO _used_capacity
    FROM traceability_assignments
    WHERE producer_id = target_producer_id;

    -- 4. Calculate Available Capacity
    _available_capacity := _yearly_production - _used_capacity;

    -- 5. Calculate Yield Estimate (%)
    IF _yearly_production > 0 THEN
        _yield_estimate := (_used_capacity / _yearly_production) * 100;
    ELSE
        _yield_estimate := 0;
    END IF;

    -- 6. Update Supplier Record
    UPDATE suppliers
    SET 
        yearly_production_kg = _yearly_production,
        used_capacity = _used_capacity,
        available_capacity = _available_capacity,
        yield_estimate = _yield_estimate
    WHERE id = target_producer_id;

END;
$$ LANGUAGE plpgsql;

-- Trigger Function for Traceability Assignments (Insert/Update/Delete)
CREATE OR REPLACE FUNCTION trigger_recalculate_capacity_on_assignment()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        PERFORM recalculate_producer_metrics(OLD.producer_id);
    ELSIF (TG_OP = 'INSERT') THEN
        PERFORM recalculate_producer_metrics(NEW.producer_id);
    ELSIF (TG_OP = 'UPDATE') THEN
        -- If producer changed, update both
        IF OLD.producer_id <> NEW.producer_id THEN
            PERFORM recalculate_producer_metrics(OLD.producer_id);
            PERFORM recalculate_producer_metrics(NEW.producer_id);
        ELSE
            PERFORM recalculate_producer_metrics(NEW.producer_id);
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger Definition for Assignments
DROP TRIGGER IF EXISTS trg_update_capacity_assignment ON traceability_assignments;
CREATE TRIGGER trg_update_capacity_assignment
AFTER INSERT OR UPDATE OR DELETE ON traceability_assignments
FOR EACH ROW EXECUTE FUNCTION trigger_recalculate_capacity_on_assignment();

-- Trigger Function for Supplier Updates (Hectares or Factor changes)
CREATE OR REPLACE FUNCTION trigger_recalculate_capacity_on_supplier_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if relevant columns changed
    IF NEW.hectares <> OLD.hectares OR NEW.production_factor <> OLD.production_factor THEN
        PERFORM recalculate_producer_metrics(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger Definition for Supplier Updates
DROP TRIGGER IF EXISTS trg_update_capacity_supplier ON suppliers;
CREATE TRIGGER trg_update_capacity_supplier
AFTER UPDATE OF hectares, production_factor ON suppliers
FOR EACH ROW EXECUTE FUNCTION trigger_recalculate_capacity_on_supplier_update();

-- Initial Recalculation for all producers (Backfill)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT id FROM suppliers WHERE supplier_type IN ('PRODUCTOR', 'AMBOS') LOOP
        PERFORM recalculate_producer_metrics(r.id);
    END LOOP;
END;
$$;

-- RPC for linking producer (Insert/Upsert)
CREATE OR REPLACE FUNCTION link_producer_to_lot(
    p_lot_code text,
    p_producer_id uuid,
    p_contribution_kg numeric
) RETURNS void AS $$
BEGIN
    -- Insert or Update assignment
    INSERT INTO traceability_assignments (lot_code, producer_id, contribution_kg)
    VALUES (p_lot_code, p_producer_id, p_contribution_kg)
    ON CONFLICT (lot_code, producer_id) 
    DO UPDATE SET 
        contribution_kg = EXCLUDED.contribution_kg,
        created_at = now();
        
    -- The triggers on traceability_assignments will automatically:
    -- 1. Recalculate used_capacity (sum of all assignments)
    -- 2. Recalculate available_capacity (yearly - used)
    -- 3. Recalculate yield_estimate %
END;
$$ LANGUAGE plpgsql;

-- RPC for unlinking producer
CREATE OR REPLACE FUNCTION unlink_producer_from_lot(
    p_assignment_id uuid
) RETURNS void AS $$
BEGIN
    DELETE FROM traceability_assignments WHERE id = p_assignment_id;
    
    -- Trigger handles recalculation automatically
END;
$$ LANGUAGE plpgsql;

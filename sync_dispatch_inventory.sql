-- Function to update inventory status based on dispatch status
CREATE OR REPLACE FUNCTION update_inventory_status_on_dispatch()
RETURNS TRIGGER AS $$
BEGIN
    -- If dispatch status changes to 'En Tránsito' (or 'En Transito')
    IF NEW.status IN ('En Tránsito', 'En Transito', 'En Ruta') THEN
        -- Update the linked reception batch
        UPDATE receptions
        SET 
            inventory_status = 'En Transito',  -- Normalized status for Risk Monitor
            warehouse_location = 'En Transito'
        WHERE reception_code = NEW.batch_code;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger definition
DROP TRIGGER IF EXISTS trg_update_inventory_on_dispatch ON transport_dispatches;

CREATE TRIGGER trg_update_inventory_on_dispatch
AFTER INSERT OR UPDATE OF status ON transport_dispatches
FOR EACH ROW
WHEN (NEW.status IN ('En Tránsito', 'En Transito', 'En Ruta'))
EXECUTE FUNCTION update_inventory_status_on_dispatch();

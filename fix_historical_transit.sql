-- Actualizar el inventario de todos los despachos que YA estaban en tránsito
-- antes de crear el Trigger automático.
UPDATE receptions
SET 
    inventory_status = 'En Transito',
    warehouse_location = 'En Transito'
WHERE reception_code IN (
    SELECT batch_code 
    FROM transport_dispatches 
    WHERE status IN ('En Tránsito', 'En Transito', 'En Ruta')
);

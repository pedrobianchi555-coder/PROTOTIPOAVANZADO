-- ==============================================================================
-- CORRECCIÓN MANUAL: Lote PT-260333
-- Restaurar peso restante que no fue exportado
-- ==============================================================================

-- 1. Verificar estado actual del lote
SELECT 
    batch_code,
    quantity_kg AS peso_actual,
    status,
    inventory_status,
    warehouse_location
FROM inventory 
WHERE batch_code = 'PT-260333';

-- 2. Verificar el despacho para obtener el peso original y despachado
SELECT 
    batch_code,
    quantity_kg AS peso_despachado,
    original_batch_weight_kg AS peso_original,
    remaining_weight_kg AS restante_calculado,
    status
FROM transport_dispatches 
WHERE batch_code = 'PT-260333'
ORDER BY dispatch_date DESC
LIMIT 1;

-- 3. CORRECCIÓN: Restaurar el peso restante (600 kg según lo indicado)
-- Ejecutar SOLO si la verificación anterior confirma el problema
UPDATE inventory 
SET 
    quantity_kg = 600,
    status = 'DISPONIBLE',
    inventory_status = 'En Almacén',
    warehouse_location = 'Planta El Pilar'
WHERE batch_code = 'PT-260333';

-- 4. Verificar corrección
SELECT 
    batch_code,
    quantity_kg AS peso_corregido,
    status,
    inventory_status
FROM inventory 
WHERE batch_code = 'PT-260333';

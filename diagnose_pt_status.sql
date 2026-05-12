-- ==============================================================================
-- DIAGNÓSTICO PROFUNDO: ¿Por qué los lotes PT terminaron AGOTADOS?
-- ==============================================================================

-- 1. Ver el historial de estos lotes en inventory
SELECT 
    id,
    batch_code,
    product_type,
    classification,
    quantity_kg,
    status,
    inventory_status,
    origin_type,
    created_at,
    updated_at
FROM inventory
WHERE batch_code IN ('PT-260331', 'PT-260321', 'PT-260322')
ORDER BY batch_code;

-- 2. Revisar si fueron creados con AGOTADO desde el inicio o fue modificado después
-- Si created_at = updated_at, significa que nunca fueron actualizados
SELECT 
    batch_code,
    created_at,
    updated_at,
    CASE 
        WHEN created_at = updated_at THEN 'NUNCA MODIFICADO'
        ELSE 'FUE MODIFICADO DESPUÉS'
    END as modificacion
FROM inventory
WHERE batch_code IN ('PT-260331', 'PT-260321', 'PT-260322');

-- 3. Verificar los registros de receptions asociados
SELECT 
    i.batch_code AS inv_batch,
    r.reception_code AS rec_code,
    r.total_pesos_paletas AS rec_kg,
    r.inventory_status AS rec_status,
    r.created_at AS rec_created
FROM inventory i
LEFT JOIN receptions r ON i.origin_reception_id = r.id
WHERE i.batch_code IN ('PT-260331', 'PT-260321', 'PT-260322');

-- 4. Ver despachos que pudieron haber afectado estos lotes
SELECT 
    id,
    batch_code,
    status,
    quantity_kg,
    dispatch_date,
    created_at
FROM transport_dispatches
WHERE batch_code LIKE '%PT-260331%'
   OR batch_code LIKE '%PT-260321%'
   OR batch_code LIKE '%PT-260322%'
ORDER BY created_at DESC;

-- 5. Buscar en el log de producción si estos códigos aparecen como ENTRADA (consumidos)
SELECT 
    pd.reception_code,
    pd.weight_kg,
    ep.process_id,
    ep.process_date,
    po.order_number
FROM emptying_process_details pd
JOIN emptying_processes ep ON pd.process_id = ep.id
LEFT JOIN production_orders po ON ep.order_id = po.id
WHERE pd.reception_code LIKE 'PT-260%'
ORDER BY ep.process_date DESC;

-- 6. Ver si hay algún lote PT que fue usado como MATERIA PRIMA (error de flujo)
-- Esto sería un error grave en el proceso
SELECT 
    reception_code,
    weight_kg,
    process_id
FROM emptying_process_details
WHERE reception_code LIKE 'PT-%'
LIMIT 20;

-- ==============================================================================
-- DIAGNÓSTICO: Por qué los lotes PT no aparecen en Despacho de Producción
-- Lotes a investigar: PT-260331, PT-260321, PT-260322
-- ==============================================================================

-- 1. VERIFICAR SI EXISTEN EN INVENTORY
SELECT 
    'INVENTORY' as tabla,
    batch_code,
    product_name,
    product_type,
    classification,
    quantity_kg,
    status,
    inventory_status,
    warehouse_location,
    created_at
FROM inventory
WHERE batch_code IN ('PT-260331', 'PT-260321', 'PT-260322')
ORDER BY batch_code;

-- 2. VERIFICAR CONDICIONES DEL FILTRO
SELECT 
    batch_code,
    quantity_kg,
    status,
    classification,
    CASE WHEN status = 'AGOTADO' THEN '❌ AGOTADO' 
         ELSE '✓ OK' END AS check_status,
    CASE WHEN quantity_kg <= 0 THEN '❌ SIN PESO' 
         ELSE '✓ OK (' || quantity_kg || ' kg)' END AS check_peso,
    CASE WHEN UPPER(classification) IN ('PT', 'PRODUCTO TERMINADO') 
              OR UPPER(classification) LIKE '%MANTECA%'
              OR UPPER(classification) LIKE '%POLVO%'
              OR UPPER(classification) LIKE '%LICOR%'
              OR UPPER(classification) LIKE '%DERIVADO%'
         THEN '✓ ES PT/DERIVADO' 
         ELSE '❌ NO ES PT (' || classification || ')' END AS check_classification
FROM inventory
WHERE batch_code IN ('PT-260331', 'PT-260321', 'PT-260322');

-- 3. VERIFICAR SI TIENEN DESPACHO PROGRAMADO EN LOGÍSTICA
-- ESTO ES EL REQUISITO CRÍTICO
SELECT 
    id,
    batch_code,
    status,
    dispatch_date,
    destination,
    origin,
    service_type,
    created_at
FROM transport_dispatches
WHERE batch_code LIKE '%PT-260331%'
   OR batch_code LIKE '%PT-260321%'
   OR batch_code LIKE '%PT-260322%';

-- 4. MOSTRAR TODOS LOS DESPACHOS PROGRAMADOS ACTIVOS
SELECT 
    id,
    batch_code,
    status,
    dispatch_date,
    destination
FROM transport_dispatches
WHERE status = 'Programado'
ORDER BY dispatch_date DESC
LIMIT 20;

-- 5. RESUMEN: RAZÓN PROBABLE DEL PROBLEMA
-- Si los lotes existen en inventory pero NO tienen registro en transport_dispatches
-- con status='Programado', entonces NO aparecerán en la lista de Despacho de Producción.

-- SOLUCIÓN: Logística debe crear primero el despacho programado en:
-- Módulo Logística → Gestión de Despachos → Nuevo Despacho
-- Con service_type='Flete' y batch_code='PT-260331,PT-260321,PT-260322' (puede ser lista separada por comas)

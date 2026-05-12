-- ==============================================================================
-- SCRIPT DE DIAGNÓSTICO: Verificar triggers y datos de inventario
-- Ejecutar en Supabase SQL Editor para diagnosticar el problema de peso = 0
-- ==============================================================================

-- 1. Verificar todos los triggers en la tabla inventory
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'inventory';

-- 2. Verificar funciones trigger que puedan afectar inventory
SELECT 
    p.proname AS function_name,
    pg_get_functiondef(p.oid) AS function_definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND (p.proname LIKE '%inventory%'
   OR p.proname LIKE '%insert%'
   OR p.proname LIKE '%production%')
ORDER BY p.proname;

-- 3. Verificar registros recientes de PRODUCCIÓN con quantity_kg = 0
SELECT 
    id,
    batch_code,
    product_name,
    product_type,
    quantity_kg,
    origin_type,
    origin_reception_id,
    created_at
FROM inventory 
WHERE origin_type = 'PRODUCTION'
  AND quantity_kg = 0
ORDER BY created_at DESC
LIMIT 20;

-- 4. Comparar inventory vs receptions para registros de producción
SELECT 
    i.batch_code,
    i.quantity_kg AS inv_kg,
    r.total_pesos_paletas AS rec_kg,
    i.origin_reception_id,
    i.created_at,
    CASE 
        WHEN i.quantity_kg = 0 AND r.total_pesos_paletas > 0 THEN 'DESINCRONIZADO ⚠️'
        WHEN i.quantity_kg = r.total_pesos_paletas THEN 'OK ✓'
        ELSE 'DIFERENTE'
    END AS status
FROM inventory i
LEFT JOIN receptions r ON i.origin_reception_id = r.id
WHERE i.origin_type = 'PRODUCTION'
ORDER BY i.created_at DESC
LIMIT 30;

-- 5. Contar registros afectados
SELECT 
    COUNT(*) AS total_production_records,
    SUM(CASE WHEN quantity_kg = 0 THEN 1 ELSE 0 END) AS records_with_zero_weight,
    SUM(CASE WHEN quantity_kg > 0 THEN 1 ELSE 0 END) AS records_with_valid_weight
FROM inventory
WHERE origin_type = 'PRODUCTION';

-- 6. Verificar si hay políticas RLS que afecten inserciones
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'inventory';

-- ==============================================================================
-- FIX: Identificar y corregir trigger que sobrescribe valores en inventory
-- EJECUTAR EN SUPABASE SQL EDITOR - PASO A PASO
-- ==============================================================================

-- =====================================
-- PASO 1: Identificar TODOS los triggers en inventory
-- =====================================
SELECT 
    tg.tgname AS trigger_name,
    pg_get_triggerdef(tg.oid) AS trigger_definition,
    CASE tg.tgenabled
        WHEN 'O' THEN 'ENABLED (Origin)'
        WHEN 'D' THEN 'DISABLED'
        WHEN 'R' THEN 'REPLICA'
        WHEN 'A' THEN 'ALWAYS'
        ELSE 'ENABLED'
    END AS trigger_status
FROM pg_trigger tg
JOIN pg_class c ON tg.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE c.relname = 'inventory'
  AND NOT tg.tgisinternal
ORDER BY tg.tgname;

-- =====================================
-- PASO 2: Ver definición de funciones que afectan inventory
-- =====================================
SELECT 
    p.proname AS function_name,
    pg_get_functiondef(p.oid) AS function_definition
FROM pg_proc p
JOIN pg_trigger tg ON tg.tgfoid = p.oid
JOIN pg_class c ON tg.tgrelid = c.oid
WHERE c.relname = 'inventory';

-- =====================================
-- PASO 3: Verificar si hay trigger problemático
-- Buscar triggers que actualicen status o quantity_kg basándose en receptions
-- =====================================
SELECT 
    p.proname AS function_name,
    pg_get_functiondef(p.oid) AS full_definition
FROM pg_proc p
WHERE p.proname ILIKE '%inventory%'
   OR p.proname ILIKE '%sync%'
   OR p.proname ILIKE '%reception%'
ORDER BY p.proname;

-- =====================================
-- PASO 4: SOLUCIÓN - Deshabilitar trigger problemático (si existe)
-- Reemplaza 'NOMBRE_DEL_TRIGGER' con el nombre encontrado en Paso 1
-- =====================================
-- ALTER TABLE inventory DISABLE TRIGGER nombre_del_trigger;

-- =====================================
-- PASO 5: CORRECCIÓN MASIVA - Actualizar registros de producción afectados
-- Sincroniza quantity_kg desde receptions.total_pesos_paletas
-- =====================================
UPDATE inventory i
SET 
    quantity_kg = r.total_pesos_paletas,
    status = 'DISPONIBLE',
    inventory_status = 'En Almacén'
FROM receptions r
WHERE i.origin_reception_id = r.id
  AND i.origin_type = 'PRODUCTION'
  AND i.quantity_kg = 0
  AND r.total_pesos_paletas > 0;

-- =====================================
-- PASO 6: Verificar corrección
-- =====================================
SELECT 
    i.batch_code,
    i.quantity_kg AS inv_kg,
    r.total_pesos_paletas AS rec_kg,
    i.status,
    i.inventory_status
FROM inventory i
LEFT JOIN receptions r ON i.origin_reception_id = r.id
WHERE i.origin_type = 'PRODUCTION'
  AND i.created_at > NOW() - INTERVAL '7 days'
ORDER BY i.created_at DESC
LIMIT 20;

-- =====================================
-- PASO 7 (OPCIONAL): Si el trigger sincroniza solo para origin_type != 'PRODUCTION'
-- Modificar el trigger para excluir registros de producción
-- =====================================
-- CREATE OR REPLACE FUNCTION sync_inventory_from_reception()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     -- Solo sincronizar si NO es de producción interna
--     IF NEW.origin_type IS NULL OR NEW.origin_type != 'PRODUCTION' THEN
--         -- Lógica de sincronización aquí
--     END IF;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

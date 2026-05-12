-- ==============================================================================
-- SCRIPT DE CORRECCIÓN: Sincronizar quantity_kg desde receptions
-- Ejecutar en Supabase SQL Editor para corregir registros con peso = 0
-- ==============================================================================

-- PASO 1: Ver qué registros se van a corregir (DRY RUN)
SELECT 
    i.id,
    i.batch_code,
    i.quantity_kg AS inv_kg_actual,
    r.total_pesos_paletas AS rec_kg_correcto,
    i.origin_type,
    i.created_at
FROM inventory i
JOIN receptions r ON i.origin_reception_id = r.id
WHERE i.origin_type = 'PRODUCTION'
  AND i.quantity_kg = 0
  AND r.total_pesos_paletas > 0
ORDER BY i.created_at DESC;

-- PASO 2: EJECUTAR CORRECCIÓN (Descomentar para aplicar)
/*
UPDATE inventory i
SET 
    quantity_kg = r.total_pesos_paletas,
    updated_at = NOW()
FROM receptions r
WHERE i.origin_reception_id = r.id
  AND i.origin_type = 'PRODUCTION'
  AND i.quantity_kg = 0
  AND r.total_pesos_paletas > 0;
*/

-- PASO 3: Verificar corrección
SELECT 
    batch_code,
    quantity_kg,
    origin_type,
    created_at,
    updated_at
FROM inventory
WHERE origin_type = 'PRODUCTION'
ORDER BY created_at DESC
LIMIT 20;

-- ==============================================================================
-- INFORMACIÓN ADICIONAL: Estadísticas post-corrección
-- ==============================================================================

SELECT 
    origin_type,
    COUNT(*) AS total_records,
    SUM(CASE WHEN quantity_kg = 0 THEN 1 ELSE 0 END) AS zero_weight,
    SUM(CASE WHEN quantity_kg > 0 THEN 1 ELSE 0 END) AS valid_weight,
    ROUND(AVG(quantity_kg)::numeric, 2) AS avg_weight_kg
FROM inventory
GROUP BY origin_type
ORDER BY origin_type;

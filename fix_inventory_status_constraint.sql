-- ============================================================
-- FIX: Add "En Transito" to inventory_status CHECK constraint
-- ============================================================

-- Drop existing constraint
ALTER TABLE receptions 
DROP CONSTRAINT IF EXISTS receptions_inventory_status_check;

-- Recreate with new status included
ALTER TABLE receptions
ADD CONSTRAINT receptions_inventory_status_check 
CHECK (inventory_status IN (
    'En Almacén',
    'En Transito',
    'Exportado',
    'Agotado',
    'Pendiente',
    'Rechazado',
    'En Proceso',
    'Reservado',
    'Bloqueado',
    'Devuelto'
));

-- Verify the constraint
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'receptions'::regclass 
AND conname = 'receptions_inventory_status_check';

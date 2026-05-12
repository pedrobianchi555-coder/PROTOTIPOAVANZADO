-- Add new columns to suppliers table for Sustainable Development / Producer Management
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS code text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS locality text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS municipality text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS hectares numeric DEFAULT 0;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS yield_estimate numeric DEFAULT 0; -- RENDI
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS used_capacity numeric DEFAULT 0; -- UTILIZADO
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS available_capacity numeric DEFAULT 0; -- DISPONIBLE
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS coordinate text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS latitude_longitude text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS status_1 text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS status_2 text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS status_3 text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS status_4 text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS client_affiliation text; -- CLIENTE
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS axis text; -- EJE
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS supplier_type text DEFAULT 'AMBOS'; -- 'PROVEEDOR', 'PRODUCTOR', 'AMBOS'

-- Create table for Traceability Assignments (Lot <-> Producers)
CREATE TABLE IF NOT EXISTS traceability_assignments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    lot_code text NOT NULL, -- References inventory.batch_code or similar
    producer_id uuid REFERENCES suppliers(id),
    contribution_kg numeric DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    created_by uuid,
    
    -- Optional: Add constraint to prevent duplicates if needed
    UNIQUE(lot_code, producer_id)
);

-- Comments for clarity
COMMENT ON COLUMN suppliers.hectares IS 'Ha - Hectareaje';
COMMENT ON COLUMN suppliers.yield_estimate IS 'RENDI - Rendimiento estimado';
COMMENT ON COLUMN suppliers.used_capacity IS 'UTILIZADO - Capacidad utilizada/entregada';
COMMENT ON COLUMN suppliers.available_capacity IS 'DISPONIBLE - Capacidad disponible certificada';

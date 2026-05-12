-- ==============================================================================
-- MIGRATION: maquila_inventory
-- Table to manage Maquila Inventory (Manteca, Polvo, Licor, Granos)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS maquila_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    corte TEXT NOT NULL,
    lote_number TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('Manteca', 'Polvo', 'Licor de Cacao', 'Granos')),
    production_date DATE NOT NULL,
    available_kg NUMERIC NOT NULL DEFAULT 0,
    sales_cost_usd NUMERIC NOT NULL DEFAULT 0,
    availability_status TEXT NOT NULL CHECK (availability_status IN ('Disponible', 'Reservado', 'Agotado')) DEFAULT 'Disponible',
    raw_material_used_kg NUMERIC DEFAULT 0,
    finished_product_kg NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for searching by Lote or Corte
CREATE INDEX IF NOT EXISTS idx_maquila_inv_lote ON maquila_inventory (lote_number);
CREATE INDEX IF NOT EXISTS idx_maquila_inv_corte ON maquila_inventory (corte);

-- RLS Policies
ALTER TABLE maquila_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated inserts into maquila_inventory"
ON maquila_inventory FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated selects from maquila_inventory"
ON maquila_inventory FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated updates to maquila_inventory"
ON maquila_inventory FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated deletes from maquila_inventory"
ON maquila_inventory FOR DELETE TO authenticated USING (true);

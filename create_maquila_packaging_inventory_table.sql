-- ==============================================================================
-- MIGRATION: maquila_packaging_inventory
-- Table to manage Secondary Packaging Inventory for Maquila (Sacos, Laminas, Etiquetas)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS maquila_packaging_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_name TEXT NOT NULL CHECK (item_name IN ('Sacos', 'Laminas', 'Etiquetas Polvo')),
    available_qty NUMERIC NOT NULL DEFAULT 0,
    unit_measure TEXT NOT NULL DEFAULT 'Unidades',
    last_restock_date DATE,
    observations TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initialize with default items if empty
INSERT INTO maquila_packaging_inventory (item_name, available_qty, unit_measure)
SELECT 'Sacos', 0, 'Unidades'
WHERE NOT EXISTS (SELECT 1 FROM maquila_packaging_inventory WHERE item_name = 'Sacos');

INSERT INTO maquila_packaging_inventory (item_name, available_qty, unit_measure)
SELECT 'Laminas', 0, 'Unidades'
WHERE NOT EXISTS (SELECT 1 FROM maquila_packaging_inventory WHERE item_name = 'Laminas');

INSERT INTO maquila_packaging_inventory (item_name, available_qty, unit_measure)
SELECT 'Etiquetas Polvo', 0, 'Unidades'
WHERE NOT EXISTS (SELECT 1 FROM maquila_packaging_inventory WHERE item_name = 'Etiquetas Polvo');

-- RLS Policies
ALTER TABLE maquila_packaging_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated inserts into maquila_packaging_inventory"
ON maquila_packaging_inventory FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated selects from maquila_packaging_inventory"
ON maquila_packaging_inventory FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated updates to maquila_packaging_inventory"
ON maquila_packaging_inventory FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated deletes from maquila_packaging_inventory"
ON maquila_packaging_inventory FOR DELETE TO authenticated USING (true);

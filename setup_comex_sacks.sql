-- Ensure 'Sacos de Exportación' exists in comex_supplies
-- First, ensure the column exists if the table was already created without it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='comex_supplies' AND column_name='description') THEN
        ALTER TABLE comex_supplies ADD COLUMN description TEXT;
    END IF;
END $$;

INSERT INTO comex_supplies (name, current_stock, unit, description)
SELECT 'Sacos de Exportación', 0, 'Sacos', 'Sacos para exportación de cacao'
WHERE NOT EXISTS (
    SELECT 1 FROM comex_supplies WHERE name ILIKE '%Sacos de Exportación%'
);

-- Ensure configuration key exists
-- First, ensure group_name column exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_settings' AND column_name='group_name') THEN
        ALTER TABLE system_settings ADD COLUMN group_name TEXT;
    END IF;
END $$;

INSERT INTO system_settings (key, value, description, group_name, label)
SELECT 'comex_export_sacks_min_threshold', '17000', 'Umbral mínimo de inventario para Sacos de Exportación', 'production', 'Mínimo Sacos Exportación'
WHERE NOT EXISTS (
    SELECT 1 FROM system_settings WHERE key = 'comex_export_sacks_min_threshold'
);

-- Ensure comex_supply_movements table exists (Basic check, likely exists if supplies does)
CREATE TABLE IF NOT EXISTS comex_supply_movements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    supply_id UUID REFERENCES comex_supplies(id),
    type VARCHAR(20) CHECK (type IN ('IN', 'OUT', 'ADJUST')),
    quantity INTEGER NOT NULL,
    reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID
);

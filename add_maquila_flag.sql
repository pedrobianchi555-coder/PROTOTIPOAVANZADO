-- Add flag_maquila column to inventory table
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS flag_maquila BOOLEAN DEFAULT FALSE;

-- Optional: Create an index if filtering by this flag becomes frequent and the table is large
-- CREATE INDEX idx_inventory_flag_maquila ON inventory(flag_maquila);

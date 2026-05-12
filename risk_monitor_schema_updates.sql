-- =====================================================
-- Risk Monitor Improvements - Database Schema Updates
-- =====================================================

-- 1. Add fixed_percentage column to client_contracts
-- This allows tracking partial fixations with specific percentages
ALTER TABLE client_contracts 
ADD COLUMN IF NOT EXISTS fixed_percentage DECIMAL(5,2) DEFAULT 100;

-- Update existing records: Fijado = 100%, Parcial = 50% (default), Sin Fijar = 0%
UPDATE client_contracts 
SET fixed_percentage = 100 
WHERE estatus_fijaciones = 'Fijado' AND fixed_percentage IS NULL;

UPDATE client_contracts 
SET fixed_percentage = 50 
WHERE estatus_fijaciones = 'Parcial' AND fixed_percentage IS NULL;

UPDATE client_contracts 
SET fixed_percentage = 0 
WHERE estatus_fijaciones = 'Sin Fijar' AND fixed_percentage IS NULL;

-- 2. Create risk_snapshots table for historical tracking
CREATE TABLE IF NOT EXISTS risk_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_date DATE NOT NULL,
    physical_inventory_mt DECIMAL(12,2),
    transit_inventory_mt DECIMAL(12,2),
    hedged_position_mt DECIMAL(12,2),
    fixed_contracts_mt DECIMAL(12,2),
    net_risk_mt DECIMAL(12,2),
    market_price DECIMAL(10,2),
    value_exposed DECIMAL(14,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_snapshot_date UNIQUE (snapshot_date)
);

-- Create index for faster date queries
CREATE INDEX IF NOT EXISTS idx_risk_snapshots_date ON risk_snapshots(snapshot_date DESC);

-- Enable RLS
ALTER TABLE risk_snapshots ENABLE ROW LEVEL SECURITY;

-- Create policy for all authenticated users
CREATE POLICY "Allow all for authenticated users" ON risk_snapshots
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Add comment
COMMENT ON TABLE risk_snapshots IS 'Daily snapshots of risk exposure for historical tracking';
COMMENT ON COLUMN client_contracts.fixed_percentage IS 'Percentage of contract volume that is price-fixed (0-100)';

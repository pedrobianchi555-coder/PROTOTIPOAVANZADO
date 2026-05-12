-- Add new columns to maquila_processes table for the 5-stage workflow

ALTER TABLE maquila_processes
ADD COLUMN IF NOT EXISTS origin_warehouse TEXT,
ADD COLUMN IF NOT EXISTS logistics_status TEXT DEFAULT 'PENDING',
ADD COLUMN IF NOT EXISTS transport_unit_id UUID REFERENCES transport_units(id),
ADD COLUMN IF NOT EXISTS transport_driver_id UUID REFERENCES transport_drivers(id),
ADD COLUMN IF NOT EXISTS transport_route_id UUID REFERENCES logistics_routes(id),
ADD COLUMN IF NOT EXISTS transport_cost_usd NUMERIC,
ADD COLUMN IF NOT EXISTS dispatch_number_csj TEXT,
ADD COLUMN IF NOT EXISTS cost_grain_usd NUMERIC,
ADD COLUMN IF NOT EXISTS humidity_sent NUMERIC,
ADD COLUMN IF NOT EXISTS humidity_received NUMERIC,
ADD COLUMN IF NOT EXISTS maquila_reception_number TEXT,
ADD COLUMN IF NOT EXISTS final_cost_usd NUMERIC;

-- Create constraint for logistics_status if needed, or just keep it loose text for now
-- Add indexes for foreign keys if performance matters later

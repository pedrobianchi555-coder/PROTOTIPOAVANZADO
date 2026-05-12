-- 1. Create dependencies if they don't exist
-- Transport Units
CREATE TABLE IF NOT EXISTS transport_units (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  plate_head TEXT NOT NULL,
  plate_trailer TEXT,
  unit_type TEXT,
  capacity_kg NUMERIC,
  year_model TEXT,
  brand TEXT,
  color TEXT,
  status TEXT DEFAULT 'Activo',
  default_driver_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Transport Drivers
CREATE TABLE IF NOT EXISTS transport_drivers (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  full_name TEXT NOT NULL,
  doc_id TEXT,
  license_number TEXT,
  license_type TEXT,
  phone TEXT,
  email TEXT,
  status TEXT DEFAULT 'Activo',
  documents_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Logistics Routes (The one that caused the error)
CREATE TABLE IF NOT EXISTS logistics_routes (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  route_code TEXT,
  origin TEXT,
  destination TEXT,
  service_type TEXT,
  standard_km NUMERIC,
  status TEXT DEFAULT 'Activa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. NOW run the Maquila updates
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

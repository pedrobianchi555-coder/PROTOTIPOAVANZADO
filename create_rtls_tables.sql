-- RTLS (Real-Time Location System) Schema

-- 1. rtls_beacons
CREATE TABLE IF NOT EXISTS public.rtls_beacons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mac_id TEXT UNIQUE NOT NULL,
    label TEXT,
    battery_level INT DEFAULT 100,
    status TEXT CHECK (status IN ('unassigned', 'active', 'inactive', 'low_battery')) DEFAULT 'unassigned',
    last_seen TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. rtls_pallets
CREATE TABLE IF NOT EXISTS public.rtls_pallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pallet_number TEXT UNIQUE NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. rtls_assignments
CREATE TABLE IF NOT EXISTS public.rtls_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pallet_id UUID REFERENCES public.rtls_pallets(id) ON DELETE CASCADE,
    beacon_id UUID REFERENCES public.rtls_beacons(id) ON DELETE CASCADE,
    active BOOLEAN DEFAULT true,
    assigned_at TIMESTAMPTZ DEFAULT now(),
    assigned_by UUID REFERENCES auth.users(id)
);

-- 4. rtls_positions
CREATE TABLE IF NOT EXISTS public.rtls_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beacon_mac TEXT NOT NULL,
    pallet_id UUID REFERENCES public.rtls_pallets(id) ON DELETE CASCADE,
    x NUMERIC,
    y NUMERIC,
    z NUMERIC,
    rssi INT,
    zone_code TEXT,
    bay_number INT,
    bay_label TEXT,
    signal_quality TEXT CHECK (signal_quality IN ('strong', 'medium', 'weak', 'lost')),
    cle_zone_id TEXT,
    last_updated TIMESTAMPTZ DEFAULT now(),
    battery_level INT
);

-- 5. rtls_alert_configs
CREATE TABLE IF NOT EXISTS public.rtls_alert_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_type TEXT UNIQUE NOT NULL,
    enabled BOOLEAN DEFAULT true,
    threshold_minutes INT,
    threshold_battery INT,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default alert configs
INSERT INTO public.rtls_alert_configs (alert_type, threshold_minutes, threshold_battery, description) VALUES
('static', 120, null, 'Alerta cuando una paleta no se ha movido por un tiempo.'),
('signal_lost', 15, null, 'Alerta cuando se pierde la señal de una baliza.'),
('low_battery', null, 20, 'Alerta cuando la batería de la baliza es inferior al umbral.'),
('out_of_zone', null, null, 'Alerta cuando la paleta sale de su zona asignada.')
ON CONFLICT (alert_type) DO NOTHING;

-- 6. rtls_alerts
CREATE TABLE IF NOT EXISTS public.rtls_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pallet_id UUID REFERENCES public.rtls_pallets(id) ON DELETE CASCADE,
    alert_type TEXT,
    message TEXT,
    severity TEXT CHECK (severity IN ('info', 'warning', 'critical')),
    acknowledged BOOLEAN DEFAULT false,
    acknowledged_by UUID REFERENCES auth.users(id),
    acknowledged_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- 7. View rtls_positions_enriched
CREATE OR REPLACE VIEW public.rtls_positions_enriched AS
SELECT
    p.id,
    p.beacon_mac,
    p.pallet_id,
    p.x,
    p.y,
    p.z,
    p.rssi,
    p.zone_code,
    p.bay_number,
    p.bay_label,
    p.signal_quality,
    p.cle_zone_id,
    p.last_updated,
    p.battery_level,
    pal.pallet_number,
    pal.description AS pallet_description,
    b.label AS beacon_label
FROM public.rtls_positions p
LEFT JOIN public.rtls_pallets pal ON p.pallet_id = pal.id
LEFT JOIN public.rtls_beacons b ON p.beacon_mac = b.mac_id;

-- Turn on Realtime for dynamic tables
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;

alter publication supabase_realtime add table public.rtls_positions;
alter publication supabase_realtime add table public.rtls_alerts;

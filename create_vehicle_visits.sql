-- Crear tabla para los ingresos de vehículos (Control de Acceso)
CREATE TABLE IF NOT EXISTS public.vehicle_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    arrival_date DATE NOT NULL,
    arrival_time TIME NOT NULL,
    vehicle_plate TEXT NOT NULL,
    trailer_plate TEXT,
    vehicle_type TEXT,
    vehicle_brand TEXT,
    vehicle_model TEXT,
    vehicle_color TEXT,
    driver_id_number TEXT,
    driver_name TEXT,
    origin_zone TEXT,
    status TEXT NOT NULL DEFAULT 'EN_PLANTA', -- 'EN_PLANTA', 'SALIDA'
    registered_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.vehicle_visits ENABLE ROW LEVEL SECURITY;

-- Políticas base para vehicle_visits
CREATE POLICY "Enable all for authenticated users on vehicle_visits"
ON public.vehicle_visits FOR ALL TO authenticated USING (true);

-- Modificar security_checkins para vincularlo a la visita
ALTER TABLE public.security_checkins ADD COLUMN IF NOT EXISTS visit_id UUID REFERENCES public.vehicle_visits(id);

-- Opcional: Crear índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_vehicle_visits_plate ON public.vehicle_visits(vehicle_plate);
CREATE INDEX IF NOT EXISTS idx_vehicle_visits_status ON public.vehicle_visits(status);

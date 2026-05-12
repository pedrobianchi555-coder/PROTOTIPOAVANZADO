CREATE TABLE IF NOT EXISTS public.vehicles (
    plate TEXT PRIMARY KEY,
    trailer_plate TEXT,
    vehicle_type TEXT,
    vehicle_brand TEXT,
    vehicle_model TEXT,
    vehicle_color TEXT,
    driver_id_number TEXT,
    driver_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Habilitar RLS (opcional si es requerido pero es buena práctica)
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Políticas temporales para permitir a autenticados interactuar
CREATE POLICY "Allow authenticated full access to vehicles"
ON public.vehicles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

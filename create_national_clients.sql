-- Instrucciones: Ejecuta este bloque SQL en el SQL Editor de tu panel de Supabase.

CREATE TABLE IF NOT EXISTS public.national_clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    rif TEXT,
    address TEXT,
    contact_name TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Asegurando permisos de lectura y escritura (Configuración de Seguridad RLs básica)
ALTER TABLE public.national_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.national_clients
    AS PERMISSIVE FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Enable insert access for all users" ON public.national_clients
    AS PERMISSIVE FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON public.national_clients
    AS PERMISSIVE FOR UPDATE
    TO public
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" ON public.national_clients
    AS PERMISSIVE FOR DELETE
    TO public
    USING (true);

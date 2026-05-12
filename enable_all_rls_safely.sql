-- ==============================================================================
-- ACTIVAR RLS (Row Level Security) EN TODAS LAS TABLAS DE FORMA SEGURA
-- ==============================================================================
-- Este script habilita RLS en todas las tablas del esquema 'public' que 
-- actualmente no lo tengan habilitado.
-- Para evitar que la aplicación deje de funcionar (error de acceso denegado), 
-- también se crea una política permisiva "Permissive policy for all" 
-- que permite SELECT, INSERT, UPDATE y DELETE a todos los usuarios 
-- (autenticados o anónimos).
-- ==============================================================================

DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    )
    LOOP
        -- 1. Habilitar RLS en la tabla
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.tablename);
        
        -- 2. Eliminar la política "Permissive policy for all" si ya existe para evitar errores
        BEGIN
            EXECUTE format('DROP POLICY IF EXISTS "Permissive policy for all" ON public.%I;', r.tablename);
        EXCEPTION
            WHEN undefined_object THEN null;
        END;

        -- 3. Crear una política permisiva para todas las operaciones (ALL) y todos los roles
        EXECUTE format(
            'CREATE POLICY "Permissive policy for all" ON public.%I FOR ALL USING (true) WITH CHECK (true);',
            r.tablename
        );
        
        RAISE NOTICE 'RLS activado y política permisiva creada en la tabla: %', r.tablename;
    END LOOP;
END $$;

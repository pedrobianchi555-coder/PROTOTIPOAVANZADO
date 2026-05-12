-- ==============================================================================
-- ACTIVAR RLS (Row Level Security) - NIVEL 1 (SOLO USUARIOS AUTENTICADOS)
-- ==============================================================================
-- Este script habilita RLS en todas las tablas del esquema 'public' y
-- aplica una política que permite acceso TOTAL (lectura y escritura)
-- ÚNICAMENTE a los usuarios que hayan iniciado sesión (rol 'authenticated').
-- 
-- Los accesos anónimos o públicos sin sesión iniciada quedarán completamente 
-- bloqueados en cuanto se ejecute este script.
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
        -- 1. Habilitar RLS en la tabla (si no lo estaba)
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.tablename);
        
        -- 2. Limpiar políticas temporales o previas que permitían acceso a todos 
        --    (por si ejecutaron el script temporal anterior o similar)
        BEGIN
            EXECUTE format('DROP POLICY IF EXISTS "Permissive policy for all" ON public.%I;', r.tablename);
            EXECUTE format('DROP POLICY IF EXISTS "Enable read access for all users" ON public.%I;', r.tablename);
            EXECUTE format('DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.%I;', r.tablename);
            EXECUTE format('DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.%I;', r.tablename);
            EXECUTE format('DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.%I;', r.tablename);
            EXECUTE format('DROP POLICY IF EXISTS "Full access for authenticated users" ON public.%I;', r.tablename);
        EXCEPTION
            WHEN undefined_object THEN null;
        END;

        -- 3. Crear una única política robusta para usuarios autenticados
        --    Permite todas las acciones (SELECT, INSERT, UPDATE, DELETE)
        EXECUTE format(
            'CREATE POLICY "Full access for authenticated users" ON public.%I 
             FOR ALL
             TO authenticated 
             USING (true) 
             WITH CHECK (true);',
            r.tablename
        );
        
        RAISE NOTICE 'RLS activado y protegido (solo Authenticated) en la tabla: %', r.tablename;
    END LOOP;
END $$;

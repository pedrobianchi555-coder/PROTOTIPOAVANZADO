-- Instrucciones: Ejecutar en el SQL Editor de Supabase
-- Añadimos la columna operation_type por defecto RECEPCION para proteger los datos históricos
ALTER TABLE public.security_checkins 
ADD COLUMN IF NOT EXISTS operation_type TEXT DEFAULT 'RECEPCION';

-- Añadimos columna para vincular el ID del despacho (por simetría con recpeciones)
ALTER TABLE public.security_checkins 
ADD COLUMN IF NOT EXISTS linked_dispatch_id UUID;


-- Agregar columna batch_summary a la tabla maquila_processes
ALTER TABLE public.maquila_processes ADD COLUMN IF NOT EXISTS batch_summary TEXT;

-- Comentario descriptivo
COMMENT ON COLUMN public.maquila_processes.batch_summary IS 'Resumen de los lotes incluidos en el compendio';

-- Tabla para registro centralizado de mermas
CREATE TABLE IF NOT EXISTS waste_registry (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    registration_date DATE NOT NULL,
    source_type VARCHAR(50) NOT NULL, -- 'CDP', 'MAQUILA_TRANSIT', 'MAQUILA_PROCESS', 'GUARENAS', 'TRASLADO'
    source_reference_id UUID, -- Referencia al registro origen (production_batch_results, maquila_processes, etc.)
    source_reference_code VARCHAR(100), -- Código legible (ej: lote, despacho #)
    
    -- Campos de merma específicos
    waste_category VARCHAR(50), -- 'TANGIBLE', 'INTANGIBLE', 'TRANSITO', 'PROCESO'
    waste_type VARCHAR(100), -- 'stones', 'shells', 'transit_loss', etc.
    waste_kg DECIMAL(12,3) NOT NULL,
    
    -- Contexto
    input_weight_kg DECIMAL(12,3), -- Peso entrada para cálculo %
    waste_percentage DECIMAL(6,3), -- % calculado
    
    -- Metadata
    observations TEXT,
    is_auto_generated BOOLEAN DEFAULT true,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_waste_source ON waste_registry(source_type, registration_date);
CREATE INDEX IF NOT EXISTS idx_waste_date ON waste_registry(registration_date DESC);
CREATE INDEX IF NOT EXISTS idx_waste_ref ON waste_registry(source_reference_id);

-- Comentarios para documentación
COMMENT ON TABLE waste_registry IS 'Registro centralizado de todas las mermas del sistema';
COMMENT ON COLUMN waste_registry.source_type IS 'Origen de la merma: CDP, MAQUILA_TRANSIT, MAQUILA_PROCESS, GUARENAS, TRASLADO';
COMMENT ON COLUMN waste_registry.waste_category IS 'Categoría: TANGIBLE, INTANGIBLE, TRANSITO, PROCESO';

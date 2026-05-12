-- ============================================================
-- TABLA: exportaciones
-- Descripción: Registro histórico de todas las exportaciones
-- con vinculación completa a contratos, lotes, embarques y despachos.
-- ============================================================

-- Crear tabla principal
CREATE TABLE IF NOT EXISTS exportaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Código único de exportación
    export_code TEXT NOT NULL UNIQUE,
    export_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Vínculos a otras tablas
    contract_id UUID REFERENCES client_contracts(id) ON DELETE SET NULL,
    shipment_id UUID REFERENCES export_shipments(id) ON DELETE SET NULL,
    reception_id UUID REFERENCES receptions(id) ON DELETE SET NULL,
    dispatch_id UUID REFERENCES transport_dispatches(id) ON DELETE SET NULL,
    
    -- Datos del cliente (desnormalizado para reportes rápidos)
    client_name TEXT NOT NULL,
    contract_number TEXT,
    
    -- Datos del producto
    variety TEXT,
    product_type TEXT, -- Granos, Manteca, Polvo, Licor
    lot_code TEXT, -- Código del lote (reception_code)
    
    -- Volumen y peso
    volume_kg NUMERIC(12,2) NOT NULL DEFAULT 0, -- Peso real en kilogramos
    volume_mt NUMERIC(10,4) GENERATED ALWAYS AS (volume_kg / 1000) STORED, -- Calculado automáticamente
    sacks_count INTEGER DEFAULT 0,
    
    -- Datos de embarque
    booking_number TEXT,
    bl_number TEXT, -- Bill of Lading
    container_number TEXT,
    vessel_name TEXT,
    
    -- Puertos
    port_loading TEXT,
    port_discharge TEXT,
    
    -- Fechas logísticas
    etd DATE, -- Estimated Time of Departure
    eta DATE, -- Estimated Time of Arrival
    
    -- Valores comerciales (opcional)
    unit_price_usd NUMERIC(10,2), -- Precio por tonelada
    total_value_usd NUMERIC(14,2), -- Valor total
    
    -- Estado (simplificado)
    status TEXT NOT NULL DEFAULT 'Exportado',
    
    -- Observaciones
    observations TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_exportaciones_contract ON exportaciones(contract_id);
CREATE INDEX IF NOT EXISTS idx_exportaciones_client ON exportaciones(client_name);
CREATE INDEX IF NOT EXISTS idx_exportaciones_date ON exportaciones(export_date);
CREATE INDEX IF NOT EXISTS idx_exportaciones_lot ON exportaciones(lot_code);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_exportaciones_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_exportaciones_updated ON exportaciones;
CREATE TRIGGER set_exportaciones_updated
    BEFORE UPDATE ON exportaciones
    FOR EACH ROW
    EXECUTE FUNCTION update_exportaciones_timestamp();

-- Comentarios de documentación
COMMENT ON TABLE exportaciones IS 'Registro histórico de todas las exportaciones realizadas';
COMMENT ON COLUMN exportaciones.export_code IS 'Código único de exportación (EXP-YYYYMMDD-XXX)';
COMMENT ON COLUMN exportaciones.volume_mt IS 'Volumen en toneladas métricas, calculado automáticamente desde volume_kg';
COMMENT ON COLUMN exportaciones.contract_id IS 'FK a client_contracts';
COMMENT ON COLUMN exportaciones.reception_id IS 'FK a receptions (lote exportado)';

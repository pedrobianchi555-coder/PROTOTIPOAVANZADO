-- ============================================================
-- MODULE: NATIONAL SALES (Ventas Nacionales)
-- ============================================================

-- 1. Update Inventory Status Constraint in 'receptions'
-- We need to add 'Reser VEN NAC' to the allowed list.
-- Note: 'En Transito' and 'Agotado' are already there.
ALTER TABLE receptions 
DROP CONSTRAINT IF EXISTS receptions_inventory_status_check;

ALTER TABLE receptions
ADD CONSTRAINT receptions_inventory_status_check 
CHECK (inventory_status IN (
    'En Almacén',
    'En Transito',
    'Exportado',
    'Agotado',
    'Pendiente',
    'Rechazado',
    'En Proceso',
    'Reservado',
    'Bloqueado',
    'Devuelto',
    'Reser VEN NAC'
));

-- 2. Create 'national_sales' table
CREATE TABLE IF NOT EXISTS national_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES receptions(id) NOT NULL,
    client_id UUID REFERENCES clients(id) NOT NULL,
    
    sale_date DATE DEFAULT CURRENT_DATE,
    
    -- Commercial Data
    price_per_kg NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_weight_kg NUMERIC(12, 2) NOT NULL, -- Snapshot of weight at reservation time
    total_amount_usd NUMERIC(12, 2) GENERATED ALWAYS AS (price_per_kg * total_weight_kg) STORED,
    
    -- Status Tracking
    status TEXT NOT NULL CHECK (status IN ('Reserved', 'Dispatching', 'Delivered', 'Cancelled')),
    
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_national_sales_batch ON national_sales(batch_id);
CREATE INDEX IF NOT EXISTS idx_national_sales_client ON national_sales(client_id);
CREATE INDEX IF NOT EXISTS idx_national_sales_status ON national_sales(status);

-- 4. Enable RLS (Row Level Security) - Optional but good practice
ALTER TABLE national_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for authenticated users" ON national_sales
    FOR ALL USING (auth.role() = 'authenticated');

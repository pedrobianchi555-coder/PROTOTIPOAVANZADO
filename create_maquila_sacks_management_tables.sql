-- ==============================================================================
-- MIGRATION: maquila_sacks_management
-- Tables to manage maquiladoras and their returnable sack transactions.
-- ==============================================================================

-- 1. Table for Maquiladoras
CREATE TABLE IF NOT EXISTS maquiladoras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    contact_info TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial maquiladoras
INSERT INTO maquiladoras (name) VALUES ('KKR'), ('Cavencal'), ('Civen')
ON CONFLICT (name) DO NOTHING;

-- 2. Table for Sack Transactions
CREATE TABLE IF NOT EXISTS maquila_sack_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_date DATE NOT NULL,
    transaction_time TIME NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('ENTREGA', 'DEVOLUCION')),
    maquiladora_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    reference_doc TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (maquiladora_name) REFERENCES maquiladoras(name) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_maquila_sack_trans_date ON maquila_sack_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_maquila_sack_trans_maquiladora ON maquila_sack_transactions(maquiladora_name);

-- RLS Policies
ALTER TABLE maquiladoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE maquila_sack_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated selects from maquiladoras" ON maquiladoras FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated inserts into maquiladoras" ON maquiladoras FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated updates to maquiladoras" ON maquiladoras FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated inserts into maquila_sack_transactions" ON maquila_sack_transactions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated selects from maquila_sack_transactions" ON maquila_sack_transactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated updates to maquila_sack_transactions" ON maquila_sack_transactions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated deletes from maquila_sack_transactions" ON maquila_sack_transactions FOR DELETE TO authenticated USING (true);

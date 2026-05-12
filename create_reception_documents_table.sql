-- ============================================================
-- MIGRATION: reception_documents
-- Stores generated PDF documents (Fichas de Recepción) linked
-- to each reception by code and type.
-- ============================================================

CREATE TABLE IF NOT EXISTS reception_documents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reception_code  TEXT NOT NULL,
    reception_id    UUID REFERENCES receptions(id) ON DELETE SET NULL,
    document_type   TEXT NOT NULL DEFAULT 'FICHA_RECEPCION',
    file_name       TEXT NOT NULL,
    storage_path    TEXT NOT NULL,
    file_url        TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),

    -- One document per reception per type (upsert-safe)
    CONSTRAINT uq_reception_doc_type UNIQUE (reception_code, document_type)
);

-- Index for fast lookups by reception code
CREATE INDEX IF NOT EXISTS idx_reception_documents_code
    ON reception_documents (reception_code);

-- Index for lookups by reception UUID
CREATE INDEX IF NOT EXISTS idx_reception_documents_id
    ON reception_documents (reception_id);

-- Row-Level Security (optional — enable if your project uses RLS)
-- ALTER TABLE reception_documents ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SUPABASE STORAGE BUCKET
-- Run this in the Supabase Dashboard → Storage → New Bucket
-- OR execute via the management API:
--
--   Bucket name : reception-documents
--   Public      : false  (URLs are signed or public per policy)
--
-- Alternatively, make the bucket PUBLIC so getPublicUrl() works:
--   Dashboard → Storage → reception-documents → Make Public
-- ============================================================

-- Grant access to authenticated users (adjust to your RLS policies)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('reception-documents', 'reception-documents', true)
-- ON CONFLICT DO NOTHING;

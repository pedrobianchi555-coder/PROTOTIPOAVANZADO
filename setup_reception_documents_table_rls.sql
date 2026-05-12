-- ==============================================================================
-- RLS POLICIES FOR reception_documents TABLE
-- 
-- Run this in the Supabase Dashboard -> SQL Editor
-- This script fixes the "new row violates row-level security policy" error.
-- ==============================================================================

-- 1. Ensure RLS is enabled (if it wasn't already)
ALTER TABLE reception_documents ENABLE ROW LEVEL SECURITY;

-- 2. Allow all authenticated users to insert records
CREATE POLICY "Allow authenticated inserts into reception_documents"
ON reception_documents FOR INSERT
TO authenticated
WITH CHECK (true);

-- 3. Allow all authenticated users to read records
CREATE POLICY "Allow authenticated selects from reception_documents"
ON reception_documents FOR SELECT
TO authenticated
USING (true);

-- 4. Allow all authenticated users to update records
CREATE POLICY "Allow authenticated updates to reception_documents"
ON reception_documents FOR UPDATE
TO authenticated
USING (true);

-- 5. Allow all authenticated users to delete records
CREATE POLICY "Allow authenticated deletes from reception_documents"
ON reception_documents FOR DELETE
TO authenticated
USING (true);

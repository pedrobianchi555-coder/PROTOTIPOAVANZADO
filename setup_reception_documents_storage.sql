-- ==============================================================================
-- SETUP SCRIPT FOR RECEPTION DOCUMENTS STORAGE
-- 
-- Run this in the Supabase Dashboard -> SQL Editor
-- This script ensures the storage policies allow your app to upload the PDFs.
-- ==============================================================================

-- 1. Create the bucket if it doesn't exist (and make it public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('reception-documents', 'reception-documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Allow authenticated users to UPLOAD files to the bucket
CREATE POLICY "Allow authenticated uploads to reception-documents"
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK ( bucket_id = 'reception-documents' );

-- 3. Allow authenticated users to UPDATE (upsert) files in the bucket
CREATE POLICY "Allow authenticated updates to reception-documents"
ON storage.objects FOR UPDATE 
TO authenticated 
USING ( bucket_id = 'reception-documents' );

-- 4. Allow authenticated users to SELECT (read) files in the bucket
CREATE POLICY "Allow authenticated selects from reception-documents"
ON storage.objects FOR SELECT 
TO authenticated 
USING ( bucket_id = 'reception-documents' );

-- 5. Just in case, allow DELETE for authenticated users
CREATE POLICY "Allow authenticated deletes from reception-documents"
ON storage.objects FOR DELETE 
TO authenticated 
USING ( bucket_id = 'reception-documents' );

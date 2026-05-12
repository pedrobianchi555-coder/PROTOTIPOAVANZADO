SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND (table_name ILIKE '%sample%' OR table_name ILIKE '%feedback%' OR table_name ILIKE '%muestras%');

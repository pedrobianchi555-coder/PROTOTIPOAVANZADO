-- Ver muestras y sus clientes
SELECT 
    s.id as sample_id,
    s.sample_number,
    s.client as sample_client_name,
    c.name as client_table_name,
    c.id as client_id,
    CASE WHEN c.name IS NULL THEN 'NO MATCH' ELSE 'MATCH' END as status
FROM samples s
LEFT JOIN clients c ON s.client = c.name;

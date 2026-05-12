INSERT INTO system_settings (key, value, label, description) 
VALUES ('export_sack_weight_kg', '0.6', 'Peso Tara Saco Exportación (Kg)', 'Peso a descontar por cada saco en despachos de exportación.')
ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    label = EXCLUDED.label,
    description = EXCLUDED.description;

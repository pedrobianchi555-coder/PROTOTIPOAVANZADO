-- Add max_cadmium column to clients table
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS max_cadmium DECIMAL(5,2);

COMMENT ON COLUMN clients.max_cadmium IS 'Nivel máximo de Cadmio permitido (ppm) para este cliente';

-- Note: client_contracts already has max_cadmium column

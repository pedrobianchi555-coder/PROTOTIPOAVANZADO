-- Add batch_number column to emptying_process table
-- This tracks which batch number (1, 2, 3...) each process corresponds to
-- in the emptying instruction snapshot distribution matrix
ALTER TABLE emptying_process ADD COLUMN IF NOT EXISTS batch_number INTEGER;

-- Add sacks_qty column to emptying_process_details if it doesn't exist
ALTER TABLE emptying_process_details ADD COLUMN IF NOT EXISTS sacks_qty INTEGER DEFAULT 0;

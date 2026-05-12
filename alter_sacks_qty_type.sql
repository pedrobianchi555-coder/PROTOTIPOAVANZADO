-- Alter sacks_qty to support decimal values (like 13.5)
ALTER TABLE emptying_process_details ALTER COLUMN sacks_qty TYPE NUMERIC USING sacks_qty::numeric;

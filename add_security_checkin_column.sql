-- Add security_checkin_id to receptions table to link with Security Check-ins
ALTER TABLE receptions 
ADD COLUMN IF NOT EXISTS security_checkin_id UUID REFERENCES security_checkins(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_receptions_security_checkin_id ON receptions(security_checkin_id);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnzqxhjsyrvzrgdrgrsq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuenF4aGpzeXJ2enJnZHJncnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjkxODIsImV4cCI6MjA3OTgwNTE4Mn0.7PxhcZXhEzZktvi0rOcL2hg4Q5PzVhTX_1EX8iPvu2k';

export const supabase = createClient(supabaseUrl, supabaseKey);
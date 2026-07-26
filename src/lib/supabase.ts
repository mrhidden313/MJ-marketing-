import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wevncduaaejdgbzkknpn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indldm5jZHVhYWVqZGdiemtrbnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNjI1MTEsImV4cCI6MjEwMDYzODUxMX0.AcH5NJVyq3KGN86TupEqiNGxt_nPSegZOAstlIiiDoE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

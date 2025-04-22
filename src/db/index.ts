import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://txsfzrqtfnshbxxuoirj.supabase.co';
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c2Z6cnF0Zm5zaGJ4eHVvaXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMDcwMDUsImV4cCI6MjA2MDc4MzAwNX0.RxGqaGrnG2EQ2RVLuwCx_-YdNQ9ZooxLcmUY-QcYHg8';

export default createClient(supabaseUrl, supabaseKey);

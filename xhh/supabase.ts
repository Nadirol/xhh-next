import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lsiuhexcrnfmbzynigtt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzaXVoZXhjcm5mbWJ6eW5pZ3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2MDg5OTAsImV4cCI6MjAwNzE4NDk5MH0.V35KBg2guRJYZDdg1bzz4go_9_hcU3FpmlIsRMwWV3I';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
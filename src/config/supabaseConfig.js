// Supabase Configuration
// Replace these values with your actual Supabase credentials

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvuobcpxuhykkaneqsrk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dW9iY3B4dWh5a2thbmVxc3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjI0NzQsImV4cCI6MjA3NzU5ODQ3NH0.jcol5hlFsdZ6hITS5C36OlS7tKw_0pqFGvm9poRftxw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


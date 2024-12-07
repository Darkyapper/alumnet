import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mqqzxmrejmrhqdbmrerx.supabase.co'; // Reemplaza con tu URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xcXp4bXJlam1yaHFkYm1yZXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MzM5NDcsImV4cCI6MjA0OTEwOTk0N30.c2dEKdSnYNbYfA-ksdwu_pufC_e3IG1QjAuNrT1reCc'; // Reemplaza con tu clave anónima

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

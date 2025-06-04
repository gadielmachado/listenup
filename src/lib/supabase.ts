import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eerduabfzrhxuxjddaga.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcmR1YWJmenJoeHV4amRkYWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjA4MzQsImV4cCI6MjA2NDUzNjgzNH0.A_dEu7gaEUKMc1ox-XCrEM6p91GwyUU-rmShM6iQGms'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para autenticação
export type User = {
  id: string;
  email: string;
  created_at: string;
}

export type AuthState = {
  user: User | null;
  loading: boolean;
} 
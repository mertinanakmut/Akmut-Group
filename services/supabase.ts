import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.39.7';

/**
 * Akmut Group - Supabase Konfigürasyonu
 * 
 * Veritabanı ve OTP Mail işlemleri için ana köprü.
 * Sağlanan güncel kimlik bilgileri kullanılmıştır.
 */

const supabaseUrl = process.env.SUPABASE_URL || 'https://kgsunrsdbsdnovhrlcfo.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3VucnNkYnNkbm92aHJsY2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2NTIyMTQsImV4cCI6MjA4MjIyODIxNH0.ok1kmOFXuYRIIVaepRMPYXPKhcmAOlNC0GKJoEiZmAM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
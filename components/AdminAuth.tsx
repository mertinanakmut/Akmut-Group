
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import Logo from './Logo.tsx';

interface AdminAuthProps {
  onAuthenticated: () => void;
  locale: string;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated, locale }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sadece bu e-posta adresiyle giriş denemelerine izin ver (Opsiyonel Güvenlik Katmanı)
  const ADMIN_EMAIL = 'destek@akmutgroup.com.tr';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const submittedEmail = email.trim().toLowerCase();

    // 1. E-posta Kontrolü
    if (submittedEmail !== ADMIN_EMAIL) {
      setError(locale === 'tr' 
        ? 'YETKİSİZ E-POSTA ADRESİ.' 
        : 'UNAUTHORIZED EMAIL ADDRESS.'
      );
      setIsLoading(false);
      return;
    }

    try {
      // 2. Supabase Şifreli Giriş
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: submittedEmail,
        password: password,
      });

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          throw new Error(locale === 'tr' 
            ? 'HATALI E-POSTA VEYA ŞİFRE.' 
            : 'INVALID EMAIL OR PASSWORD.');
        }
        throw authError;
      }

      // Başarılı Giriş
      onAuthenticated();
    } catch (err: any) {
      setError(err.message || (locale === 'tr' ? 'Bağlantı hatası.' : 'Connection error.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 animate-fade-in">
      <div className="bg-slate-900/40 border border-white/10 p-10 md:p-16 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
        
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-2">
            {/* Reverted to full corporate logo as per user request */}
            <Logo mode="full" className="h-20 md:h-24" />
          </div>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-widest leading-none">
            {locale === 'tr' ? 'YÖNETİCİ GİRİŞİ' : 'ADMIN LOGIN'}
          </h2>
          <p className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em]">PASSWORD AUTHENTICATION</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">E-POSTA</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="destek@akmutgroup.com.tr"
              className="w-full bg-white/5 border-b-2 border-white/10 p-4 text-xs font-bold text-white uppercase outline-none focus:border-sky-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{locale === 'tr' ? 'ŞİFRE' : 'PASSWORD'}</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border-b-2 border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-sky-500 transition-all"
            />
          </div>

          {error && (
            <p className="text-[10px] font-black text-red-500 uppercase italic bg-red-500/10 p-4 border-l-4 border-red-500 leading-relaxed">
              {error}
            </p>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-white text-[#020617] py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-sky-400 hover:text-white transition-all disabled:opacity-50"
          >
            {isLoading ? (locale === 'tr' ? 'GİRİŞ YAPILIYOR...' : 'LOGGING IN...') : (locale === 'tr' ? 'OTURUM AÇ' : 'SIGN IN')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;

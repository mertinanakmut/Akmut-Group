
import React, { useState, useEffect, useCallback } from 'react';
import { TENANTS, COMPANIES, ROADMAP } from './constants.ts';
import { CompanyStatus } from './types.ts';
import AIChatbot from './components/AIChatbot.tsx';
import LanguageSwitcher from './components/LanguageSwitcher.tsx';
import OurModel from './components/OurModel.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import AdminAuth from './components/AdminAuth.tsx';
import Logo from './components/Logo.tsx';
import { Locale } from './i18n.config.ts';
import { trCommon } from './locales/tr/common.ts';
import { enCommon } from './locales/en/common.ts';
import { supabase } from './services/supabase.ts';

const locales: Record<Locale, any> = { tr: trCommon, en: enCommon };

const LegalModal: React.FC<{ type: 'kvkk' | 'terms' | 'cookies', locale: Locale, onClose: () => void }> = ({ type, locale, onClose }) => {
  const content = {
    tr: {
      kvkk: {
        title: "KVKK AYDINLATMA METNİ",
        body: `Akmut Group, kişisel verilerinizin korunmasına önem verir. 6698 sayılı KVKK uyarınca verileriniz güvenle işlenmektedir.\n\n1. Veri Sorumlusu: Akmut Group.\n2. İşleme Amaçları: Hizmet sunumu ve platform güvenliği.\n3. Haklarınız: Verilerinize erişim, düzeltme ve silme talebi haklarınız saklıdır.`
      },
      terms: {
        title: "KULLANICI SÖZLEŞMESİ",
        body: `Bu siteyi kullanarak Akmut Group kullanım şartlarını kabul etmiş sayılırsınız.\n\n1. İçerik: Sitedeki tüm materyaller bilgilendirme amaçlıdır.\n2. Mülkiyet: Tüm tasarımlar Akmut Group'a aittir.\n3. Sorumluluk: Teknik kaynaklı veri kayıplarından şirket sorumlu tutulamaz.`
      },
      cookies: {
        title: "ÇEREZ POLİTİKASI",
        body: `Deneyiminizi geliştirmek için çerezler kullanıyoruz.\n\n1. Amaç: Site trafiği analizi ve tercih hatırlama.\n2. Yönetim: Tarayıcı ayarlarından çerezleri kontrol edebilirsiniz.`
      }
    },
    en: {
      kvkk: {
        title: "DATA PRIVACY NOTICE",
        body: `Akmut Group prioritizes your data security under GDPR and local laws.\n\n1. Controller: Akmut Group.\n2. Purpose: Service delivery and security.\n3. Rights: You have the right to access, rectify, or delete your data.`
      },
      terms: {
        title: "USER AGREEMENT",
        body: `By using this site, you agree to our terms of service.\n\n1. Content: All materials are for information only.\n2. Ownership: Designs belong to Akmut Group.\n3. Liability: No liability for technical downtime.`
      },
      cookies: {
        title: "COOKIE POLICY",
        body: `We use cookies for analytics and performance.\n\n1. Purpose: Remembering preferences.\n2. Management: Control via browser settings.`
      }
    }
  };

  const activeContent = content[locale][type];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#020617] border border-white/10 w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">{activeContent.title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8 space-y-4 text-slate-400 text-sm leading-relaxed italic whitespace-pre-wrap">
          {activeContent.body}
        </div>
        <div className="p-6 border-t border-white/5 bg-white/5 text-right">
          <button onClick={onClose} className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all">
            {locale === 'tr' ? 'KAPAT' : 'CLOSE'}
          </button>
        </div>
      </div>
    </div>
  );
};

const DigitalPlatform: React.FC<{ locale: Locale, onBack: () => void }> = ({ locale, onBack }) => (
  <div className="animate-fade-in space-y-12">
    <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center space-x-2 group">
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      <span>{locale === 'tr' ? 'GERİ DÖN' : 'BACK'}</span>
    </button>
    <div className="space-y-4">
      <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">AKMUT DIGITAL</h2>
      <p className="text-slate-500 font-bold border-l-2 border-sky-500 pl-6 uppercase italic text-sm">
        {locale === 'tr' ? 'YENİLİKÇİ YAZILIM EKOSİSTEMİ.' : 'INNOVATIVE SOFTWARE ECOSYSTEM.'}
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { 
          id: 'quick-swap', 
          name: 'QUICK SWAP', 
          desc: locale === 'tr' ? 'Hızlı ve güvenli ticaret platformu.' : 'Fast and secure trading platform.',
          img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800'
        },
        { 
          id: 'tryonx', 
          name: 'TRYONX', 
          desc: locale === 'tr' ? 'Yapay zeka moda ekosistemi.' : 'AI fashion ecosystem.',
          img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
        }
      ].map(app => (
        <div key={app.id} className="bg-white/5 border border-white/5 p-1 transition-all group hover:border-sky-500/50">
          <div className="aspect-video overflow-hidden">
            <img src={app.img} alt={app.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:brightness-[1.2] transition-all duration-700" />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-black text-white italic uppercase">{app.name}</h3>
            <p className="text-slate-500 text-xs font-bold uppercase italic">{app.desc}</p>
            <button className="w-full py-4 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
              {locale === 'tr' ? 'DETAYLAR' : 'DETAILS'}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'companies' | 'model' | 'vision' | 'management' | 'join' | 'digital-platform'>('home');
  const [locale, setLocale] = useState<Locale>('tr');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState<'none' | 'kvkk' | 'terms' | 'cookies'>('none');

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value = locales[locale];
    for (const k of keys) {
      if (value && value[k]) value = value[k];
      else return key;
    }
    return typeof value === 'string' ? value : key;
  }, [locale]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const navItems = ['home', 'companies', 'model', 'vision', 'management'] as const;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {showLegalModal !== 'none' && (
        <LegalModal type={showLegalModal as any} locale={locale} onClose={() => setShowLegalModal('none')} />
      )}

      {/* STICKY HEADER */}
      <nav className="sticky top-0 z-[200] bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex justify-between items-center">
          <div className="cursor-pointer group flex items-center" onClick={() => setActiveTab('home')}>
            <Logo mode="full" className="h-10 md:h-14 transition-transform group-hover:scale-[1.02]" />
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative py-2 ${activeTab === tab ? 'text-sky-400' : 'text-slate-500 hover:text-white'}`}
              >
                {t(`nav.${tab}`)}
                {activeTab === tab && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,1)]"></div>}
              </button>
            ))}
            <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
            <button 
              onClick={() => setActiveTab('join')}
              className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all shadow-xl"
            >
              {t('nav.join')}
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-[#020617] p-8 flex flex-col justify-center items-center space-y-8 animate-fade-in lg:hidden">
          {navItems.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
              className={`text-3xl font-black uppercase italic tracking-widest ${activeTab === tab ? 'text-sky-400' : 'text-white/30'}`}
            >
              {t(`nav.${tab}`)}
            </button>
          ))}
          <div className="pt-8 w-full flex flex-col items-center space-y-6">
            <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
            <button onClick={() => { setActiveTab('join'); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest">
              {t('nav.join')}
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-32">
        {activeTab === 'home' && (
          <div className="space-y-32 animate-fade-in">
            <section className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                <div className="inline-flex items-center space-x-4">
                  <div className="w-12 h-px bg-sky-500"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-400">AKMUT GROUP</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-black text-white italic leading-[0.8] tracking-tighter uppercase">
                  PRECISION<br/><span className="text-sky-500">ENGINEERING</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 font-bold uppercase italic border-l-4 border-sky-500 pl-8 leading-relaxed max-w-lg">
                  {t('hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <button onClick={() => setActiveTab('companies')} className="px-12 py-5 bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">
                    {t('hero.cta_primary')}
                  </button>
                  <button onClick={() => setActiveTab('model')} className="px-12 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    {t('hero.cta_secondary')}
                  </button>
                </div>
              </div>
              <div className="relative border border-white/5 p-2 bg-white/5 aspect-square group overflow-hidden">
                 <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-[1.25] transition-all duration-700 ease-in-out" 
                 />
                 <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#020617]/70 to-transparent pointer-events-none transition-opacity group-hover:opacity-40"></div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="space-y-16 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">{t('companies.active')}</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {COMPANIES.map(c => (
                <div key={c.id} className="bg-white/5 border border-white/5 p-8 md:p-12 space-y-8 group hover:border-sky-500/50 transition-all cursor-pointer" onClick={() => c.id === 'akmut-digital' ? setActiveTab('digital-platform') : null}>
                   <div className="h-48 overflow-hidden">
                     <img src={c.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-[1.2] transition-all duration-700" />
                   </div>
                   <div className="space-y-4">
                     <h3 className="text-3xl font-black text-white uppercase italic">{c.name}</h3>
                     <p className="text-sky-400 text-[10px] font-black uppercase tracking-widest">{locale === 'tr' ? c.sector.tr : c.sector.en}</p>
                     <p className="text-slate-400 text-sm font-bold uppercase italic leading-relaxed">{locale === 'tr' ? c.description.tr : c.description.en}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'model' && <OurModel t={t} locale={locale} />}
        {activeTab === 'digital-platform' && <DigitalPlatform locale={locale} onBack={() => setActiveTab('companies')} />}

        {activeTab === 'vision' && (
          <div className="space-y-24 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-none tracking-tighter">{t('nav.vision')}</h2>
            <div className="grid gap-16 relative pl-8 border-l border-white/10">
              {ROADMAP.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 bg-sky-500 rotate-45"></div>
                  <div className="text-sky-500 font-black text-4xl mb-2">{item.year}</div>
                  <h4 className="text-xl font-black text-white uppercase italic mb-2">{locale === 'tr' ? item.title.tr : item.title.en}</h4>
                  <p className="text-slate-500 font-bold uppercase italic text-sm max-w-2xl">{locale === 'tr' ? item.desc.tr : item.desc.en}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'join' && (
          <div className="animate-fade-in space-y-16">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">{t('join.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['as_client', 'as_talent', 'as_partner'].map(role => (
                <div key={role} className="bg-white/5 p-12 text-center hover:bg-slate-900 transition-all border border-white/5">
                   <h4 className="text-white font-black uppercase text-xs tracking-[0.4em] mb-8">{t(`join.${role}`)}</h4>
                   <button className="text-[10px] font-black text-sky-400 uppercase tracking-widest hover:text-white transition-all">CONTACT →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'management' && (
          isAdminAuthenticated ? <AdminDashboard t={t} locale={locale} /> : <AdminAuth onAuthenticated={() => setIsAdminAuthenticated(true)} locale={locale} />
        )}
      </main>

      <footer className="border-t border-white/5 py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
          <div className="space-y-8">
            <Logo mode="full" className="h-10 opacity-30" />
            <p className="text-[10px] font-bold text-slate-600 uppercase italic leading-relaxed max-w-xs">{t('footer.intro')}</p>
          </div>
          <div className="space-y-6">
            <h6 className="text-[10px] font-black text-white uppercase tracking-widest opacity-40">{t('footer.legal')}</h6>
            <div className="flex flex-col space-y-3">
              <button onClick={() => setShowLegalModal('kvkk')} className="text-[10px] font-bold text-slate-500 hover:text-sky-400 text-left uppercase tracking-widest">{t('footer.kvkk')}</button>
              <button onClick={() => setShowLegalModal('terms')} className="text-[10px] font-bold text-slate-500 hover:text-sky-400 text-left uppercase tracking-widest">{t('footer.terms')}</button>
              <button onClick={() => setShowLegalModal('cookies')} className="text-[10px] font-bold text-slate-500 hover:text-sky-400 text-left uppercase tracking-widest">{t('footer.cookies')}</button>
            </div>
          </div>
          <div className="text-right space-y-4">
             <p className="text-[10px] font-black text-white uppercase tracking-widest">ANKARA / BILKENT CYBERPARK</p>
             <p className="text-[9px] font-bold text-slate-700 uppercase italic">© 2025 AKMUT GROUP. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>

      <AIChatbot tenantName="Akmut Group" t={t} />

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;

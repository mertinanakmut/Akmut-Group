
import React from 'react';

interface ModelSection {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

interface OurModelProps {
  t: (key: string) => string;
  locale: string;
}

const OurModel: React.FC<OurModelProps> = ({ t, locale }) => {
  const sections: ModelSection[] = [
    {
      id: 'rd',
      number: '01',
      title: locale === 'tr' ? 'AR-GE VE KEŞİF' : 'R&D & DISCOVERY',
      description: locale === 'tr' 
        ? 'Pazardaki boşlukları tespit ediyor ve teknolojik fizibilite çalışmalarını yürütüyoruz.'
        : 'Identifying market gaps and conducting deep technological feasibility studies.',
      details: [
        locale === 'tr' ? 'Pazar Analizi' : 'Market Analysis',
        locale === 'tr' ? 'Teknik Prototipleme' : 'Technical Prototyping',
        locale === 'tr' ? 'MVP Doğrulama' : 'MVP Validation'
      ],
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'inc',
      number: '02',
      title: locale === 'tr' ? 'YAPILANDIRMA' : 'INCORPORATION',
      description: locale === 'tr'
        ? 'Fikri bağımsız bir tüzelliğe dönüştürüyor, kurucu ekibi ve operasyonel altyapıyı kuruyoruz.'
        : 'Transforming ideas into independent legal entities, building founding teams and infra.',
      details: [
        locale === 'tr' ? 'Yasal Kuruluş' : 'Legal Incorporation',
        locale === 'tr' ? 'Ekip Kurulumu' : 'Team Formation',
        locale === 'tr' ? 'Marka Kimliği' : 'Brand Identity'
      ],
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'growth',
      number: '03',
      title: locale === 'tr' ? 'ÖLÇEKLENEBİLİR BÜYÜME' : 'SCALABLE GROWTH',
      description: locale === 'tr'
        ? 'Ürünü pazara sunuyor, kullanıcı tabanını genişletiyor ve sürdürülebilir gelir modelleri oluşturuyoruz.'
        : 'Launching to market, expanding user base, and establishing sustainable revenue models.',
      details: [
        locale === 'tr' ? 'Pazara Giriş' : 'Go-to-Market',
        locale === 'tr' ? 'Büyüme Hackleri' : 'Growth Hacking',
        locale === 'tr' ? 'Operasyonel Mükemmellik' : 'Operational Excellence'
      ],
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'synergy',
      number: '04',
      title: locale === 'tr' ? 'EKOSİSTEM SİNERJİSİ' : 'ECOSYSTEM SYNERGY',
      description: locale === 'tr'
        ? 'Girişimler arası veri paylaşımı ve teknoloji transferi ile kolektif bir güç oluşturuyoruz.'
        : 'Creating collective strength via cross-venture data sharing and tech transfer.',
      details: [
        locale === 'tr' ? 'Teknoloji Transferi' : 'Tech Transfer',
        locale === 'tr' ? 'Ortak Veri Havuzu' : 'Shared Data Pool',
        locale === 'tr' ? 'Stratejik Ortaklıklar' : 'Strategic Partnerships'
      ],
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="animate-fade-in space-y-32 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
          {t('model.title')}
        </h2>
        <div className="w-24 h-[4px] bg-sky-500 mx-auto"></div>
        <p className="text-xl md:text-2xl text-slate-400 font-bold leading-relaxed uppercase italic">
          {t('model.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 shadow-3xl">
        {sections.map((section) => (
          <div key={section.id} className="bg-[#020617] p-12 lg:p-16 relative group hover:bg-slate-900 transition-all flex flex-col h-full">
            <div className="absolute top-8 right-8 text-[100px] font-black text-sky-500/5 italic leading-none select-none">
              {section.number}
            </div>
            <div className="relative z-10 space-y-10 flex flex-col h-full">
              <div className="text-sky-400">{section.icon}</div>
              <div className="space-y-6">
                <h4 className="text-xl font-black uppercase tracking-[0.2em] text-white border-l-4 border-sky-500 pl-4 italic">
                  {section.title}
                </h4>
                <p className="text-sm text-slate-500 font-bold leading-relaxed italic uppercase">
                  {section.description}
                </p>
              </div>
              <div className="pt-8 border-t border-white/5 mt-auto">
                <ul className="space-y-3">
                  {section.details.map((detail, i) => (
                    <li key={i} className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="w-1.5 h-1.5 bg-sky-500 rotate-45"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto p-12 md:p-20 bg-slate-900/50 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-6 flex-1">
          <h3 className="text-3xl font-black text-white italic uppercase tracking-wider">
            {locale === 'tr' ? 'BİRLİKTE İNŞA EDELİM' : 'LET\'S BUILD TOGETHER'}
          </h3>
          <p className="text-slate-400 font-bold italic leading-relaxed uppercase">
            {locale === 'tr' 
              ? 'Akmut Group ekosisteminde yeni bir girişim başlatmak veya mevcut işinizi teknolojimizle büyütmek için profesyonel kanallarımız her zaman açık.'
              : 'Our professional channels are always open to start a new venture in the Akmut Group ecosystem or grow your existing business with our technology.'}
          </p>
        </div>
        <button className="px-12 py-5 bg-white text-[#020617] font-black uppercase text-xs tracking-[0.3em] hover:bg-sky-500 hover:text-white transition-all shadow-2xl shrink-0">
          {locale === 'tr' ? 'BİZE KATILIN' : 'JOIN US'}
        </button>
      </div>
    </div>
  );
};

export default OurModel;

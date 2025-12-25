
import React from 'react';
import { i18nConfig, Locale } from '../i18n.config';

interface LanguageSwitcherProps {
  currentLocale: string;
  onLocaleChange: (locale: Locale) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale, onLocaleChange }) => {
  const flags: Record<string, string> = {
    tr: '🇹🇷',
    en: '🇬🇧'
  };

  const names: Record<string, string> = {
    tr: 'Türkçe',
    en: 'English'
  };

  return (
    <div className="flex items-center bg-white/5 border border-white/10 p-1.5 rounded-xl backdrop-blur-2xl shadow-2xl">
      {i18nConfig.locales.map((loc) => {
        const isActive = currentLocale === loc;
        return (
          <button
            key={loc}
            onClick={() => onLocaleChange(loc)}
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-500 ease-out
              ${isActive 
                ? 'bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105 z-10' 
                : 'opacity-30 grayscale hover:opacity-80 hover:grayscale-0 hover:bg-white/5'
              }
            `}
            title={names[loc]}
          >
            <span className="text-xl leading-none select-none">
              {flags[loc]}
            </span>
            
            {/* Active Indicator Line */}
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,1)] animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;

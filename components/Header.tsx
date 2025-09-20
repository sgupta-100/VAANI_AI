import React, { useState } from 'react';
import { Language, LanguageOption } from '../types';
import { APP_NAME, LANGUAGES } from '../constants';
import { VaaniLogo, LanguageIcon, MenuIcon } from './Icons';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onMarketingClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange, onMarketingClick }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <VaaniLogo className="w-8 h-8 text-amber-800" />
          <h1 className="text-2xl font-bold text-amber-900 tracking-tight">{APP_NAME}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onMarketingClick}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-stone-700 bg-stone-200 rounded-lg hover:bg-stone-300 transition-colors"
          >
            <MenuIcon className="w-4 h-4" />
            Marketing Tools
          </button>
           <button
            onClick={onMarketingClick}
            className="sm:hidden p-2 text-stone-700 bg-stone-200 rounded-lg hover:bg-stone-300 transition-colors"
            aria-label="Marketing Tools"
          >
            <MenuIcon className="w-5 h-5" />
          </button>


          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-2 text-stone-700 bg-stone-200 rounded-lg hover:bg-stone-300 transition-colors"
               aria-label="Change language"
            >
              <LanguageIcon className="w-5 h-5" />
            </button>
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-1 z-30">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      currentLanguage === lang.code
                        ? 'bg-amber-100 text-amber-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
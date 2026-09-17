import React from 'react';
import { ExternalLink, Globe, Sparkles, Network } from 'lucide-react';
import { Language } from '../types';

interface NetworkBarProps {
  currentLang: Language;
  onToggleLang: () => void;
}

export const NetworkBar: React.FC<NetworkBarProps> = ({ currentLang, onToggleLang }) => {
  const isAr = currentLang === 'ar';

  return (
    <header className="bg-slate-950/95 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 gap-3">
          
          {/* Network Connection Link & Badge */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Network className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isAr ? 'شبكة المنصات الذكية' : 'Smart Academic Network'}</span>
            </span>

            {/* Direct link to previous platform */}
            <a
              href="https://the-brilliant-mathematics-and-scien.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-emerald-400 transition-colors bg-slate-900/80 hover:bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-emerald-500/40"
              title="الانتقال إلى المنصة السابقة: منصة الرياضيات والعلوم العبقرية"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="truncate max-w-[210px] sm:max-w-none">
                {isAr
                  ? 'المنصة السابقة: منصة الرياضيات والعلوم العبقرية'
                  : 'Previous Platform: The Brilliant Math & Science'}
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0" />
            </a>
          </div>

          {/* Right side: Language Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-sm transition-all active:scale-95"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { ShieldCheck, ExternalLink, Sparkles, GraduationCap, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenPrivacy }) => {
  const isAr = currentLang === 'ar';

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60 text-center md:text-right">
          
          {/* Brand & Mission */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-base">
                {isAr ? 'منصة الإنجليزية الذكية - المعلم الخصوصي للغات' : 'Smart English Platform - Language Tutor'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'بيئة تعليمية تفاعلية متطورة موجهة للطلاب والمتمدرسين لتأسيس القواعد، وبناء المفردات، وتصحيح الصياغة اللغوية باحترافية وأمان تام.'
                : 'An advanced interactive learning environment dedicated to mastering grammar, expanding vocabulary, and smart writing correction.'}
            </p>
          </div>

          {/* Quick Links & Network */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {/* Link to previous platform */}
            <a
              href="https://the-brilliant-mathematics-and-scien.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 border border-slate-800 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'الانتقال إلى منصة الرياضيات والعلوم العبقرية (المنصة السابقة)' : 'Visit Previous Platform: Math & Science'}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* Privacy Modal Trigger */}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-indigo-400 border border-slate-800 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isAr ? 'سياسة الخصوصية وملفات الكوكيز (أمان الطلاب)' : 'Privacy Policy & Cookies'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          {/* Founder & Supervisor prominent mention */}
          <div className="flex items-center gap-2 text-slate-300">
            <span>{isAr ? 'المؤسس والمشرف الأكاديمي:' : 'Founder & Supervisor:'}</span>
            <span className="font-bold text-white px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-700/40 text-indigo-300">
              Taha Setri
            </span>
          </div>

          {/* Copyright 2026 */}
          <div className="text-center sm:text-left text-slate-400">
            {isAr
              ? 'جميع الحقوق محفوظة © 2026 - Taha Setri. صُممت وطُوّرت بأعلى معايير الويب الأكاديمية.'
              : 'All rights reserved © 2026 - Taha Setri. Crafted with premium academic web standards.'}
          </div>

        </div>

      </div>
    </footer>
  );
};

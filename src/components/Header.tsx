import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  PenTool, 
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { Language, StudentLevel } from '../types';

interface HeaderProps {
  currentLang: Language;
  selectedLevel: StudentLevel;
  onSelectLevel: (lvl: StudentLevel) => void;
  activeTab: 'grammar' | 'vocab' | 'coach';
  onSelectTab: (tab: 'grammar' | 'vocab' | 'coach') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  selectedLevel,
  onSelectLevel,
  activeTab,
  onSelectTab
}) => {
  const isAr = currentLang === 'ar';

  const levels: { id: StudentLevel; labelAr: string; labelEn: string; descAr: string; descEn: string }[] = [
    {
      id: 'beginner',
      labelAr: 'مبتدئ (A1 - A2)',
      labelEn: 'Beginner (A1 - A2)',
      descAr: 'الأساسيات وبناء الجمل البسيطة والأزمنة',
      descEn: 'Foundational grammar, basic verbs & core daily vocabulary'
    },
    {
      id: 'intermediate',
      labelAr: 'متوسط (B1 - B2)',
      labelEn: 'Intermediate (B1 - B2)',
      descAr: 'الروابط، الجمل الشرطية، وتوسيع المفردات',
      descEn: 'Complex clauses, conditionals & contextual fluency'
    },
    {
      id: 'advanced',
      labelAr: 'متقدم (C1 - C2)',
      labelEn: 'Advanced (C1 - C2)',
      descAr: 'الكتابة الأكاديمية، المبني للمجهول، والبلاغة',
      descEn: 'Academic register, rhetorical inversion & IELTS mastery'
    }
  ];

  return (
    <section className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-[#0b0f19]">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-72 h-48 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center space-y-6">
        
        {/* Main Badge & Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-xs font-semibold text-indigo-300 shadow-inner">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>{isAr ? 'منصة التعليم الأكاديمي الذكي 2026' : 'Smart Academic Platform 2026'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {isAr ? 'منصة الإنجليزية الذكية - المعلم الخصوصي للغات' : 'Smart English Platform - Private Language Tutor'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            {isAr
              ? 'منصة تعليمية تفاعلية لتعلم قواعد اللغة الإنجليزية، بناء المفردات، وتصحيح النصوص وصياغة الجمل بخطوات مبسطة باللغة العربية مع ميزة الصوت الذكي للشرح والتوجيه.'
              : 'An interactive pedagogical platform for mastering English grammar, expanding vocabulary, and smart sentence correction with step-by-step explanations and male voice tutor narration.'}
          </p>
        </div>

        {/* Level Selector Cards */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-2">
            <span>{isAr ? 'اختر مستواك التعليمي لتخصيص الدروس:' : 'Select your proficiency level:'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {levels.map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => onSelectLevel(lvl.id)}
                  className={`relative p-3.5 rounded-xl border text-right sm:text-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/70 text-white shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 sm:hidden">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}
                  <div className="font-bold text-sm text-white flex items-center justify-between sm:justify-center gap-1.5">
                    <span>{isAr ? lvl.labelAr : lvl.labelEn}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 hidden sm:inline" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {isAr ? lvl.descAr : lvl.descEn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onSelectTab('grammar')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'grammar'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-300" />
            <span>{isAr ? '1. القواعد وشرحها خطوة بخطوة' : '1. Grammar Step-by-Step'}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('vocab')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'vocab'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-300" />
            <span>{isAr ? '2. المفردات والبطاقات التعليمية' : '2. Vocabulary & Flashcards'}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('coach')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'coach'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-700 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <PenTool className="w-4 h-4 text-cyan-300" />
            <span>{isAr ? '3. تصحيح الجمل والكتابة الذكية' : '3. Sentence Correction & Coach'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};

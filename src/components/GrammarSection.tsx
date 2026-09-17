import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Key, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GrammarLesson, Language, StudentLevel } from '../types';
import { GRAMMAR_LESSONS } from '../data/learningData';
import { AudioPlayerControl } from './AudioPlayerControl';

interface GrammarSectionProps {
  currentLang: Language;
  selectedLevel: StudentLevel;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({ currentLang, selectedLevel }) => {
  const isAr = currentLang === 'ar';
  const [activeLessonId, setActiveLessonId] = useState<string>(GRAMMAR_LESSONS[0]?.id || '');
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, number | null>>({});
  const [showQuizResult, setShowQuizResult] = useState<Record<string, boolean>>({});

  // Filter lessons by level or show all if level matches
  const filteredLessons = GRAMMAR_LESSONS.filter(l => l.level === selectedLevel);
  const lessonsToDisplay = filteredLessons.length > 0 ? filteredLessons : GRAMMAR_LESSONS;

  const currentLesson = lessonsToDisplay.find(l => l.id === activeLessonId) || lessonsToDisplay[0];

  const handleSelectQuizAnswer = (lessonId: string, optionIndex: number) => {
    setUserQuizAnswers(prev => ({ ...prev, [lessonId]: optionIndex }));
    setShowQuizResult(prev => ({ ...prev, [lessonId]: true }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isAr ? 'القسم الأول: القواعد وشرحها خطوة بخطوة' : 'Section 1: Grammar Step-by-Step Rules'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isAr 
              ? 'منهجية تربوية مبسطة تشرح بنية الجملة، الاستخدام الصحيح، الأخطاء الشائعة واختبار الفهم الفوري.' 
              : 'Pedagogical methodology with sentence formula, correct usage, pitfalls, and audio narration.'}
          </p>
        </div>

        {/* Current Level Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400">{isAr ? 'المستوى المعروض:' : 'Level:'}</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 uppercase">
            {selectedLevel}
          </span>
        </div>
      </div>

      {/* Lesson Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {lessonsToDisplay.map((lesson) => (
          <button
            key={lesson.id}
            type="button"
            onClick={() => setActiveLessonId(lesson.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeLessonId === lesson.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {isAr ? lesson.titleAr : lesson.titleEn}
          </button>
        ))}
      </div>

      {/* Selected Lesson Detail Card */}
      {currentLesson && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl shadow-black/30">
          
          {/* Title & Summary */}
          <div className="space-y-2 border-b border-slate-800/80 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                {currentLesson.category}
              </span>
              <span className="text-xs text-slate-400">
                {isAr ? `المستوى: ${currentLesson.level}` : `Level: ${currentLesson.level}`}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white">
              {isAr ? currentLesson.titleAr : currentLesson.titleEn}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentLesson.summaryAr}
            </p>
          </div>

          {/* Audio Tutor Bar */}
          <AudioPlayerControl
            arabicText={currentLesson.audioExplanationAr}
            englishText={currentLesson.audioExplanationEn}
            defaultLang="ar"
            title={isAr ? `شرح صوتي للمعلم: ${currentLesson.titleAr}` : `Male Tutor Voice: ${currentLesson.titleEn}`}
            uiLang={currentLang}
          />

          {/* Step 1: Formula / Structure */}
          <div className="bg-slate-950/70 border border-indigo-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? '1. الصيغة والتركيب النحوي (Formula / Structure)' : '1. Formula / Structure'}</span>
            </div>
            <div className="font-mono text-sm sm:text-base font-bold text-emerald-400 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800" dir="ltr">
              {currentLesson.structure}
            </div>
          </div>

          {/* Step 2: When & Why to Use */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? '2. متى وكيف نستخدم هذه القاعدة؟' : '2. When and why to use this tense?'}</span>
            </h4>
            <p className="text-sm text-slate-300 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
              {currentLesson.whenToUseAr}
            </p>
          </div>

          {/* Step 3: Signal Keywords */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>{isAr ? '3. الكلمات الدالة والمفاتيح الزمنية (Signal Words)' : '3. Signal Keywords'}</span>
            </h4>
            <div className="flex flex-wrap gap-2" dir="ltr">
              {currentLesson.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-amber-950/30 text-amber-300 border border-amber-800/40"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Step 4: Illustrative Examples */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
              {isAr ? '4. أمثلة توضيحية مع التحليل الدقيق:' : '4. Illustrative Examples:'}
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {currentLesson.examples.map((eg, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1.5 text-sm"
                >
                  <div className="font-semibold text-indigo-200" dir="ltr">
                    {eg.english}
                  </div>
                  <div className="text-emerald-400 text-xs sm:text-sm">
                    {eg.arabic}
                  </div>
                  <div className="text-xs text-slate-400 bg-slate-900/90 p-2 rounded border border-slate-800">
                    💡 <span className="font-semibold text-slate-300">{isAr ? 'ملاحظة المعلم:' : 'Note:'}</span> {eg.explanationAr}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 5: Common Pitfalls & Mistakes */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-red-300 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>{isAr ? '5. أخطاء شائعة يجب تجنبها تماماً:' : '5. Common Pitfalls to Avoid:'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentLesson.commonMistakes.map((mistake, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-red-950/20 border border-red-900/40 rounded-xl p-3.5 space-y-2 text-xs sm:text-sm"
                >
                  <div className="flex items-start gap-2 text-red-400">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="line-through font-mono" dir="ltr">{mistake.wrong}</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="font-mono font-bold" dir="ltr">{mistake.correct}</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded border border-red-900/20">
                    {mistake.reasonAr}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 6: Interactive Comprehension Mini Quiz */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-indigo-500/30 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-indigo-300 text-xs sm:text-sm font-bold">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>{isAr ? '6. اختبار سريع للتحقق من الفهم (Mini Quiz)' : '6. Mini Quiz'}</span>
              </div>
              {showQuizResult[currentLesson.id] && (
                <button
                  type="button"
                  onClick={() => {
                    setShowQuizResult(prev => ({ ...prev, [currentLesson.id]: false }));
                    setUserQuizAnswers(prev => ({ ...prev, [currentLesson.id]: null }));
                  }}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  {isAr ? 'إعادة الاختبار' : 'Reset Quiz'}
                </button>
              )}
            </div>

            <p className="text-sm font-semibold text-white" dir="ltr">
              {currentLesson.quickQuiz.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentLesson.quickQuiz.options.map((opt, optIdx) => {
                const isSelected = userQuizAnswers[currentLesson.id] === optIdx;
                const isAnswered = showQuizResult[currentLesson.id];
                const isCorrect = optIdx === currentLesson.quickQuiz.correctIndex;

                let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-300';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-900/80 border-indigo-500 text-white';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectQuizAnswer(currentLesson.id, optIdx)}
                    className={`p-3 rounded-lg border text-xs sm:text-sm font-mono text-left transition-all flex items-center justify-between ${btnStyle}`}
                    dir="ltr"
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                  </button>
                );
              })}
            </div>

            {showQuizResult[currentLesson.id] && (
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-indigo-300">
                  {userQuizAnswers[currentLesson.id] === currentLesson.quickQuiz.correctIndex
                    ? (isAr ? '✓ إجابة صحيحة وممتازة! ' : '✓ Correct! ')
                    : (isAr ? '✗ إجابة غير دقيقة. ' : '✗ Incorrect. ')}
                </span>
                {currentLesson.quickQuiz.explanationAr}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  CheckCheck, 
  Copy, 
  Check, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { AnalysisResult, Language } from '../types';
import { TRAINING_PRESETS } from '../data/learningData';
import { analyzeSentencePedagogically } from '../utils/pedagogicalEngine';
import { AudioPlayerControl } from './AudioPlayerControl';

interface SentenceCoachSectionProps {
  currentLang: Language;
}

export const SentenceCoachSection: React.FC<SentenceCoachSectionProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';

  const [inputText, setInputText] = useState('He go to school yesterday with his brother.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(() => 
    analyzeSentencePedagogically('He go to school yesterday with his brother.', 'correct')
  );
  const [copied, setCopied] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleExecuteAction = (action: 'correct' | 'simplify' | 'analyze' | 'translate' | 'formal') => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);

    // Simulate brief pedagogical processing
    setTimeout(() => {
      const res = analyzeSentencePedagogically(inputText, action);
      setResult(res);
      setIsAnalyzing(false);
    }, 250);
  };

  const handleApplyPreset = (presetText: string) => {
    setInputText(presetText);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    const res = analyzeSentencePedagogically(presetText, 'correct');
    setResult(res);
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <PenTool className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isAr ? 'القسم الثالث: تصحيح الجمل والكتابة الذكية' : 'Section 3: Smart Sentence Correction & Writing Coach'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isAr
              ? 'أدخل أي جملة إنجليزية أو عربية لتحصل على تصحيح فوري، ترجمة تربوية، تحليل نحوي، وشرح صوتي كامل بصوت المعلم.'
              : 'Enter any English or Arabic sentence for instant correction, grammatical analysis, and voice breakdown.'}
          </p>
        </div>
      </div>

      {/* Quick Training Presets */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isAr ? 'نماذج جاهزة للتدريب والملاحظة السريعة:' : 'Quick Practice Presets:'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TRAINING_PRESETS.map((preset, pIdx) => (
            <button
              key={pIdx}
              type="button"
              onClick={() => handleApplyPreset(preset.text)}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-900/90 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-700/60 transition-all text-right flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span className="font-semibold">{preset.label}</span>
              <span className="text-[10px] text-slate-500">({preset.level})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Input Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <label htmlFor="sentence-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>{isAr ? 'حقل إدخال النص أو الجملة المراد فحصها وتطويرها:' : 'Input your sentence (English or Arabic):'}</span>
          </label>
          {inputText && (
            <button
              type="button"
              onClick={() => setInputText('')}
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isAr ? 'مسح النص' : 'Clear'}</span>
            </button>
          )}
        </div>

        <textarea
          id="sentence-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isAr ? 'اكتب أو الصق جملتك هنا بالإنجليزية أو العربية (مثال: She don\'t likes apples)...' : 'Write or paste your sentence here...'}
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed font-latin"
          dir="auto"
        />

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleExecuteAction('correct')}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>{isAr ? 'تصحيح نحوي وإملائي' : 'Correct Grammar'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleExecuteAction('simplify')}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors disabled:opacity-50"
          >
            <span>{isAr ? 'تبسيط الصياغة' : 'Simplify'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleExecuteAction('formal')}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'صياغة أكاديمية راقية' : 'Academic Formal'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleExecuteAction('translate')}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors disabled:opacity-50"
          >
            <span>{isAr ? 'ترجمة وتحليل تركيبي' : 'Translate & Analyze'}</span>
          </button>
        </div>
      </div>

      {/* Pedagogical Results Display Area */}
      {result && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-2xl">
          
          {/* Result Header & Audio Voice Tutor */}
          <div className="border-b border-slate-800/80 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
                {isAr ? 'النتيجة التربوية المعتمدة' : 'Pedagogical Evaluation'}
              </span>
              <span className="text-xs text-slate-400">
                {isAr ? 'معلم الإنجليزية الذكي' : 'Smart English Tutor'}
              </span>
            </div>

            {/* Voice explanation player */}
            <AudioPlayerControl
              arabicText={result.audioTeacherNarrationAr}
              englishText={result.audioTeacherNarrationEn}
              defaultLang="ar"
              title={isAr ? 'شرح المعلم الصوتي (رجل) لنتائج هذه الجملة' : 'Male Tutor Voice Explanation'}
              uiLang={currentLang}
            />
          </div>

          {/* 1. Corrected / Improved Sentence */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? '1. الصياغة الإنجليزية المصححة والمحسنة:' : '1. Corrected & Polished English:'}</span>
              </h4>
              <button
                type="button"
                onClick={() => handleCopy(result.correctedText)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الجملة' : 'Copy')}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-base sm:text-lg font-bold text-emerald-300 font-latin leading-relaxed" dir="ltr">
              {result.correctedText}
            </div>
          </div>

          {/* 2. Accurate Arabic Translation */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>{isAr ? '2. الترجمة التربوية الدقيقة باللغة العربية:' : '2. Accurate Arabic Translation:'}</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm sm:text-base text-slate-200 leading-relaxed font-semibold">
              {result.arabicTranslation}
            </div>
          </div>

          {/* 3. Pedagogical Rule & Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{isAr ? '3. القاعدة النحوية والملاحظات التربوية:' : '3. Grammar Rule Breakdown:'}</span>
            </h4>
            
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="font-bold text-sm sm:text-base text-white">
                {result.grammarRuleTitleAr}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {result.grammarRuleExplanationAr}
              </p>

              {/* Identified Issues list */}
              {result.identifiedIssues && result.identifiedIssues.length > 0 && (
                <div className="pt-2 space-y-2 border-t border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-400 block">
                    {isAr ? 'تفصيل مواضع التعديل النحوي:' : 'Specific Adjustments:'}
                  </span>
                  {result.identifiedIssues.map((issue, idx) => (
                    <div key={idx} className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-red-400 line-through">{issue.originalPart}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="text-emerald-400 font-bold">{issue.correctedPart}</span>
                      </div>
                      <p className="text-slate-300">{issue.explanationAr}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. Illustrative Examples */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
              {isAr ? '4. أمثلة توضيحية لترسيخ الفهم:' : '4. Illustrative Examples:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.illustrativeExamples.map((eg, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1 text-xs sm:text-sm">
                  <div className="font-semibold text-indigo-300 font-latin" dir="ltr">
                    {eg.english}
                  </div>
                  <div className="text-emerald-400">
                    {eg.arabic}
                  </div>
                  <div className="text-[11px] text-slate-400 italic pt-1">
                    💡 {eg.noteAr}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Interactive Mini Quiz to Verify Comprehension */}
          <div className="bg-gradient-to-br from-indigo-950/30 to-slate-950 border border-indigo-500/30 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 text-xs sm:text-sm font-bold">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>{isAr ? '5. اختبار قصير للتحقق من الفهم الفوري (Quiz):' : '5. Interactive Mini Quiz:'}</span>
              </div>
              {quizSubmitted && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedQuizAnswer(null);
                    setQuizSubmitted(false);
                  }}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  {isAr ? 'إعادة المحاولة' : 'Retry'}
                </button>
              )}
            </div>

            <p className="text-sm font-semibold text-white font-latin" dir="ltr">
              {result.miniQuiz.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.miniQuiz.options.map((option, oIdx) => {
                const isSelected = selectedQuizAnswer === oIdx;
                const isCorrect = oIdx === result.miniQuiz.correctAnswerIndex;

                let optClass = 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800';
                if (quizSubmitted) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-red-950/80 border-red-500 text-red-300';
                  }
                } else if (isSelected) {
                  optClass = 'bg-indigo-900 border-indigo-500 text-white';
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    disabled={quizSubmitted}
                    onClick={() => {
                      setSelectedQuizAnswer(oIdx);
                      setQuizSubmitted(true);
                    }}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-mono text-left transition-all flex items-center justify-between ${optClass}`}
                    dir="ltr"
                  >
                    <span>{option}</span>
                    {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-indigo-300">
                  {selectedQuizAnswer === result.miniQuiz.correctAnswerIndex
                    ? (isAr ? '✓ إجابة ممتازة وصحيحة! ' : '✓ Excellent, that is correct! ')
                    : (isAr ? '✗ إجابة غير دقيقة. ' : '✗ Incorrect answer. ')}
                </span>
                {result.miniQuiz.explanationAr}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

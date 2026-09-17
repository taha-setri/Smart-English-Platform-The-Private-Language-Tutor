import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Play, 
  Square, 
  Pause, 
  Sparkles, 
  GraduationCap, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Headphones,
  BookOpen,
  PenTool,
  RotateCcw,
  Send,
  Loader2,
  HelpCircle,
  Globe2,
  CheckCircle2,
  Sliders,
  Settings,
  Check
} from 'lucide-react';
import { Language, StudentLevel } from '../types';
import { maleTutorVoice, SpeechState, MaleVoiceOption } from '../utils/speech';
import { GRAMMAR_LESSONS } from '../data/learningData';
import { getClientTutorExplanation, getAllCuratedTopics } from '../utils/tutorKnowledge';

interface TalkingManTutorProps {
  currentLang: Language;
  selectedLevel: StudentLevel;
  activeTab: 'grammar' | 'vocab' | 'coach';
}

export const TalkingManTutor: React.FC<TalkingManTutorProps> = ({
  currentLang,
  selectedLevel,
  activeTab
}) => {
  const isAr = currentLang === 'ar';
  const [speechState, setSpeechState] = useState<SpeechState>(maleTutorVoice.getState());
  const [rate, setRate] = useState<number>(1.0);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<'ar' | 'en'>('ar');
  const [showVoiceSettings, setShowVoiceSettings] = useState<boolean>(false);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<{ ar: MaleVoiceOption[]; en: MaleVoiceOption[] }>({ ar: [], en: [] });
  const [selectedVoiceArURI, setSelectedVoiceArURI] = useState<string>(maleTutorVoice.getPreferredVoice('ar') || '');
  const [latestExplanation, setLatestExplanation] = useState<{
    topic: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = maleTutorVoice.subscribe((newState) => {
      setSpeechState(newState);
    });

    const updateVoices = () => {
      const v = maleTutorVoice.getAvailableMaleVoices();
      setAvailableVoices(v);
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', updateVoices);
    }

    return () => {
      unsubscribe();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
      }
    };
  }, []);

  // Pre-configured curated spoken scripts for the male tutor
  const speechScripts = {
    welcome: {
      titleAr: 'ترحيب وتوجيه المعلم باللغة العربية',
      titleEn: 'Tutor Orientation & Welcome',
      arabic: 'مرحباً بك يا بني في منصة الإنجليزية الذكية. أنا معلمك الخصوصي الأستاذ طه، وسأشرح لك باللغة العربية كل القواعد المعقدة وأصول النطق السليم. اختر أي قاعدة، وسأقوم بشرحها لك بصوتي خطوة بخطوة.',
      english: 'Welcome to the Smart English Platform. I am your private language tutor. I will guide you through English grammar, active vocabulary, and smart writing correction with clear explanations.'
    },
    grammarAdvice: {
      titleAr: 'شرح وتوجيه المعلم لإتقان القواعد بالعربية',
      titleEn: 'Mastering English Grammar',
      arabic: 'نصيحتي الذهبية لك في قواعد الإنجليزية: لا تحفظ القواعد كمعادلات جافة، بل افهم المعنى والزمن. في الإنجليزية نبدأ دائماً بالفاعل ثم الفعل، وانتبه للكلمات الدالة مثل yesterday للماضي و tomorrow للمستقبل.',
      english: 'My top advice for grammar is to focus on time markers and context rather than dry memorization. Always connect the tense with the timeline of the action.'
    },
    coachAdvice: {
      titleAr: 'شرح المعلم لصياغة الجمل وتجنب الأخطاء بالعربية',
      titleEn: 'Sentence Writing Coach Tips',
      arabic: 'عند صياغة الجمل بالإنجليزية، تجنب الترجمة الحرفية من العربية. تذكر دائماً: فاعل ثم فعل ثم مفعول به. لا تضع فعل الكينونة مع الفعل الأساسي بدون داعٍ، مثل قولك I am play، بل قل I play مباشرة.',
      english: 'When crafting sentences, maintain the Subject-Verb-Object formula. Avoid redundant auxiliary verbs and check your subject-verb agreement.'
    },
    vocabAdvice: {
      titleAr: 'شرح المعلم لطريقة حفظ الكلمات وتثبيتها بالعربية',
      titleEn: 'Vocabulary Context Mastery',
      arabic: 'لا تحفظ الكلمات بالإنجليزية منفردة أبداً يا بني. احفظ كل كلمة جديدة داخل جملة مفيدة، واستمع لنطقها بصوتي وكررها بصوت مسموع لترسيخها في الذاكرة السمعية.',
      english: 'Never memorize isolated words. Learn words through collocations, full sentences, and active pronunciation practice.'
    }
  };

  // Frequently asked English grammar questions in Arabic
  const commonQuestions = [
    { label: 'متى نستخدم do و does؟', query: 'متى نستخدم do و does في الأسئلة والنفي بالإنجليزية؟' },
    { label: 'الفرق بين Past Simple و Present Perfect', query: 'ما هو الفرق الدقيق بين زمن الماضي البسيط والمضارع التام مع أمثلة؟' },
    { label: 'أفعال الكينونة (Verb to be)', query: 'اشرح لي أفعال الكينونة am is are ومتى نستخدمها في الجملة؟' },
    { label: 'ترتيب الجملة الإنجليزية الأساسي', query: 'كيف أرتب عناصر الجملة الإنجليزية وما الفرق بينها وبين الجملة العربية؟' }
  ];

  const handleMakeManSpeak = (topicKey: keyof typeof speechScripts, preferredLang: 'ar' | 'en' = 'ar') => {
    const item = speechScripts[topicKey];
    const textToSpeak = preferredLang === 'ar' ? item.arabic : item.english;

    maleTutorVoice.speak({
      text: textToSpeak,
      lang: preferredLang,
      rate: rate,
      pitch: 0.78, // Deep male baritone frequency
      title: isAr ? item.titleAr : item.titleEn
    });
  };

  const handleSpeakCurrentLessonArabic = () => {
    const lesson = GRAMMAR_LESSONS.find(l => l.level === selectedLevel) || GRAMMAR_LESSONS[0];
    if (!lesson) return;

    maleTutorVoice.speak({
      text: lesson.audioExplanationAr,
      lang: 'ar',
      rate: rate,
      pitch: 0.78, // Deep male baritone frequency
      title: isAr ? `شرح المعلم بالعربية: ${lesson.titleAr}` : `Tutor Explanation: ${lesson.titleEn}`
    });
  };

  /**
   * 100% Free, Zero API-Key Arabic Pedagogical Explanation & Speech
   * Works offline & on Vercel without any backend or API key!
   */
  const handleAskTutorToExplain = (queryText: string) => {
    const cleanQuery = queryText.trim();
    if (!cleanQuery) return;

    setIsLoadingExplanation(true);
    maleTutorVoice.stop();

    // Instant client-side pedagogical engine
    const result = getClientTutorExplanation(cleanQuery);

    setLatestExplanation({
      topic: result.topic,
      text: result.explanation
    });

    // Speak aloud with the male voice immediately
    maleTutorVoice.speak({
      text: result.spokenText || result.explanation,
      lang: 'ar',
      rate: rate,
      pitch: 0.78, // Masculine baritone pitch
      title: `شرح الأستاذ طه (صوت رجل): ${result.topic}`
    });

    setIsLoadingExplanation(false);
    setCustomQuestion('');
  };

  const handleTestVoice = (lang: 'ar' | 'en' = 'ar') => {
    const sampleText = lang === 'ar' 
      ? 'أهلاً بك يا بني. أنا معلمك الأستاذ طه، وهذا صوت رجل عربي فصيح ووقور، بدون أي صوت نسائي، مجاني مائة بالمائة.'
      : 'Hello there. I am your academic tutor speaking with a distinct masculine voice.';
    
    maleTutorVoice.speak({
      text: sampleText,
      lang: lang,
      rate: rate,
      pitch: 0.8,
      title: isAr ? 'تجربة صوت المعلم (صوت رجل وقور 100%)' : 'Testing Male Tutor Voice'
    });
  };

  const handleSelectArVoice = (voiceURI: string) => {
    setSelectedVoiceArURI(voiceURI);
    maleTutorVoice.setPreferredVoice('ar', voiceURI);
    handleTestVoice('ar');
  };

  const handlePauseResume = () => {
    if (speechState.isPaused) {
      maleTutorVoice.resume();
    } else {
      maleTutorVoice.pause();
    }
  };

  const handleStop = () => {
    maleTutorVoice.stop();
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (speechState.isSpeaking) {
      maleTutorVoice.speak({
        text: speechState.currentText,
        lang: speechState.currentLang,
        rate: newRate,
        pitch: 0.82,
        title: speechState.title
      });
    }
  };

  // Dynamic mouth viseme SVG parameters calculated from real-time lip-sync mouthOpenness
  const mouthHeight = Math.max(3, Math.min(18, 4 + speechState.mouthOpenness * 14));
  const mouthWidth = Math.max(16, Math.min(26, 20 + speechState.mouthOpenness * 6));
  const mouthCornerCurve = speechState.mouthOpenness > 0.3 ? 8 : 4;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-indigo-950/50 relative overflow-hidden transition-all duration-300">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Header Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          {/* Animated active state light */}
          <div className="relative">
            <div className={`w-3.5 h-3.5 rounded-full ${speechState.isSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-indigo-400'}`} />
            <div className={`w-3.5 h-3.5 rounded-full absolute top-0 left-0 ${speechState.isSpeaking ? 'bg-emerald-400' : 'bg-indigo-400'}`} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                <span>{isAr ? 'الأستاذ طه (المعلم الصوتي الذكي - يتكلم ويشرح بالعربية)' : 'Private Language Tutor (Speaks & Explains in Arabic)'}</span>
              </h2>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                speechState.isSpeaking
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/30 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {speechState.isSpeaking
                  ? (isAr ? 'يتكلم ويشرح الآن 🔊' : 'Speaking & Explaining Now 🔊')
                  : (isAr ? 'جاهز للشرح بالعربية 🇸🇦' : 'Ready to Explain in Arabic 🇸🇦')}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              {isAr
                ? 'معلم أكاديمي خبير بصوت رجالي وقور، يشرح لك قواعد الإنجليزية باللغة العربية الفصحى المبسطة وينطق الأمثلة بطلاقة.'
                : 'Academic male tutor voice delivering clear Arabic pedagogical explanations and fluent English pronunciation.'}
            </p>
          </div>
        </div>

        {/* Toggle Minimize/Expand */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 shrink-0 cursor-pointer"
          title={isExpanded ? 'تصغير' : 'توسيع'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="pt-5 space-y-6">
          
          {/* Main Visual Stage: The Talking Character + Dynamic Speech Bubble */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            
            {/* 1. THE TALKING MAN AVATAR (Interactive Vector Portrait with Lip-Sync) */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative group">
                
                {/* Soundwave glowing aura around head when speaking */}
                {speechState.isSpeaking && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-indigo-500/30 rounded-full blur-md animate-pulse" />
                )}

                {/* Male Tutor SVG Portrait */}
                <div className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-slate-800 via-indigo-950 to-slate-900 border-4 ${
                  speechState.isSpeaking ? 'border-emerald-400 shadow-xl shadow-emerald-500/25' : 'border-indigo-500/50'
                } p-2 flex items-center justify-center overflow-hidden transition-all duration-300`}>
                  
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background academic aura */}
                    <circle cx="60" cy="60" r="54" fill="#0f172a" />
                    
                    {/* Suit collar / shoulders */}
                    <path
                      d="M20 115 C20 90, 40 85, 60 85 C80 85, 100 90, 100 115 Z"
                      fill="#1e293b"
                    />
                    {/* Blue tie / shirt collar */}
                    <path d="M52 85 L60 98 L68 85 Z" fill="#3b82f6" />
                    <path d="M57 98 L60 118 L63 98 Z" fill="#2563eb" />
                    <path d="M48 85 L54 100 L60 85 Z" fill="#e2e8f0" />
                    <path d="M72 85 L66 100 L60 85 Z" fill="#e2e8f0" />

                    {/* Male neck */}
                    <rect x="52" y="70" width="16" height="18" rx="4" fill="#fbcfe8" />

                    {/* Head / Face */}
                    <ellipse cx="60" cy="52" rx="26" ry="30" fill="#fde047" fillOpacity="0.85" />
                    <path
                      d="M36 48 C36 72, 44 80, 60 80 C76 80, 84 72, 84 48 Z"
                      fill="#fef08a"
                      fillOpacity="0.5"
                    />

                    {/* Haircut */}
                    <path
                      d="M34 45 C32 30, 42 20, 60 20 C78 20, 88 30, 86 45 C82 32, 70 26, 60 26 C50 26, 38 32, 34 45 Z"
                      fill="#1e1b4b"
                    />
                    {/* Sideburns */}
                    <path d="M34 42 L34 56 L38 52 Z" fill="#1e1b4b" />
                    <path d="M86 42 L86 56 L82 52 Z" fill="#1e1b4b" />

                    {/* Ears */}
                    <ellipse cx="34" cy="54" rx="4" ry="7" fill="#fde047" />
                    <ellipse cx="86" cy="54" rx="4" ry="7" fill="#fde047" />

                    {/* Glasses */}
                    <rect x="42" y="44" width="14" height="11" rx="3" stroke="#475569" strokeWidth="2.5" fill="#ffffff" fillOpacity="0.2" />
                    <rect x="64" y="44" width="14" height="11" rx="3" stroke="#475569" strokeWidth="2.5" fill="#ffffff" fillOpacity="0.2" />
                    <path d="M56 48 L64 48" stroke="#475569" strokeWidth="2.5" />
                    <path d="M36 47 L42 47" stroke="#475569" strokeWidth="2" />
                    <path d="M78 47 L84 47" stroke="#475569" strokeWidth="2" />

                    {/* Eyes */}
                    <circle cx="49" cy="49" r="2.5" fill="#0f172a" />
                    <circle cx="71" cy="49" r="2.5" fill="#0f172a" />
                    <circle cx="50" cy="48" r="0.8" fill="#ffffff" />
                    <circle cx="72" cy="48" r="0.8" fill="#ffffff" />

                    {/* Eyebrows */}
                    <path d="M42 40 Q49 37 56 41" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M64 41 Q71 37 78 40" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    {/* Nose */}
                    <path d="M60 48 L58 58 L62 59" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" fill="none" />

                    {/* DYNAMIC REAL-TIME TALKING MOUTH (Lip-Sync during speech) */}
                    {speechState.isSpeaking ? (
                      <g>
                        <rect
                          x={60 - mouthWidth / 2}
                          y={66 - mouthHeight / 4}
                          width={mouthWidth}
                          height={mouthHeight}
                          rx={mouthCornerCurve}
                          fill="#881337"
                          stroke="#9f1239"
                          strokeWidth="1.5"
                        />
                        <rect
                          x={60 - mouthWidth / 2 + 2}
                          y={66 - mouthHeight / 4 + 1}
                          width={mouthWidth - 4}
                          height={Math.min(3, mouthHeight / 2)}
                          rx="1"
                          fill="#ffffff"
                        />
                        {mouthHeight > 8 && (
                          <ellipse
                            cx="60"
                            cy={66 + mouthHeight / 3}
                            rx={mouthWidth / 3}
                            ry={mouthHeight / 4}
                            fill="#f43f5e"
                          />
                        )}
                      </g>
                    ) : (
                      <path
                        d="M50 67 Q60 74 70 67"
                        stroke="#9f1239"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                    )}

                    {/* Tutor goatee line */}
                    <path
                      d="M54 74 Q60 77 66 74"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="2 2"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Animated Audio Equalizer Bars when talking */}
                {speechState.isSpeaking && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-1 bg-slate-900/95 px-3 py-1 rounded-full border border-emerald-500/60 shadow-md">
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-3" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_300ms] h-5" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_200ms] h-4" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_400ms] h-6" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_150ms] h-3" />
                  </div>
                )}
              </div>

              <div className="mt-3">
                <span className="font-extrabold text-sm text-white">الأستاذ طه (Tutor Taha)</span>
                <p className="text-[11px] text-emerald-400 font-semibold">يشرح القواعد باللغة العربية الفصحى</p>
              </div>

              {/* Primary Instant Action Button: Speak In Arabic */}
              <div className="mt-3 w-full space-y-2">
                {!speechState.isSpeaking ? (
                  <button
                    type="button"
                    onClick={() => handleMakeManSpeak('welcome', 'ar')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer border border-emerald-400/40"
                  >
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span>{isAr ? '🗣️ اجعل المعلم يشرح ويتكلم بالعربية' : '🗣️ Make Him Speak in Arabic'}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePauseResume}
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                    >
                      {speechState.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      <span>{speechState.isPaused ? (isAr ? 'متابعة' : 'Resume') : (isAr ? 'إيقاف مؤقت' : 'Pause')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleStop}
                      className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-semibold border border-red-800/60 transition-colors cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>{isAr ? 'إيقاف' : 'Stop'}</span>
                    </button>
                  </div>
                )}

                {/* Switch Spoken Language Button */}
                <div className="flex items-center justify-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMode('ar');
                      handleMakeManSpeak('welcome', 'ar');
                    }}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all cursor-pointer ${
                      activeMode === 'ar'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇸🇦 عربي كامل
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMode('en');
                      handleMakeManSpeak('welcome', 'en');
                    }}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all cursor-pointer ${
                      activeMode === 'en'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>
            </div>

            {/* 2. SPEECH BUBBLE & SUBTITLES IN ARABIC */}
            <div className="md:col-span-8 space-y-4">
              
              {/* Dynamic Speech Bubble */}
              <div className="relative bg-slate-950/95 border-2 border-indigo-500/40 rounded-2xl p-4 sm:p-5 shadow-inner">
                {/* Speech Bubble Arrow pointing left towards avatar */}
                <div className="hidden md:block absolute -right-3 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-indigo-500/40" />

                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-extrabold text-emerald-300">
                      {speechState.title || (isAr ? 'شرح وكلام الأستاذ طه (باللغة العربية):' : 'Teacher Arabic Spoken Explanation:')}
                    </span>
                  </div>

                  {/* Audio Speed Rate Selector */}
                  <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px]">
                    <span className="text-slate-500 px-1 text-[10px]">السرعة:</span>
                    {[0.75, 1.0, 1.25, 1.5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleRateChange(s)}
                        className={`px-1.5 py-0.5 rounded font-mono transition-colors cursor-pointer ${
                          rate === s
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title={`سرعة الصوت: ${s}x`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtitle / Spoken Text Display with Live Word Flow */}
                <div className="min-h-[85px] flex flex-col justify-center">
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-semibold">
                    {speechState.currentText ? (
                      <span className={speechState.isSpeaking ? 'text-emerald-300 transition-colors' : 'text-slate-200'}>
                        "{speechState.currentText}"
                      </span>
                    ) : (
                      <span className="text-slate-400 italic font-normal">
                        {isAr
                          ? 'مرحباً بك! انقر على أي زر بالأسفل أو اختر سؤالاً ليقوم المعلم بشرحه والتحدث به باللغة العربية فوراً.'
                          : 'Welcome! Click any explanation below to hear the tutor speak and explain in Arabic.'}
                      </span>
                    )}
                  </p>

                  {/* Multi-sentence progress indicator when explaining long rules */}
                  {speechState.totalSentences && speechState.totalSentences > 1 && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-400 h-full transition-all duration-300"
                          style={{ width: `${speechState.progressPercent || 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        جملة {speechState.currentSentenceIndex} من {speechState.totalSentences}
                      </span>
                    </div>
                  )}
                </div>

                {/* Voice Timbre Badge & Vercel Free Badge */}
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                      <Headphones className="w-3.5 h-3.5" />
                      <span>صوت رجل فصيح ووقور 100% (أصوات رجالية حصرية)</span>
                    </span>
                    <span className="text-[10px] text-sky-400 bg-sky-950/50 px-2 py-1 rounded-lg border border-sky-800/40 font-mono hidden sm:inline-block">
                      ✓ مجاني وبدون API
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTestVoice('ar')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold shadow-sm shadow-emerald-900/30"
                      title="استمع لعينة من صوت المعلم الرجالي"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>تجربة صوت المعلم (صوت رجل)</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                      className={`px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 border text-[10px] font-medium ${
                        showVoiceSettings
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                      title="اختيار صوت المعلم الرجالي"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>اختيار المعلم</span>
                    </button>
                  </div>
                </div>

                {/* Optional Device Voice Selector Drawer */}
                {showVoiceSettings && (
                  <div className="mt-3 p-3 bg-slate-950/90 rounded-xl border border-indigo-500/30 text-xs space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between text-slate-200 font-bold border-b border-slate-850 pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5 text-indigo-400" />
                        <span>أصوات الجهاز المكتشفة (صوت رجل / Speech Synthesis):</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                        بدون مفاتيح API • مجاني تماماً
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal">
                      يتم توليد صوت المعلم كصوت رجل عربي أصيل فائق النقاء (Hamed Neural) مجاناً 100% وبدون أي مفاتيح API، مع إمكانية التبديل بين أصوات المعلمين العرب أو أصوات نظام المتصفح:
                    </p>

                    {availableVoices.ar.length > 0 && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-300 block">اختر صوت المعلم المفضل:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                          {availableVoices.ar.map((v) => (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => handleSelectArVoice(v.id)}
                              className={`p-2 rounded-lg text-right border transition-all flex items-center justify-between cursor-pointer ${
                                selectedVoiceArURI === v.id || (!selectedVoiceArURI && v.id === 'ar-SA-HamedNeural')
                                  ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 font-bold shadow-sm shadow-emerald-900/40'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                              }`}
                            >
                              <span className="truncate text-[11px]">{v.displayName}</span>
                              {(selectedVoiceArURI === v.id || (!selectedVoiceArURI && v.id === 'ar-SA-HamedNeural')) && (
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mr-1" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 3. INTERACTIVE "ASK THE TUTOR TO EXPLAIN IN ARABIC" BAR */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>اسأل المعلم واجعله يشرح لك أي قاعدة باللغة العربية:</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40 font-mono">
                    ⚡ شرح فوري مجاني 100%
                  </span>
                </div>

                {/* Custom Input Field */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (customQuestion.trim() && !isLoadingExplanation) {
                      handleAskTutorToExplain(customQuestion);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="اكتب أي سؤال أو قاعدة (مثال: اشرح لي الفرق بين much و many)..."
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!customQuestion.trim() || isLoadingExplanation}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLoadingExplanation ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{isLoadingExplanation ? 'جاري التحضير...' : 'اشرح لي بصوتك'}</span>
                  </button>
                </form>

                {/* Quick Common Arabic Questions Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    أسئلة شائعة جاهزة للشرح الصوتي الفوري:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {getAllCuratedTopics().map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAskTutorToExplain(q.query)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-indigo-950 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-1 cursor-pointer"
                        title={q.category}
                      >
                        <HelpCircle className="w-3 h-3 text-emerald-500/70" />
                        <span>{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. PRE-SET AUDIO LESSON TRIGGERS (IN ARABIC) */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>أو استمع لشروحات المعلم الجاهزة باللغة العربية:</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Topic 1: Explain Active Grammar Lesson in Arabic */}
                  <button
                    type="button"
                    onClick={handleSpeakCurrentLessonArabic}
                    className="p-3 rounded-xl bg-slate-900/90 hover:bg-indigo-950/70 border border-slate-800 hover:border-emerald-500/50 text-right transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-emerald-300">
                          شرح درس القواعد الحالي بالعربية
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          شرح وافٍ لقواعد هذا المستوى وأمثلتها
                        </div>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </button>

                  {/* Topic 2: Sentence Coach Advice in Arabic */}
                  <button
                    type="button"
                    onClick={() => handleMakeManSpeak('coachAdvice', 'ar')}
                    className="p-3 rounded-xl bg-slate-900/90 hover:bg-indigo-950/70 border border-slate-800 hover:border-cyan-500/50 text-right transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                        <PenTool className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-cyan-300">
                          نصيحة صياغة وتصحيح الجمل بالعربية
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          تجنب أخطاء الترجمة الحرفية من العربية
                        </div>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  </button>

                  {/* Topic 3: Vocabulary Retention Technique in Arabic */}
                  <button
                    type="button"
                    onClick={() => handleMakeManSpeak('vocabAdvice', 'ar')}
                    className="p-3 rounded-xl bg-slate-900/90 hover:bg-indigo-950/70 border border-slate-800 hover:border-indigo-500/50 text-right transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-indigo-300">
                          طريقة تثبيت ونطق المفردات بالعربية
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          حفظ الكلمات في جمل وسياقات كاملة
                        </div>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  </button>

                  {/* Topic 4: Golden Grammar Rules in Arabic */}
                  <button
                    type="button"
                    onClick={() => handleMakeManSpeak('grammarAdvice', 'ar')}
                    className="p-3 rounded-xl bg-slate-900/90 hover:bg-indigo-950/70 border border-slate-800 hover:border-amber-500/50 text-right transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-amber-300">
                          النصيحة الذهبية للقواعد بالعربية
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          ربط الأفعال بالدلالات الزمنية والسياق
                        </div>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                  </button>

                </div>
              </div>

              {/* Display Written Arabic Explanation Card if available */}
              {latestExplanation && (
                <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>الشرح المكتوب: {latestExplanation.topic}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        maleTutorVoice.speak({
                          text: latestExplanation.text,
                          lang: 'ar',
                          rate: rate,
                          pitch: 0.82,
                          title: `إعادة شرح: ${latestExplanation.topic}`
                        });
                      }}
                      className="text-[11px] flex items-center gap-1 text-slate-300 hover:text-emerald-300 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة الاستماع</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-normal bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    {latestExplanation.text}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

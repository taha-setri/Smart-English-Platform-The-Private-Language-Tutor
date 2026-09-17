import React, { useState, useEffect } from 'react';
import { Volume2, Play, Square, Pause, UserCheck, Headphones } from 'lucide-react';
import { maleTutorVoice, SpeechState } from '../utils/speech';

interface AudioPlayerControlProps {
  arabicText?: string;
  englishText?: string;
  defaultLang?: 'ar' | 'en';
  title?: string;
  uiLang?: 'ar' | 'en';
}

export const AudioPlayerControl: React.FC<AudioPlayerControlProps> = ({
  arabicText,
  englishText,
  defaultLang = 'ar',
  title,
  uiLang = 'ar'
}) => {
  const [speechState, setSpeechState] = useState<SpeechState>(maleTutorVoice.getState());
  const [rate, setRate] = useState<number>(1.0);
  const [selectedLang, setSelectedLang] = useState<'ar' | 'en'>(
    arabicText && defaultLang === 'ar' ? 'ar' : englishText ? 'en' : 'ar'
  );

  useEffect(() => {
    const unsub = maleTutorVoice.subscribe((s) => {
      setSpeechState(s);
    });
    return () => {
      unsub();
    };
  }, []);

  const textToSpeak = selectedLang === 'ar' ? (arabicText || englishText) : (englishText || arabicText);
  const isThisActive = speechState.isSpeaking && speechState.currentText === textToSpeak?.trim();

  const handlePlay = () => {
    if (!textToSpeak) return;

    maleTutorVoice.speak({
      text: textToSpeak,
      lang: selectedLang,
      rate: rate,
      pitch: 0.78, // Deep masculine baritone tutor tone
      title: title || (uiLang === 'ar' ? 'المعلم الصوتي (صوت رجل)' : 'Male Tutor Voice')
    });
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
    if (isThisActive) {
      maleTutorVoice.speak({
        text: textToSpeak || '',
        lang: selectedLang,
        rate: newRate,
        pitch: 0.78,
        title: title
      });
    }
  };

  // Dynamic mouth height based on lip-sync mouthOpenness
  const mouthHeight = isThisActive ? Math.max(2, Math.min(8, 2 + speechState.mouthOpenness * 6)) : 2;

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-3 sm:p-4 my-2.5 backdrop-blur-md shadow-lg shadow-black/20 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Animated Talking Tutor Face & Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Animated Male Head Avatar */}
            <div className={`w-11 h-11 rounded-full bg-gradient-to-b from-slate-800 to-slate-950 border-2 ${
              isThisActive ? 'border-emerald-400 shadow-md shadow-emerald-500/30' : 'border-indigo-500/50'
            } p-0.5 flex items-center justify-center overflow-hidden transition-all shrink-0`}>
              <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
                {/* Background */}
                <circle cx="30" cy="30" r="28" fill="#0f172a" />
                {/* Shoulders */}
                <path d="M12 58 C12 44, 20 42, 30 42 C40 42, 48 44, 48 58 Z" fill="#1e293b" />
                <path d="M26 42 L30 50 L34 42 Z" fill="#3b82f6" />
                {/* Neck & Face */}
                <rect x="26" y="34" width="8" height="10" fill="#fde047" rx="2" />
                <circle cx="30" cy="26" r="14" fill="#fde047" />
                {/* Hair */}
                <path d="M16 22 C15 13, 21 8, 30 8 C39 8, 45 13, 44 22 C42 14, 35 11, 30 11 C25 11, 18 14, 16 22 Z" fill="#1e1b4b" />
                {/* Glasses */}
                <rect x="20" y="22" width="8" height="6" rx="1.5" stroke="#334155" strokeWidth="1.5" fill="#ffffff" fillOpacity="0.2" />
                <rect x="32" y="22" width="8" height="6" rx="1.5" stroke="#334155" strokeWidth="1.5" fill="#ffffff" fillOpacity="0.2" />
                <path d="M28 25 L32 25" stroke="#334155" strokeWidth="1.5" />
                {/* Eyes */}
                <circle cx="24" cy="25" r="1.2" fill="#0f172a" />
                <circle cx="36" cy="25" r="1.2" fill="#0f172a" />
                {/* Dynamic Lip-Sync Mouth */}
                {isThisActive ? (
                  <rect
                    x="25"
                    y={32 - mouthHeight / 2}
                    width="10"
                    height={mouthHeight}
                    rx={mouthHeight > 4 ? 3 : 1}
                    fill="#9f1239"
                  />
                ) : (
                  <path d="M25 33 Q30 36 35 33" stroke="#9f1239" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                )}
              </svg>
            </div>

            {/* Speaking active dot */}
            {isThisActive && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>{uiLang === 'ar' ? 'المعلم الصوتي (صوت رجل)' : 'Male Voice Tutor'}</span>
              </span>
              {isThisActive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {uiLang === 'ar' ? 'يشرح الآن' : 'Speaking'}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 truncate max-w-[200px] sm:max-w-xs font-medium">
              {title || (uiLang === 'ar' ? 'استمع لشرح المعلم الصوتي' : 'Listen to male tutor')}
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language audio switch (if both are provided) */}
          {arabicText && englishText && (
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedLang('ar');
                  if (isThisActive) maleTutorVoice.stop();
                }}
                className={`px-2 py-1 rounded transition-colors ${
                  selectedLang === 'ar'
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                عربي
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLang('en');
                  if (isThisActive) maleTutorVoice.stop();
                }}
                className={`px-2 py-1 rounded transition-colors ${
                  selectedLang === 'en'
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                English
              </button>
            </div>
          )}

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60 text-xs">
            {[0.75, 1.0, 1.25, 1.5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleRateChange(s)}
                className={`px-1.5 py-1 rounded font-mono text-[11px] transition-colors ${
                  rate === s
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`${uiLang === 'ar' ? 'سرعة الصوت' : 'Playback speed'}: ${s}x`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          {!isThisActive ? (
            <button
              type="button"
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{uiLang === 'ar' ? 'استمع للمعلم (رجل)' : 'Play Tutor Audio'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePauseResume}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors"
                title={speechState.isPaused ? (uiLang === 'ar' ? 'متابعة' : 'Resume') : (uiLang === 'ar' ? 'إيقاف مؤقت' : 'Pause')}
              >
                {speechState.isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleStop}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-950/70 hover:bg-red-900/80 text-red-300 text-xs font-medium rounded-lg border border-red-800/40 transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{uiLang === 'ar' ? 'إيقاف' : 'Stop'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subtitle / text excerpt when this controller is active */}
      {isThisActive && (
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/30 p-2 rounded-lg">
          <Headphones className="w-3.5 h-3.5 shrink-0 text-emerald-400 animate-pulse" />
          <p className="line-clamp-2 leading-relaxed">
            "{textToSpeak}"
          </p>
        </div>
      )}
    </div>
  );
};


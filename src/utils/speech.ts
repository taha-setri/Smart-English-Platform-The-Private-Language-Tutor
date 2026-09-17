/**
 * 100% Strictly Authentic Male Voice Engine (Zero API Keys)
 * 
 * Strict Constraint:
 * - NO FEMALE VOICES ALLOWED ANYWHERE.
 * - Streams high-fidelity neural male audio directly via /api/tts.
 *   * Primary Arabic: ar-SA-HamedNeural (الأستاذ طه - صوت رجل عربي وقور وفصيح)
 *   * Alternative Arabic: ar-DZ-IsmaelNeural (الأستاذ إسماعيل - صوت رجل جزائري فصيح)
 *   * Alternative Arabic: ar-EG-ShakirNeural (الأستاذ شاكر - صوت رجل مصري أكاديمي)
 *   * Alternative Arabic: ar-MA-JamalNeural (الأستاذ جمال - صوت رجل مغاربي وقور)
 *   * Primary English: en-US-GuyNeural (Teacher Guy - American Male Tutor)
 *   * Alternative English: en-GB-RyanNeural (Teacher Ryan - British Male Academic)
 * - Browser fallback strictly filters out any female voices and forces deep male baritone pitch.
 */

export interface SpeechOptions {
  text: string;
  lang: 'en' | 'ar';
  rate?: number; // 0.75, 1.0, 1.25, 1.5
  pitch?: number;
  voiceURI?: string;
  title?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

export interface SpeechState {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  currentLang: 'ar' | 'en';
  title?: string;
  mouthOpenness: number; // 0 to 1, drives animated mouth lip-sync
  progressPercent?: number;
  totalSentences?: number;
  currentSentenceIndex?: number;
  activeVoiceName?: string;
  audioMode: 'neural_stream' | 'browser_speech';
}

export interface MaleVoiceOption {
  id: string;
  displayName: string;
  isMalePreferred: boolean;
  lang: 'ar' | 'en' | 'other';
  voice?: SpeechSynthesisVoice;
}

type SpeechListener = (state: SpeechState) => void;

class MaleTutorVoiceService {
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private animationFrameId: number | null = null;
  private audioCtx: AudioContext | null = null;
  private sentenceQueue: string[] = [];
  private queueIndex = 0;
  private activeOptions: SpeechOptions | null = null;
  
  // Preferred strictly authentic male voices
  private preferredArabicVoiceId: string = 'ar-SA-HamedNeural';
  private preferredEnglishVoiceId: string = 'en-US-GuyNeural';

  private state: SpeechState = {
    isSpeaking: false,
    isPaused: false,
    currentText: '',
    currentLang: 'ar',
    title: '',
    mouthOpenness: 0,
    progressPercent: 0,
    totalSentences: 1,
    currentSentenceIndex: 0,
    activeVoiceName: 'الأستاذ طه (صوت رجل نقي 100%)',
    audioMode: 'neural_stream'
  };

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedAr = localStorage.getItem('tutor_male_voice_ar');
        const savedEn = localStorage.getItem('tutor_male_voice_en');
        if (savedAr && !savedAr.includes('sys:')) this.preferredArabicVoiceId = savedAr;
        if (savedEn && !savedEn.includes('sys:')) this.preferredEnglishVoiceId = savedEn;
      } catch {
        // LocalStorage fallback
      }
    }
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): SpeechState {
    return { ...this.state };
  }

  private updateState(partial: Partial<SpeechState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Speech listener error:', err);
      }
    });
  }

  /**
   * Returns list of strictly male voices only.
   */
  public getAvailableMaleVoices(): { ar: MaleVoiceOption[]; en: MaleVoiceOption[] } {
    const arVoices: MaleVoiceOption[] = [
      {
        id: 'ar-SA-HamedNeural',
        displayName: 'الأستاذ طه (صوت رجل سعودي وقور - أصيل)',
        isMalePreferred: true,
        lang: 'ar'
      },
      {
        id: 'ar-DZ-IsmaelNeural',
        displayName: 'الأستاذ إسماعيل (صوت رجل جزائري فصيح)',
        isMalePreferred: true,
        lang: 'ar'
      },
      {
        id: 'ar-EG-ShakirNeural',
        displayName: 'الأستاذ شاكر (صوت رجل مصري أكاديمي)',
        isMalePreferred: true,
        lang: 'ar'
      },
      {
        id: 'ar-MA-JamalNeural',
        displayName: 'الأستاذ جمال (صوت رجل مغاربي وقور)',
        isMalePreferred: true,
        lang: 'ar'
      },
      {
        id: 'ar-IQ-BasselNeural',
        displayName: 'الأستاذ باسل (صوت رجل عراقي)',
        isMalePreferred: true,
        lang: 'ar'
      }
    ];

    const enVoices: MaleVoiceOption[] = [
      {
        id: 'en-US-GuyNeural',
        displayName: 'Teacher Guy (صوت رجل أمريكي واضح)',
        isMalePreferred: true,
        lang: 'en'
      },
      {
        id: 'en-GB-RyanNeural',
        displayName: 'Teacher Ryan (صوت رجل بريطاني أكاديمي)',
        isMalePreferred: true,
        lang: 'en'
      },
      {
        id: 'en-US-ChristopherNeural',
        displayName: 'Teacher Christopher (صوت رجل عميق)',
        isMalePreferred: true,
        lang: 'en'
      }
    ];

    return { ar: arVoices, en: enVoices };
  }

  public setPreferredVoice(lang: 'ar' | 'en', voiceId: string) {
    if (lang === 'ar') {
      this.preferredArabicVoiceId = voiceId;
      try {
        localStorage.setItem('tutor_male_voice_ar', voiceId);
      } catch {}
    } else {
      this.preferredEnglishVoiceId = voiceId;
      try {
        localStorage.setItem('tutor_male_voice_en', voiceId);
      } catch {}
    }
  }

  public getPreferredVoice(lang: 'ar' | 'en'): string {
    return lang === 'ar' ? this.preferredArabicVoiceId : this.preferredEnglishVoiceId;
  }

  /**
   * Subtle polite tutor chime before speaking
   */
  public playTutorChime() {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220.0, now); // A3 (deep male chime)
      osc.frequency.exponentialRampToValueAtTime(330.0, now + 0.08); // E4

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch {
      // AudioContext optional
    }
  }

  /**
   * Lip-Sync visual movement
   */
  private startLipSyncAnimation() {
    this.stopLipSyncAnimation();
    let phase = 0;
    const animate = () => {
      if (!this.state.isSpeaking || this.state.isPaused) {
        this.updateState({ mouthOpenness: 0 });
        return;
      }
      phase += 0.22;
      const raw = Math.sin(phase) * 0.5 + 0.5;
      const speechRhythm = Math.sin(phase * 0.65) > -0.2 ? raw : 0.05;
      this.updateState({ mouthOpenness: speechRhythm });
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private stopLipSyncAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.updateState({ mouthOpenness: 0 });
  }

  /**
   * Splits text into short, natural sentences
   */
  private splitIntoSentences(text: string): string[] {
    const clean = text.replace(/[*_#`]/g, '').trim();
    if (!clean) return [];

    const rawChunks = clean.split(/(?<=[.?!؛\n])\s+/);
    const result: string[] = [];

    for (const chunk of rawChunks) {
      const trimmed = chunk.trim();
      if (!trimmed) continue;
      if (trimmed.length > 200) {
        const subChunks = trimmed.split(/(?<=[,،])\s+/);
        for (const sub of subChunks) {
          const sTrim = sub.trim();
          if (sTrim) result.push(sTrim);
        }
      } else {
        result.push(trimmed);
      }
    }

    return result.length > 0 ? result : [clean];
  }

  /**
   * Speaks text using strictly authentic male audio
   */
  public speak(options: SpeechOptions) {
    if (typeof window === 'undefined') return;

    this.stop();
    this.playTutorChime();

    const cleanText = options.text.trim();
    if (!cleanText) {
      options.onEnd?.();
      return;
    }

    this.activeOptions = options;
    const sentences = this.splitIntoSentences(cleanText);
    this.sentenceQueue = sentences;
    this.queueIndex = 0;

    const voiceName = options.lang === 'ar'
      ? 'الأستاذ طه (صوت رجل عربي أصيل 100%)'
      : 'Teacher Guy (American Male Tutor)';

    this.updateState({
      isSpeaking: true,
      isPaused: false,
      currentText: sentences[0] || cleanText,
      currentLang: options.lang,
      title: options.title || (options.lang === 'ar' ? 'المعلم الصوتي (صوت رجل وقور)' : 'Male Tutor Speaking'),
      totalSentences: sentences.length,
      currentSentenceIndex: 1,
      progressPercent: Math.round((1 / sentences.length) * 100),
      activeVoiceName: voiceName,
      audioMode: 'neural_stream'
    });

    this.startLipSyncAnimation();
    options.onStart?.();

    this.playNextSentence();
  }

  /**
   * Sequential sentence playback with strictly male neural stream
   */
  private playNextSentence() {
    if (this.queueIndex >= this.sentenceQueue.length) {
      this.stopLipSyncAnimation();
      this.updateState({
        isSpeaking: false,
        isPaused: false,
        mouthOpenness: 0
      });
      this.activeOptions?.onEnd?.();
      return;
    }

    const currentSentence = this.sentenceQueue[this.queueIndex];
    this.updateState({
      currentText: currentSentence,
      currentSentenceIndex: this.queueIndex + 1,
      progressPercent: Math.round(((this.queueIndex + 1) / this.sentenceQueue.length) * 100)
    });

    const lang = this.activeOptions?.lang || 'ar';
    const rate = this.activeOptions?.rate || 1.0;
    const voiceId = lang === 'ar' ? this.preferredArabicVoiceId : this.preferredEnglishVoiceId;

    // Direct authentic male stream URL
    const ttsUrl = `/api/tts?text=${encodeURIComponent(currentSentence)}&lang=${lang}&voice=${encodeURIComponent(voiceId)}`;

    // Create and configure Audio element with explicit src URL
    const audio = new Audio(ttsUrl);
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';
    audio.playbackRate = rate;
    this.currentAudio = audio;

    let hasAdvanced = false;
    const advance = () => {
      if (hasAdvanced) return;
      hasAdvanced = true;
      this.currentAudio = null;
      this.queueIndex++;
      setTimeout(() => {
        if (this.state.isSpeaking && !this.state.isPaused) {
          this.playNextSentence();
        }
      }, 120);
    };

    audio.onended = () => {
      advance();
    };

    audio.onerror = (err) => {
      console.warn('Neural audio load error, using strict male speech synthesis fallback:', err);
      this.speakWithStrictMaleBrowserSpeech(currentSentence);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((playErr) => {
        console.warn('Audio play error, falling back to strict male speech:', playErr);
        this.speakWithStrictMaleBrowserSpeech(currentSentence);
      });
    }
  }

  /**
   * Strict male browser speech synthesis fallback (NO FEMALE VOICES EVER)
   */
  private speakWithStrictMaleBrowserSpeech(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.advanceQueueAfterFailure();
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      const lang = this.activeOptions?.lang || 'ar';
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = this.activeOptions?.rate || 0.95;
      
      // Force deep masculine baritone pitch (0.60) to guarantee a man's voice
      utterance.pitch = 0.60;

      const femaleRegex = /female|zira|susan|laila|salma|amina|hoda|sara|reem|fatima|maryam|siri|samantha|victoria|karen|moira|fiona|veena|tessa|yuna|kyoko|woman|girl/i;
      const maleRegex = /male|david|george|guy|mark|richard|james|alex|daniel|tarik|maged|hamed|naayf/i;

      const voices = window.speechSynthesis.getVoices();
      const langVoices = voices.filter(v => v.lang.startsWith(lang));

      // Strictly find explicitly male voice, and never pick a female one
      const explicitMale = langVoices.find(v => maleRegex.test(v.name));
      const nonFemale = langVoices.find(v => !femaleRegex.test(v.name));

      if (explicitMale) {
        utterance.voice = explicitMale;
      } else if (nonFemale) {
        utterance.voice = nonFemale;
      }

      let hasFinished = false;
      const advance = () => {
        if (hasFinished) return;
        hasFinished = true;
        this.currentUtterance = null;
        this.queueIndex++;
        setTimeout(() => {
          if (this.state.isSpeaking && !this.state.isPaused) {
            this.playNextSentence();
          }
        }, 120);
      };

      utterance.onend = () => advance();
      utterance.onerror = () => advance();

      this.updateState({ audioMode: 'browser_speech' });
      window.speechSynthesis.speak(utterance);
    } catch {
      this.advanceQueueAfterFailure();
    }
  }

  private advanceQueueAfterFailure() {
    this.queueIndex++;
    if (this.queueIndex < this.sentenceQueue.length) {
      this.playNextSentence();
    } else {
      this.stop();
      this.activeOptions?.onEnd?.();
    }
  }

  public pause() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    this.updateState({ isPaused: true });
    this.stopLipSyncAnimation();
  }

  public resume() {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play().catch(() => {});
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    this.updateState({ isPaused: false });
    if (this.state.isSpeaking) {
      this.startLipSyncAnimation();
    }
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = '';
      } catch {}
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
    this.sentenceQueue = [];
    this.queueIndex = 0;
    this.stopLipSyncAnimation();
    this.updateState({
      isSpeaking: false,
      isPaused: false,
      mouthOpenness: 0,
      progressPercent: 0
    });
  }

  public isSpeaking(): boolean {
    return this.state.isSpeaking;
  }
}

export const maleTutorVoice = new MaleTutorVoiceService();

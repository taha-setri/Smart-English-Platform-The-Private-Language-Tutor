import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  Volume2, 
  Bookmark, 
  Sparkles,
  Search
} from 'lucide-react';
import { Language, StudentLevel, VocabularyCard } from '../types';
import { VOCABULARY_LIST } from '../data/learningData';
import { maleTutorVoice } from '../utils/speech';

interface VocabularySectionProps {
  currentLang: Language;
  selectedLevel: StudentLevel;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({ currentLang, selectedLevel }) => {
  const isAr = currentLang === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null);

  // Filter cards by level and search query
  const levelFiltered = VOCABULARY_LIST.filter(v => v.level === selectedLevel);
  const currentLevelCards = levelFiltered.length > 0 ? levelFiltered : VOCABULARY_LIST;

  const filteredCards = currentLevelCards.filter(c => 
    c.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.meaningAr.includes(searchQuery)
  );

  const activeCards = filteredCards.length > 0 ? filteredCards : currentLevelCards;
  const currentCard: VocabularyCard | undefined = activeCards[currentIndex % activeCards.length];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % activeCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + activeCards.length) % activeCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIdx = Math.floor(Math.random() * activeCards.length);
    setCurrentIndex(randomIdx);
  };

  const handleSpeakWord = (card: VocabularyCard, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSpeakingWordId(card.id);
    // Speak in English (word and example) with male tutor voice
    maleTutorVoice.speak({
      text: `${card.word}. ${card.exampleSentenceEn}`,
      lang: 'en',
      rate: 0.9, // deliberate educational tempo
      pitch: 0.78, // Masculine baritone frequency
      onEnd: () => setSpeakingWordId(null),
      onError: () => setSpeakingWordId(null)
    });
  };

  const handleSpeakArabicNote = (card: VocabularyCard, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSpeakingWordId(`${card.id}-ar`);
    maleTutorVoice.speak({
      text: `${card.meaningAr}. ${card.audioNotesAr}`,
      lang: 'ar',
      rate: 1.0,
      pitch: 0.78, // Masculine baritone frequency
      onEnd: () => setSpeakingWordId(null),
      onError: () => setSpeakingWordId(null)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isAr ? 'القسم الثاني: المفردات والبطاقات التعليمية التفاعلية' : 'Section 2: Vocabulary & Interactive Flashcards'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isAr
              ? 'بطاقات تفاعلية ذكية قابلة للقلب، مع النطق الصوتي الرجالي، النسخ الصوتي، وسياقات الاستخدام الحية.'
              : 'Interactive flip flashcards with male pronunciation, IPA phonetics, and contextual collocations.'}
          </p>
        </div>

        {/* Search bar inside level */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            placeholder={isAr ? 'ابحث عن كلمة أو معنى...' : 'Search word or meaning...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pr-9 pl-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Flashcard Studio Area */}
      {currentCard ? (
        <div className="max-w-xl mx-auto space-y-4">
          
          {/* Progress and card counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              {isAr ? `البطاقة ${((currentIndex % activeCards.length) + 1)} من ${activeCards.length}` : `Card ${((currentIndex % activeCards.length) + 1)} of ${activeCards.length}`}
            </span>
            <span className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              {currentCard.category}
            </span>
          </div>

          {/* Interactive Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[300px] sm:min-h-[340px] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-2xl cursor-pointer transition-all duration-300 select-none flex flex-col justify-between"
          >
            {/* Top row of card */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800/70 pb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                {currentCard.partOfSpeech}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => handleSpeakWord(currentCard, e)}
                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors"
                  title="استمع لنطق الكلمة والمثال"
                >
                  <Volume2 className={`w-4 h-4 ${speakingWordId === currentCard.id ? 'animate-bounce text-emerald-400' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="اقلب البطاقة"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Center Content: Front (English) or Back (Arabic & Details) */}
            {!isFlipped ? (
              /* FRONT VIEW */
              <div className="my-auto text-center space-y-3 py-6">
                <div className="text-xs text-indigo-400 uppercase tracking-widest font-semibold">
                  {isAr ? 'انقر على البطاقة لمعرفة المعنى العربي' : 'Click to flip for meaning'}
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-latin tracking-tight" dir="ltr">
                  {currentCard.word}
                </h3>
                <div className="font-mono text-sm text-slate-400" dir="ltr">
                  {currentCard.ipa}
                </div>
                <div className="pt-3 max-w-md mx-auto">
                  <p className="text-xs sm:text-sm text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 italic" dir="ltr">
                    "{currentCard.exampleSentenceEn}"
                  </p>
                </div>
              </div>
            ) : (
              /* BACK VIEW */
              <div className="my-auto space-y-3 py-4 text-right">
                <div className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                  {isAr ? 'المعنى التربوي والسياق اللغوي' : 'Pedagogical Meaning & Context'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {currentCard.meaningAr}
                </h3>
                <div className="text-sm text-emerald-300 bg-slate-950/80 p-3 rounded-xl border border-emerald-950/80">
                  <span className="font-semibold text-white block mb-1 text-xs">
                    {isAr ? 'المثال مترجماً:' : 'Translated Example:'}
                  </span>
                  "{currentCard.exampleSentenceAr}"
                </div>

                {currentCard.collocations && (
                  <div className="pt-1">
                    <span className="text-[11px] text-slate-400 block mb-1 font-semibold">
                      {isAr ? 'متلازمات لغوية شائعة (Collocations):' : 'Collocations:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5" dir="ltr">
                      {currentCard.collocations.map((col, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-200 border border-slate-700"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-400 italic">
                    💡 {currentCard.audioNotesAr}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => handleSpeakArabicNote(currentCard, e)}
                    className="shrink-0 text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'شرح المعلم' : 'Audio Note'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Flip hint */}
            <div className="text-center border-t border-slate-800/70 pt-3">
              <span className="text-[11px] text-slate-500 inline-flex items-center gap-1.5">
                <RotateCw className="w-3 h-3" />
                {isFlipped
                  ? (isAr ? 'انقر للعودة إلى الوجه الإنجليزي' : 'Click to flip back to English')
                  : (isAr ? 'انقر لعرض المعنى والشرح العربي' : 'Click to reveal Arabic details')}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              <span>{isAr ? 'البطاقة السابقة' : 'Previous'}</span>
            </button>

            <button
              type="button"
              onClick={handleShuffle}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title="خلط عشوائي"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors"
            >
              <span>{isAr ? 'البطاقة التالية' : 'Next'}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">
          {isAr ? 'لم يتم العثور على كلمات مطابقة للبحث.' : 'No vocabulary matching your search.'}
        </div>
      )}

      {/* Grid of All Level Words for Quick Review */}
      <div className="pt-6 border-t border-slate-800 space-y-3">
        <h4 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">
          {isAr ? 'قائمة مفردات المستوى السريعة للمراجعة:' : 'Level Vocabulary Quick Reference:'}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {currentLevelCards.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setIsFlipped(false);
              }}
              className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-right transition-all group"
            >
              <div className="font-bold text-xs text-white group-hover:text-indigo-300 font-latin" dir="ltr">
                {card.word}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">
                {card.meaningAr}
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

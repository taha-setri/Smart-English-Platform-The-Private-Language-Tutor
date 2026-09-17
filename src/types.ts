export type Language = 'ar' | 'en';

export type StudentLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GrammarLesson {
  id: string;
  level: StudentLevel;
  titleAr: string;
  titleEn: string;
  category: string;
  summaryAr: string;
  structure: string;
  whenToUseAr: string;
  keywords: string[];
  examples: {
    english: string;
    arabic: string;
    explanationAr: string;
  }[];
  commonMistakes: {
    wrong: string;
    correct: string;
    reasonAr: string;
  }[];
  audioExplanationAr: string;
  audioExplanationEn: string;
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanationAr: string;
  };
}

export interface VocabularyCard {
  id: string;
  level: StudentLevel;
  word: string;
  partOfSpeech: string;
  ipa: string;
  meaningAr: string;
  category: string;
  exampleSentenceEn: string;
  exampleSentenceAr: string;
  collocations?: string[];
  audioNotesAr: string;
}

export interface AnalysisResult {
  originalText: string;
  correctedText: string;
  actionType: 'correct' | 'simplify' | 'analyze' | 'translate' | 'formal';
  arabicTranslation: string;
  grammarRuleTitleAr: string;
  grammarRuleExplanationAr: string;
  identifiedIssues: {
    type: string;
    originalPart: string;
    correctedPart: string;
    explanationAr: string;
  }[];
  illustrativeExamples: {
    english: string;
    arabic: string;
    noteAr: string;
  }[];
  miniQuiz: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanationAr: string;
  };
  audioTeacherNarrationAr: string;
  audioTeacherNarrationEn: string;
}

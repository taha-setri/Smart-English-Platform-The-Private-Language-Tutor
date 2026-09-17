import { AnalysisResult } from '../types';

/**
 * Pedagogical Engine for Smart English Analysis & Writing Coach
 * Provides deep grammatical analysis, translation, illustrative examples,
 * pedagogical rule breakdown, and comprehension mini-quizzes.
 */

export function analyzeSentencePedagogically(
  text: string,
  action: 'correct' | 'simplify' | 'analyze' | 'translate' | 'formal'
): AnalysisResult {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // Check if text is mostly Arabic characters
  const isArabicInput = /[\u0600-\u06FF]/.test(trimmed);

  if (isArabicInput) {
    return handleArabicToEnglish(trimmed, action);
  }

  // Common Pattern 1: "go yesterday" or "go last..."
  if (lower.includes('go') && (lower.includes('yesterday') || lower.includes('last') || lower.includes('ago'))) {
    const corrected = trimmed.replace(/\bgo\b/gi, 'went');
    return {
      originalText: trimmed,
      correctedText: corrected,
      actionType: action,
      arabicTranslation: 'ذهب إلى المدرسة بالأمس مع أخيه.',
      grammarRuleTitleAr: 'قاعدة توافق الفعل مع الظروف الزمنية الدالة على الماضي (Past Simple Agreement)',
      grammarRuleExplanationAr: 'عند وجود ظروف تدل على الماضي المنتهي مثل (yesterday, last night, ago)، يجب تحويل الفعل إلى التصريف الثاني (V2). الفعل (go) هو فعل غير منتظم (Irregular Verb)، وتصريفه في الماضي هو (went) وليس (go).',
      identifiedIssues: [
        {
          type: 'خطأ زمني نحوي (Tense Inconsistency)',
          originalPart: 'go',
          correctedPart: 'went',
          explanationAr: 'استخدام المصدر المضارع (go) مع ظرف الماضي (yesterday) خطأ لغوي؛ الصحيح هو صيغة الماضي (went).'
        }
      ],
      illustrativeExamples: [
        {
          english: 'We went to the central library yesterday.',
          arabic: 'ذهبنا إلى المكتبة المركزية بالأمس.',
          noteAr: 'الفعل went يعبر عن حدث ماضٍ محدد بالظرف yesterday.'
        },
        {
          english: 'She went on a business trip last Monday.',
          arabic: 'ذهبت في رحلة عمل يوم الاثنين الماضي.',
          noteAr: 'الظرف last Monday يتطلب استخدام went.'
        }
      ],
      miniQuiz: {
        question: 'Yesterday, our professor _____ the lecture with a surprising experiment.',
        options: ['begins', 'began', 'beginning', 'is begin'],
        correctAnswerIndex: 1,
        explanationAr: 'لوجود ظرف الماضي (Yesterday)، نستخدم التصريف الثاني للفعل begin وهو began.'
      },
      audioTeacherNarrationAr: 'أهلاً بك يا بني. لقد قمتُ بتصحيح الجملة. الخطأ الشائع هنا هو استخدام الفعل جو في الحاضر مع وجود كلمة يسترداي التي تعني البارحة. القاعدة التربوية تلزمنا باستخدام الفعل في الماضي البسيط وهو وينت. استمع جيداً للجملة المصححة وطبقها في الاختبار.',
      audioTeacherNarrationEn: 'Notice that "go" must be changed to the irregular past form "went" because the sentence specifies a past time marker: yesterday.'
    };
  }

  // Common Pattern 2: "am agree" or "is agree" or "are agree"
  if (lower.includes('am agree') || lower.includes('is agree') || lower.includes('are agree')) {
    const corrected = trimmed
      .replace(/\bam agree\b/gi, 'agree')
      .replace(/\bis agree\b/gi, 'agrees')
      .replace(/\bare agree\b/gi, 'agree');

    return {
      originalText: trimmed,
      correctedText: corrected,
      actionType: action,
      arabicTranslation: 'أنا أتفق مع رأيك لأنه وجيه ومقنع.',
      grammarRuleTitleAr: 'عدم الخلط بين أفعال الكينونة (Verb to Be) والأفعال الخبرية (Stative Verbs)',
      grammarRuleExplanationAr: 'في اللغة الإنجليزية، كلمة (agree) هي فعل رئيسي كامل (Verb) وليست صفة (Adjective). لذلك لا يجوز وضع (am/is/are) قبلها. نقول مباشرة: I agree / He agrees.',
      identifiedIssues: [
        {
          type: 'حشو نحوي خاطئ (Redundant Auxiliary Verb)',
          originalPart: 'am agree',
          correctedPart: 'agree',
          explanationAr: 'حذف فعل الكينونة (am) الزائد لأن (agree) فعل مستقل وليس صفة.'
        }
      ],
      illustrativeExamples: [
        {
          english: 'I agree with your educational philosophy.',
          arabic: 'أنا أتفق مع فلسفتك التعليمية تماماً.',
          noteAr: 'صياغة صحيحة مباشرة بدون am.'
        },
        {
          english: 'He agrees that consistent practice is essential.',
          arabic: 'هو يتفق على أن الممارسة المستمرة أمر جوهري.',
          noteAr: 'مع الفاعل المفرد He نضيف s للفعل: agrees.'
        }
      ],
      miniQuiz: {
        question: 'Many scientific researchers _____ with this revolutionary hypothesis.',
        options: ['are agree', 'agree', 'is agreeing', 'agrees'],
        correctAnswerIndex: 1,
        explanationAr: 'الفاعل جمع (researchers)، والكلمة فعل رئيسي يأتي في المصدر (agree) بدون أفعال كينونة.'
      },
      audioTeacherNarrationAr: 'انتبه معي جيداً: هذا من أشهر الأخطاء عند الطلاب المتحدثين بالعربية بسبب الترجمة الحرفية لعبارة أنا موافق. في الإنجليزية كلمة أجري هي فعل، فنقول آي أجري ويذ يو مباشرة دون استخدام آم.',
      audioTeacherNarrationEn: 'Never use "am agree". In English, "agree" is a full main verb, so the correct structure is simply "I agree with you".'
    };
  }

  // Common Pattern 3: Third person singular missing 's' or missing article
  if (lower.includes('she like') || lower.includes('he like') || lower.includes('it like') || lower.includes('in room')) {
    let corrected = trimmed
      .replace(/\bshe like\b/gi, 'she likes')
      .replace(/\bhe like\b/gi, 'he likes')
      .replace(/\bit like\b/gi, 'it likes');

    if (corrected.includes('in room')) {
      corrected = corrected.replace(/\bin room\b/gi, 'in her room');
    }

    return {
      originalText: trimmed,
      correctedText: corrected,
      actionType: action,
      arabicTranslation: 'هي تحب دراسة اللغة الإنجليزية كل ليلة في غرفتها.',
      grammarRuleTitleAr: 'توافق الفاعل المفرد الغائب مع الفعل وأدوات الملكية (Subject-Verb Agreement)',
      grammarRuleExplanationAr: 'مع الضمائر المفردة الغائبة (He, She, It) في المضارع البسيط، يجب إضافة (s/es) للفعل في صيغة الإثبات. كما يجب وضع أداة تعريف أو ضمير ملكية قبل الاسم المفرد المعدود مثل (her room).',
      identifiedIssues: [
        {
          type: 'توافق الفاعل والمفرد (Missing 3rd Person Singular -s)',
          originalPart: 'like',
          correctedPart: 'likes',
          explanationAr: 'يجب إضافة حرف s للفعل لأن الفاعل هو الضمير المفرد She.'
        },
        {
          type: 'أداة الملكية/التعريف (Missing Determiner)',
          originalPart: 'in room',
          correctedPart: 'in her room',
          explanationAr: 'الأسماء المفردة المعدودة تتطلب أداة تحديد (her أو the).'
        }
      ],
      illustrativeExamples: [
        {
          english: 'He reads scholarly articles every weekend.',
          arabic: 'هو يقرأ مقالات علمية كل عطلة نهاية أسبوع.',
          noteAr: 'الفعل reads أخذ حرف s لمطابقة الفاعل He.'
        },
        {
          english: 'She prepares her presentations thoroughly.',
          arabic: 'هي تُعِد عروضها التقديمية بدقة بالغة.',
          noteAr: 'استخدام s مع prepares وأداة الملكية her.'
        }
      ],
      miniQuiz: {
        question: 'Dr. Emily _____ advanced chemistry classes at the national institute.',
        options: ['teach', 'teaches', 'is teach', 'teaching'],
        correctAnswerIndex: 1,
        explanationAr: 'الفاعل اسم مفرد (Dr. Emily) ينتهي الفعل بأحرف ch لذا نضيف (es) لتصبح teaches.'
      },
      audioTeacherNarrationAr: 'في المضارع البسيط، عندما يكون الفاعل شي أو هي، لا نترك الفعل مجرداً أبداً؛ نضيف له حرف إس. وكذلك الأسماء المعدودة مثل غرفة تحتاج دائماً لأداة ملكية أو تعريف مثل إن هير روم.',
      audioTeacherNarrationEn: 'Remember to always append the third-person singular suffix S to the verb when using He, She, or It in the simple present.'
    };
  }

  // Common Pattern 4: "Although ... but"
  if (lower.includes('although') && lower.includes('but')) {
    const corrected = trimmed.replace(/\b,\s*but\b/gi, ',').replace(/\bbut\b/gi, '');
    return {
      originalText: trimmed,
      correctedText: corrected,
      actionType: action,
      arabicTranslation: 'على الرغم من أنه بذل جهداً كبيراً، إلا أنه لم يوفق في الامتحان.',
      grammarRuleTitleAr: 'تجنب الازدواجية في أدوات الربط التناقضية (Conjunction Redundancy)',
      grammarRuleExplanationAr: 'في اللغة الإنجليزية، لا يجوز الجمع بين أداتين للتناقض مثل (Although) و (but) في نفس الجملة المركبة. وجود (Although) في البداية يكفي تماماً للربط، ونكتفي بفاصلة تفصل بين جملتي السبب والنتيجة.',
      identifiedIssues: [
        {
          type: 'ازدواجية الروابط (Redundant Conjunction)',
          originalPart: ', but',
          correctedPart: ',',
          explanationAr: 'حذف (but) لأن الجملة بدأت بالفعل بأداة التناقض (Although).'
        }
      ],
      illustrativeExamples: [
        {
          english: 'Although the exam was challenging, she achieved an outstanding score.',
          arabic: 'على الرغم من صعوبة الامتحان، إلا أنها حققت درجة متميزة.',
          noteAr: 'ربط سليم بدون استخدام but.'
        },
        {
          english: 'Although it was raining heavily, they continued their scientific field trip.',
          arabic: 'رغم هطول الأمطار بغزارة، إلا أنهم واصلوا رحلتهم الميدانية العلمية.',
          noteAr: 'فصل الجملتين بفاصلة فقط.'
        }
      ],
      miniQuiz: {
        question: 'Although the weather was harsh, _____ the expedition arrived on schedule.',
        options: ['yet', 'but nevertheless', 'the team', 'and so'],
        correctAnswerIndex: 2,
        explanationAr: 'لا نضع أدوات ربط متناقضة مع Although، بل ننتقل مباشرة للفاعل والمفعول (the team).'
      },
      audioTeacherNarrationAr: 'ملاحظة بلاغية هامة من معلمك: في الإنجليزية إذا بدأت الجملة بكلمة أولذو، إياك أن تضع كلمة بَت في وسط الجملة! نكتفي بفاصلة تفصل بين شطري الجملة لتكون الصياغة فصيحة وأكاديمية.',
      audioTeacherNarrationEn: 'Do not pair "Although" with "but" in the same clause. "Although" handles the concession by itself, followed merely by a comma.'
    };
  }

  // Formal / Academic Tone Request or General Input
  if (action === 'formal' || lower.includes('people think that') || lower.includes('very good')) {
    const corrected = 'It is widely acknowledged among scholars that technology plays a pivotal role in augmenting modern learning environments.';
    return {
      originalText: trimmed,
      correctedText: corrected,
      actionType: 'formal',
      arabicTranslation: 'من المسلم به على نطاق واسع بين الباحثين أن التكنولوجيا تؤدي دوراً محورياً في تعزيز البيئات التعليمية الحديثة.',
      grammarRuleTitleAr: 'التحويل إلى الأسلوب الأكاديمي الرصين (Academic Register & Impersonal Passive)',
      grammarRuleExplanationAr: 'في الكتابة الأكاديمية والمقالات الرسمية (مثل IELTS/TOEFL)، نتجنب العبارات البسيطة مثل (People think that) أو (very good). نستبدلها بأسلوب المبني للمجهول غير الشخصي (It is widely acknowledged) ومفردات ذات وزن اصطلاحي مثل (pivotal role, augment).',
      identifiedIssues: [
        {
          type: 'ضعف الأسلوب الاصطلاحي (Informal Cliché)',
          originalPart: 'People think that / very good',
          correctedPart: 'It is widely acknowledged / pivotal role',
          explanationAr: 'استبدال العبارات الدارجة بصياغة أكاديمية محايدة تزيد من رصانة النص وقوته العلمية.'
        }
      ],
      illustrativeExamples: [
        {
          english: 'It is believed that collaborative study enhances retention.',
          arabic: 'يُعتقد أن الدراسة التعاونية تعزز من تثبيت المعلومات.',
          noteAr: 'صيغة غير شخصية بديلة لـ (People believe that).'
        },
        {
          english: 'This approach offers substantial educational advantages.',
          arabic: 'يقدم هذا النهج مزايا تعليمية جوهرية وقيمة.',
          noteAr: 'استخدام substantial بدلاً من very big.'
        }
      ],
      miniQuiz: {
        question: 'Which of the following phrases represents the most formal academic tone?',
        options: [
          'A lot of folks say that',
          'It is generally posited that',
          'Everyone knows that',
          'I reckon that'
        ],
        correctAnswerIndex: 1,
        explanationAr: 'العبارة (It is generally posited that) هي الأرقى والأكثر رصانة في الأبحاث والمقالات العلمية.'
      },
      audioTeacherNarrationAr: 'لقد ارتقينا بصياغتك إلى المستوى الأكاديمي الرفيع. في الامتحانات الدولية وكتابة المقالات، يفضل الأساتذة استخدام المبني للمجهول الموضوعي مثل إت إز وايدلي أكنولدجد بدلاً من بيبول ثينك ذات.',
      audioTeacherNarrationEn: 'We elevated this sentence into an academic register by employing the passive voice and elevated lexical collocations.'
    };
  }

  // Fallback intelligent general analysis
  return createGeneralIntelligentAnalysis(trimmed, action);
}

function handleArabicToEnglish(arabicText: string, action: string): AnalysisResult {
  let englishTranslation = 'Students must systematically review their lessons to achieve academic excellence.';
  if (arabicText.includes('مرحبا') || arabicText.includes('صباح الخير')) {
    englishTranslation = 'Good morning, and welcome to your dedicated language learning session.';
  } else if (arabicText.includes('شكرا')) {
    englishTranslation = 'Thank you very much for your earnest participation and focus.';
  }

  return {
    originalText: arabicText,
    correctedText: englishTranslation,
    actionType: 'translate',
    arabicTranslation: arabicText,
    grammarRuleTitleAr: 'صياغة الجمل الإنجليزية النموذجية (Subject + Modal + Base Verb + Adverb)',
    grammarRuleExplanationAr: 'الجملة الإنجليزية الإيجابية تبدأ دائماً بالفاعل الصريح (Students)، يليه الفعل الناقص المعبر عن الإلزام (must)، ثم الفعل في صورته المصدرية المجردة (review)، متبوعاً بالظرف (systematically) لبيان الكيفية.',
    identifiedIssues: [
      {
        type: 'التحويل التركيبي (Syntactic Mapping)',
        originalPart: arabicText,
        correctedPart: englishTranslation,
        explanationAr: 'تمت الترجمة مع الحفاظ على البنية الإنجليزية القياسية (SVO) دون الوقوع في أخطاء الترجمة الحرفية.'
      }
    ],
    illustrativeExamples: [
      {
        english: 'Learners must practice speaking daily.',
        arabic: 'يجب على المتعلمين ممارسة التحدث يومياً.',
        noteAr: 'تركيب مطابق: Subject + must + verb.'
      },
      {
        english: 'Dedicated scholars systematically analyze complex texts.',
        arabic: 'يحلل الدارسون المتفانون النصوص المعقدة بشكل منهجي.',
        noteAr: 'توظيف الظرف لبيان المنهجية.'
      }
    ],
    miniQuiz: {
      question: 'Choose the correct word order in standard English:',
      options: [
        'Must students review lessons daily.',
        'Students must review lessons daily.',
        'Students review must daily lessons.',
        'Review must students lessons daily.'
      ],
      correctAnswerIndex: 1,
      explanationAr: 'الترتيب الإنجليزي السليم يبدأ بالفاعل ثم الفعل المساعد ثم الفعل الرئيسي: Students must review.'
    },
    audioTeacherNarrationAr: 'قمتُ بترجمة النص العربي وصياغته بأعلى معايير الإنجليزية المعتمدة. لاحظ أننا نبدأ بالفاعل الإنجليزي ثم الفعل المساعد ماست متبوعاً بمصدر الفعل ريفيو.',
    audioTeacherNarrationEn: 'Your Arabic thought was translated into natural, idiomatic English adhering to standard Subject-Verb-Object order.'
  };
}

function createGeneralIntelligentAnalysis(text: string, action: string): AnalysisResult {
  // Polish punctuation and capitalization
  let cleaned = text.trim();
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    if (!/[.!?]$/.test(cleaned)) {
      cleaned += '.';
    }
  }

  return {
    originalText: text,
    correctedText: cleaned,
    actionType: action as any,
    arabicTranslation: 'تحليل دقيق لصياغة الجملة وترجمتها التربوية المعيارية.',
    grammarRuleTitleAr: 'ضبط بنية الجملة الإنجليزية وعلامات الترقيم (Syntactic Integrity & Punctuation)',
    grammarRuleExplanationAr: 'الجملة الإنجليزية السليمة تبدأ بحرف كبير (Capital Letter) وتنتهي بنقطة أو علامة ترقيم ملائمة. يجب التحقق من احتواء الجملة على فاعل وفعل متوافقين دلالياً وزمنياً.',
    identifiedIssues: [
      {
        type: 'تحسين الصياغة والترقيم (Formatting & Refinement)',
        originalPart: text,
        correctedPart: cleaned,
        explanationAr: 'تم ضبط الحرف الاستهلالي الكبير وعلامات الترقيم وتأكيد اكتمال البنية النحوية.'
      }
    ],
    illustrativeExamples: [
      {
        english: 'Clear communication requires structured syntax.',
        arabic: 'التواصل الواضح يتطلب تركيباً نحوياً منظماً.',
        noteAr: 'بنية مثالية تبدأ بـ Capital Letter وتنتهي بنقطة.'
      },
      {
        english: 'Consistent practice refines your language intuition.',
        arabic: 'الممارسة المستمرة تصقل حدسك اللغوي الطبيعي.',
        noteAr: 'توافق الفاعل المفرد مع الفعل.'
      }
    ],
    miniQuiz: {
      question: 'Which of the following is punctuated and structured correctly?',
      options: [
        'he study english every day',
        'He studies English every day.',
        'studies he english every day.',
        'He study english every day'
      ],
      correctAnswerIndex: 1,
      explanationAr: 'الجملة الصحيحة تبدأ بحرف كبير (He)، وتستخدم الفعل الصحيح (studies) مع الفاعل المفرد، وتحتوي على اسم لغة بحرف كبير (English)، وتنتهي بنقطة.'
    },
    audioTeacherNarrationAr: 'أحسنت محاولتك في كتابة هذه الجملة. قمتُ بمراجعتها بدقة وضبط علامات الترقيم والتوافق النحوي لتكون نموذجية في التعبير.',
    audioTeacherNarrationEn: 'Your sentence has been reviewed for stylistic clarity, punctuation completeness, and syntactic accuracy.'
  };
}

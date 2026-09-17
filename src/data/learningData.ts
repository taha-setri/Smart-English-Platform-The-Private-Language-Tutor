import { GrammarLesson, VocabularyCard } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  // BEGINNER
  {
    id: 'present-simple',
    level: 'beginner',
    titleAr: 'المضارع البسيط (Present Simple)',
    titleEn: 'Present Simple Tense',
    category: 'الأزمنة الأساسية',
    summaryAr: 'يُستخدم للتعبير عن الحقائق الثابتة، العادات اليومية، والروتين المتكرر.',
    structure: 'Subject + Verb (s/es مع He/She/It) + Object',
    whenToUseAr: 'نستعمله عندما نتحدث عن شيء يتكرر بانتظام، أو حقيقة علمية لا تتغير، أو روتين يومي.',
    keywords: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'daily'],
    examples: [
      {
        english: 'He drinks coffee every morning.',
        arabic: 'هو يشرب القهوة كل صباح.',
        explanationAr: 'أضفنا حرف (s) للفعل drink لأن الفاعل مفرد غائب (He).'
      },
      {
        english: 'Water boils at 100 degrees Celsius.',
        arabic: 'يغلي الماء عند 100 درجة مئوية.',
        explanationAr: 'حقيقة علمية ثابتة، لذلك نستخدم المضارع البسيط.'
      },
      {
        english: 'They play football on Fridays.',
        arabic: 'هم يلعبون كرة القدم في أيام الجمعة.',
        explanationAr: 'الفاعل جمع (They)، لذا يبقى الفعل في صورته المصدرية دون إضافة.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'He drink tea every day.',
        correct: 'He drinks tea every day.',
        reasonAr: 'الخطأ هو نسيان حرف (s) مع الضمير المفرد (He).'
      },
      {
        wrong: 'She does not likes apples.',
        correct: 'She does not like apples.',
        reasonAr: 'بعد (does not) يعود الفعل إلى المصدر المجرد بدون (s).'
      }
    ],
    audioExplanationAr: 'مرحباً بك يا بطل. أنا معلمك الخصوصي. قاعدة المضارع البسيط من أهم القواعد الأساسية. تذكر دائماً: مع الضمائر المفردة هي، شي، إت، نضيف حرف إس للفعل في حالة الإثبات. أما في حالة النفي أو السؤال مع داز، نحذف الإس ويعود الفعل لأصله.',
    audioExplanationEn: 'Welcome! This is your personal tutor. The Present Simple tense is used for routines and permanent truths. Remember: with He, She, and It, always add S or ES to the base verb in positive sentences!',
    quickQuiz: {
      question: 'Sarah _____ to work by bus every morning.',
      options: ['go', 'goes', 'going', 'is go'],
      correctIndex: 1,
      explanationAr: 'الفاعل (Sarah) اسم مفرد مؤنث يعادل (She)، والظرف (every morning) يدل على روتين، لذا نضيف (es) للفعل go لتصبح goes.'
    }
  },
  {
    id: 'past-simple',
    level: 'beginner',
    titleAr: 'الماضي البسيط (Past Simple)',
    titleEn: 'Past Simple Tense',
    category: 'الأزمنة الأساسية',
    summaryAr: 'يُستخدم للتعبير عن أفعال وأحداث بدأت وانتهت تماماً في وقت محدد في الماضي.',
    structure: 'Subject + Verb 2 (ed / شاذ) + Object',
    whenToUseAr: 'نستعمله لسرد القصص، وذكر الأحداث المنتهية التي وقعت في نقطة زمنية معروفة سابقاً.',
    keywords: ['yesterday', 'ago', 'last week', 'in 2020', 'once upon a time'],
    examples: [
      {
        english: 'I visited London last summer.',
        arabic: 'زرتُ لندن الصيف الماضي.',
        explanationAr: 'الفعل المنتظم visit أضفنا له ed ليصبح في الزمن الماضي.'
      },
      {
        english: 'She bought a new laptop yesterday.',
        arabic: 'اشترت حاسوباً محمولاً جديداً بالأمس.',
        explanationAr: 'الفعل buy فعل غير منتظم (شاذ)، وتصريفه الثاني هو bought.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'I did not went to school yesterday.',
        correct: 'I did not go to school yesterday.',
        reasonAr: 'بعد did not، يجب أن يكون الفعل في المصدر (go) وليس في صيغة الماضي (went).'
      }
    ],
    audioExplanationAr: 'في الماضي البسيط، نتحدث عن حدث انتهى تماماً وأصبح وراءنا. الأفعال تنقسم لنوعين: منتظمة تأخذ إي دي، وأفعال شاذة نحفظ تصريفها مثل جو تصبح وينت. وعند النفي نستخدم ديد نوت متبوعة بمصدر الفعل.',
    audioExplanationEn: 'In the Past Simple tense, we describe completed actions in the past. Regular verbs take E-D, while irregular verbs change forms. Notice that after did not, we use the base verb!',
    quickQuiz: {
      question: 'They _____ to the museum two days ago.',
      options: ['go', 'went', 'gone', 'going'],
      correctIndex: 1,
      explanationAr: 'الظرف (two days ago) يدل على الماضي البسيط، والتصريف الثاني للفعل go هو went.'
    }
  },
  {
    id: 'verb-to-be',
    level: 'beginner',
    titleAr: 'أفعال الكينونة (Verb to Be: am, is, are)',
    titleEn: 'Verb to Be in English',
    category: 'الأساسيات النحوية',
    summaryAr: 'أهم فعل في اللغة الإنجليزية للربط بين المبتدأ والخبر والصفة والحالة.',
    structure: 'I am | He/She/It is | We/You/They are',
    whenToUseAr: 'نستخدمه لوصف الحالة، والمهنة، والجنسية، والعمر، والمكان، ولا نستخدمه مباشرة مع فعل رئيسي إلا في الأزمنة المستمرة.',
    keywords: ['I am', 'You are', 'He is', 'She is', 'It is', 'We are', 'They are'],
    examples: [
      {
        english: 'He is an ambitious engineer.',
        arabic: 'هو مهندس طموح.',
        explanationAr: 'استخدمنا is للربط بين الضمير He والمهنة.'
      },
      {
        english: 'We are ready for the examination.',
        arabic: 'نحن مستعدون للامتحان.',
        explanationAr: 'الضمير We يأخذ are دائماً في الحاضر.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'I am agree with you.',
        correct: 'I agree with you.',
        reasonAr: 'الفعل agree فعل رئيسي بمعنى أوافق ولا يحتاج إلى فعل الكينونة am قبله.'
      }
    ],
    audioExplanationAr: 'انتبه جيداً لأحد أكثر الأخطاء شيوعاً عند الطلاب الناطقين بالعربية: لا تقل أي آم أجري، بل قل آي أجري ويذ يو مباشرة، لأن أجري فعل كامل بحد ذاته.',
    audioExplanationEn: 'A crucial tip from your tutor: Never say "I am agree". Say "I agree with you" because agree is already a full main verb.',
    quickQuiz: {
      question: 'I completely _____ with your practical suggestion.',
      options: ['am agree', 'agree', 'am agreeing', 'agrees'],
      correctIndex: 1,
      explanationAr: 'الصحيح هو (agree) كفعل رئيسي مع الضمير I بدون am وبدون s.'
    }
  },

  // INTERMEDIATE
  {
    id: 'present-perfect',
    level: 'intermediate',
    titleAr: 'المضارع التام (Present Perfect)',
    titleEn: 'Present Perfect Tense',
    category: 'أزمنة الربط',
    summaryAr: 'يربط الماضي بالحاضر؛ إما لحدث وقع في الماضي وله أثر حالي، أو تجربة حياتية دون تحديد وقت.',
    structure: 'Subject + have / has + Past Participle (V3)',
    whenToUseAr: 'نستخدمه للتحدث عن الخبرات الحياتية، أو إنجازات مستمرة، أو أحداث انتهت للتو ولها نتيجة مرئية الآن.',
    keywords: ['already', 'just', 'yet', 'ever', 'never', 'since', 'for', 'recently'],
    examples: [
      {
        english: 'I have lost my keys (so I cannot enter now).',
        arabic: 'لقد أضعت مفاتيحي (والنتيجة أنني لا أستطيع الدخول الآن).',
        explanationAr: 'الحدث وقع في الماضي لكن أثره مستمر في الحاضر.'
      },
      {
        english: 'She has lived in Cairo since 2018.',
        arabic: 'هي تعيش في القاهرة منذ عام 2018 (وما زالت تعيش هناك).',
        explanationAr: 'استخدام since مع سنة محددة يدل على استمرار الإقامة حتى وقتنا هذا.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'I have seen him yesterday.',
        correct: 'I saw him yesterday.',
        reasonAr: 'إذا حُدد وقت الماضي بالتحديد مثل yesterday أو in 2020، نستخدم الماضي البسيط وليس المضارع التام.'
      }
    ],
    audioExplanationAr: 'المضارع التام هو الجسر بين الماضي والحاضر. إذا ذكرت وقتاً محدداً مثل البارحة أو العام الماضي، استعمل الماضي البسيط. أما إذا كان الأثر هو الأهم، أو استخدمت كلمات مثل سِنس وفور، فاستخدم هاف أو هاز مع التصريف الثالث.',
    audioExplanationEn: 'The Present Perfect bridges the past and present. If the specific time is mentioned, use Past Simple. If the experience or ongoing effect matters, use have or has plus the past participle.',
    quickQuiz: {
      question: 'She _____ her final project already.',
      options: ['finishes', 'has finished', 'finished yesterday', 'is finishing'],
      correctIndex: 1,
      explanationAr: 'الكلمة (already) تدل على المضارع التام، والفاعل She يأخذ has + finished.'
    }
  },
  {
    id: 'conditionals',
    level: 'intermediate',
    titleAr: 'الجمل الشرطية (First & Second Conditionals)',
    titleEn: 'Conditionals (If Clauses)',
    category: 'التركيب المتقدم',
    summaryAr: 'صياغة الشروط والنتائج المحتملة (النوع الأول) أو الخيالية والافتراضية (النوع الثاني).',
    structure: 'Type 1: If + Present Simple, will + Verb | Type 2: If + Past Simple, would + Verb',
    whenToUseAr: 'النوع الأول للمستقبل المحتمل؛ والنوع الثاني للمواقف الافتراضية أو غير الواقعية في الحاضر.',
    keywords: ['if', 'unless', 'provided that', 'as long as'],
    examples: [
      {
        english: 'If you study consistently, you will achieve fluency.',
        arabic: 'إذا درستَ باستمرار، فستحقق الطلاقة.',
        explanationAr: 'شرط ممكن وواقعي في المستقبل (Type 1).'
      },
      {
        english: 'If I had more free time, I would learn Spanish.',
        arabic: 'لو كان لدي وقت فراغ أكبر، لتعلمتُ الإسبانية.',
        explanationAr: 'افتراض خيالي غير متحقق في الوقت الحاضر (Type 2).'
      }
    ],
    commonMistakes: [
      {
        wrong: 'If it will rain tomorrow, I will stay home.',
        correct: 'If it rains tomorrow, I will stay home.',
        reasonAr: 'في جملة الشرط (بعد if مباشرة)، لا نضع will أبداً بل نستخدم المضارع البسيط.'
      }
    ],
    audioExplanationAr: 'قاعدة ذهبية في الجمل الشرطية: لا تضع أبداً وِل في شق جملة إف! استخدم المضارع البسيط في جملة إف، وضع وِل في جملة جواب الشرط.',
    audioExplanationEn: 'A golden rule from your tutor: Never put "will" inside the IF clause. Always use the simple present with If, and place "will" in the result clause.',
    quickQuiz: {
      question: 'If he _____ early tomorrow, we will catch the morning train.',
      options: ['wakes up', 'will wake up', 'woke up', 'is waking up'],
      correctIndex: 0,
      explanationAr: 'في جملة الشرط الأولى، نستخدم المضارع البسيط (wakes up) مع الفاعل المفرد he بعد if.'
    }
  },

  // ADVANCED
  {
    id: 'passive-voice',
    level: 'advanced',
    titleAr: 'المبني للمجهول في الكتابة الأكاديمية (Passive Voice)',
    titleEn: 'Passive Voice in Academic Writing',
    category: 'الأسلوب الأكاديمي',
    summaryAr: 'التركيز على الحدث والنتيجة بدلاً من الفاعل، وهو حجر الزاوية في التقارير العلمية والرسمية.',
    structure: 'Object + Appropriate Form of Be + Past Participle (V3)',
    whenToUseAr: 'عندما يكون الفاعل غير معروف، أو غير مهم، أو حينما نريد الحفاظ على نبرة أكاديمية موضوعية.',
    keywords: ['by', 'was discovered', 'is considered', 'has been proven', 'were analyzed'],
    examples: [
      {
        english: 'The experiment was conducted under rigorous conditions.',
        arabic: 'أُجريت التجربة في ظل ظروف دقيقة وصارمة.',
        explanationAr: 'التركيز على التجربة نفسها كحدث علمي وليس على اسم الباحث.'
      },
      {
        english: 'Novel methodologies have been developed recently.',
        arabic: 'تم تطوير منهجيات جديدة ومبتكرة مؤخراً.',
        explanationAr: 'مضارع تام مبني للمجهول: have been + V3.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'The documents were wrote by the director.',
        correct: 'The documents were written by the director.',
        reasonAr: 'المبني للمجهول يتطلب دائماً التصريف الثالث (written) وليس صيغة الماضي البسيط (wrote).'
      }
    ],
    audioExplanationAr: 'في المستوى المتقدم والكتابة الأكاديمية، يُستخدم المبني للمجهول لإبراز الموضوعية العلمية. تأكد دائماً من مطابقة فعل الكينونة بي مع نائب الفاعل واستعمال التصريف الثالث للفعل دائماً.',
    audioExplanationEn: 'In advanced and academic contexts, the passive voice emphasizes findings and objectivity over the researcher. Always combine the proper tense of "be" with the past participle.',
    quickQuiz: {
      question: 'Extensive research _____ into cognitive linguistics this semester.',
      options: ['has been conducted', 'has conducted', 'was conduct', 'conducted'],
      correctIndex: 0,
      explanationAr: 'البحث أُجري بواسطة باحثين (مبني للمجهول في المضارع التام)، لذا نستخدم has been conducted.'
    }
  },
  {
    id: 'inversion',
    level: 'advanced',
    titleAr: 'التقديم والتأخير للتوكيد البلاغي (Grammatical Inversion)',
    titleEn: 'Inversion for Emphasis',
    category: 'البلاغة المتقدمة',
    summaryAr: 'تقديم الظروف السلبية أو المقيدة في بداية الجملة يليه الفعل المساعد قبل الفاعل لإعطاء أثر بلاغي وتوكيدي قوي.',
    structure: 'Negative Adverbial (Seldom, Rarely, Never) + Auxiliary Verb + Subject + Main Verb',
    whenToUseAr: 'في المقالات الأكاديمية، والخطابات الرسمية، وكتابات امتحان الآيلتس والتوفل للحصول على أعلى الدرجات.',
    keywords: ['Rarely', 'Seldom', 'Never before', 'Scarcely', 'Hardly', 'Not only... but also'],
    examples: [
      {
        english: 'Rarely have I witnessed such profound dedication.',
        arabic: 'نادراً ما شاهدتُ مثل هذا التفاني العميق.',
        explanationAr: 'بدأنا بظرف النفي Rarely، فقدمنا الفعل المساعد have قبل الفاعل I كصيغة السؤال لكنها جملة خبرية مؤكدة.'
      },
      {
        english: 'Not only did they meet the deadline, but they also exceeded expectations.',
        arabic: 'لم يكتفوا بالالتزام بالموعد النهائي فحسب، بل تجاوزوا التوقعات أيضاً.',
        explanationAr: 'استخدمنا did قبل they لتوكيد الجملة بلاغياً.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'Rarely I have seen such enthusiasm.',
        correct: 'Rarely have I seen such enthusiasm.',
        reasonAr: 'عندما تبدأ الجملة بـ Rarely، يجب قلب الترتيب بوضع الفعل المساعد قبل الفاعل.'
      }
    ],
    audioExplanationAr: 'أسلوب الانفيرجن أو التقديم والتأخير هو علامة التميز في الكتابة الإنجليزية الرفيعة. عندما تفتتح الجملة بكلمات مثل ريرلي أو نيفير، عامل الجملة وكأنها سؤال في ترتيب الكلمات بوضع الفعل المساعد أولاً.',
    audioExplanationEn: 'Inversion is a hallmark of sophisticated English prose. When opening a sentence with a restrictive adverb like Rarely or Never, invert the auxiliary verb and the subject to create dramatic emphasis.',
    quickQuiz: {
      question: 'Seldom _____ such an articulate presentation on artificial intelligence.',
      options: ['we have heard', 'have we heard', 'we heard', 'did we heard'],
      correctIndex: 1,
      explanationAr: 'الجملة تبدأ بالظرف المقيد Seldom، مما يوجب التقديم والتأخير: have we heard.'
    }
  }
];

export const VOCABULARY_LIST: VocabularyCard[] = [
  // BEGINNER
  {
    id: 'vocab-1',
    level: 'beginner',
    word: 'Consistent',
    partOfSpeech: 'Adjective (صفة)',
    ipa: '/kənˈsɪstənt/',
    meaningAr: 'مستمر، منتظم، ثابت على المبدأ أو الأداء',
    category: 'الحياة اليومية والتعلم',
    exampleSentenceEn: 'Consistent daily study leads to remarkable language fluency.',
    exampleSentenceAr: 'الدراسة اليومية المنتظمة والمستمرة تؤدي إلى طلاقة لغوية لافتة.',
    collocations: ['consistent effort', 'consistent progress', 'stay consistent'],
    audioNotesAr: 'كلمة كونسِستَنت تدل على الاستمرارية وعدم الانقطاع، وهي مفتاح النجاح في تعلم أي لغة.'
  },
  {
    id: 'vocab-2',
    level: 'beginner',
    word: 'Fluency',
    partOfSpeech: 'Noun (اسم)',
    ipa: '/ˈfluːənsi/',
    meaningAr: 'الطلاقة، الفصاحة، الانسيابية في التحدث والكتابة',
    category: 'التعلم والتواصل',
    exampleSentenceEn: 'Her goal is to achieve speaking fluency before travelling abroad.',
    exampleSentenceAr: 'هدفها هو الوصول إلى طلاقة التحدث قبل السفر للخارج.',
    collocations: ['spoken fluency', 'gain fluency', 'language fluency'],
    audioNotesAr: 'فلوينسي تعني الطلاقة والقدرة على التعبير بسلاسة دون تردد.'
  },
  {
    id: 'vocab-3',
    level: 'beginner',
    word: 'Accomplish',
    partOfSpeech: 'Verb (فعل)',
    ipa: '/əˈkʌmplɪʃ/',
    meaningAr: 'ينجز، يحقق، يتمم عملاً بنجاح',
    category: 'النجاح والعمل',
    exampleSentenceEn: 'With clear focus, you can accomplish your academic goals.',
    exampleSentenceAr: 'مع التركيز الواضح، يمكنك إنجاز أهدافك الأكاديمية وتحقيقها.',
    collocations: ['accomplish a task', 'accomplish goals'],
    audioNotesAr: 'أكومبليش فعل قوي يعبر عن إتمام المهام والأهداف بنجاح.'
  },
  {
    id: 'vocab-4',
    level: 'beginner',
    word: 'Opportunity',
    partOfSpeech: 'Noun (اسم)',
    ipa: '/ˌɒpəˈtjuːnəti/',
    meaningAr: 'فرصة سانحة، إمكانية مواتية',
    category: 'المستقبل والفرص',
    exampleSentenceEn: 'Learning English creates new career opportunities worldwide.',
    exampleSentenceAr: 'تعلم اللغة الإنجليزية يفتح فرصاً وظيفية جديدة حول العالم.',
    collocations: ['golden opportunity', 'seize an opportunity'],
    audioNotesAr: 'أوبورتشيونيتي تعني الفرصة السانحة، وانتبه لنطقها المتدرج.'
  },

  // INTERMEDIATE
  {
    id: 'vocab-5',
    level: 'intermediate',
    word: 'Perseverance',
    partOfSpeech: 'Noun (اسم)',
    ipa: '/ˌpɜːsɪˈvɪərəns/',
    meaningAr: 'المثابرة، الإصرار، الصمود رغم الصعاب',
    category: 'التطوير الذاتي',
    exampleSentenceEn: 'Perseverance in the face of setbacks is essential for mastering grammar.',
    exampleSentenceAr: 'المثابرة عند مواجهة العقبات ضرورية لإتقان قواعد اللغة.',
    collocations: ['show perseverance', 'sheer perseverance'],
    audioNotesAr: 'بيرسيفيرَنس تعني الإصرار والمثابرة وعدم الاستسلام عند مواجهة التحديات.'
  },
  {
    id: 'vocab-6',
    level: 'intermediate',
    word: 'Elaborate',
    partOfSpeech: 'Verb & Adjective (فعل وصفة)',
    ipa: '/ɪˈlæbəreɪt/',
    meaningAr: 'يفصّل، يوضح بإسهاب / مفصّل ودقيق',
    category: 'الأكاديميا والشرح',
    exampleSentenceEn: 'Could you please elaborate on the difference between these two tenses?',
    exampleSentenceAr: 'هل يمكنك التفضل بالتفصيل في الفرق بين هذين الزمنين؟',
    collocations: ['elaborate further', 'elaborate plan'],
    audioNotesAr: 'إلابورايت كلمة مستخدمة بكثرة في البيئات التعليمية لطلب مزيد من التوضيح والتفصيل.'
  },
  {
    id: 'vocab-7',
    level: 'intermediate',
    word: 'Compelling',
    partOfSpeech: 'Adjective (صفة)',
    ipa: '/kəmˈpelɪŋ/',
    meaningAr: 'مقنع للغاية، آسر، لا يقاوم',
    category: 'الكتابة والإقناع',
    exampleSentenceEn: 'The student provided a compelling argument supported by solid evidence.',
    exampleSentenceAr: 'قدم الطالب حجة مقنعة للغاية ومدعومة بأدلة متينة.',
    collocations: ['compelling evidence', 'compelling story', 'compelling reason'],
    audioNotesAr: 'كومبيلينج صفة تعبر عن شيء مقنع يجذب الانتباه بشدة.'
  },
  {
    id: 'vocab-8',
    level: 'intermediate',
    word: 'Substantial',
    partOfSpeech: 'Adjective (صفة)',
    ipa: '/səbˈstænʃəl/',
    meaningAr: 'كبير، جوهري، ذو قيمة وحجم ملموس',
    category: 'البيانات والأكاديميا',
    exampleSentenceEn: 'He made substantial progress in his English vocabulary this month.',
    exampleSentenceAr: 'أحرز تقدماً جوهرياً وملموساً في حصيلته اللغوية الإنجليزية هذا الشهر.',
    collocations: ['substantial growth', 'substantial amount'],
    audioNotesAr: 'سبستانشَل كلمة راقية تعبر عن المقدار الملموس والكبير.'
  },

  // ADVANCED
  {
    id: 'vocab-9',
    level: 'advanced',
    word: 'Articulate',
    partOfSpeech: 'Verb & Adjective (فعل وصفة)',
    ipa: '/ɑːˈtɪkjələt/',
    meaningAr: 'بليغ، فصيح، يعبر عن أفكاره بدقة وإتقان',
    category: 'البلاغة والخطابة',
    exampleSentenceEn: 'An articulate communicator expresses complex ideas with exceptional clarity.',
    exampleSentenceAr: 'المتحدث البليغ يعبر عن الأفكار المعقدة بوضوح استثنائي وسلاسة.',
    collocations: ['highly articulate', 'articulate speaker'],
    audioNotesAr: 'آرتيكيوليت تدل على أعلى درجات الفصاحة والقدرة على صياغة المعاني بدقة متناهية.'
  },
  {
    id: 'vocab-10',
    level: 'advanced',
    word: 'Paradigm',
    partOfSpeech: 'Noun (اسم)',
    ipa: '/ˈpærədaɪm/',
    meaningAr: 'نموذج فكري، نمط إدراكي، منهجية عامة',
    category: 'الفلسفة والعلوم',
    exampleSentenceEn: 'This innovative platform introduces a paradigm shift in autonomous language learning.',
    exampleSentenceAr: 'تقدم هذه المنصة المبتكرة تحولاً جذرياً في النموذج الفكري للتعلم الذاتي للغات.',
    collocations: ['paradigm shift', 'dominant paradigm'],
    audioNotesAr: 'بارادايم تعني النموذج الفكري الشامل، ونطق الحرفين جي وإم يأتي خفيفاً كـ دايم.'
  },
  {
    id: 'vocab-11',
    level: 'advanced',
    word: 'Eloquent',
    partOfSpeech: 'Adjective (صفة)',
    ipa: '/ˈeləkwənt/',
    meaningAr: 'فصيح ومؤثر، بليغ ومقنع في الأسلوب والتعبير',
    category: 'الأدب والأسلوب',
    exampleSentenceEn: 'The scholar delivered an eloquent lecture on literary analysis.',
    exampleSentenceAr: 'ألقى الباحث محاضرة بليغة ومؤثرة عن التحليل الأدبي والنقدي.',
    collocations: ['eloquent speech', 'eloquent silence'],
    audioNotesAr: 'إلوكوينت تعني الفصاحة البالغة المؤثرة في نفوس السامعين.'
  },
  {
    id: 'vocab-12',
    level: 'advanced',
    word: 'Ubiquitous',
    partOfSpeech: 'Adjective (صفة)',
    ipa: '/juːˈbɪkwɪtəs/',
    meaningAr: 'واسع الانتشار، حاضر في كل مكان وزمان',
    category: 'المفردات الأكاديمية العليا',
    exampleSentenceEn: 'Smart mobile devices have become ubiquitous in modern classrooms.',
    exampleSentenceAr: 'أصبحت الأجهزة الذكية المحمولة واسعة الانتشار وموجودة في كل الفصول الحديثة.',
    collocations: ['ubiquitous presence', 'ubiquitous technology'],
    audioNotesAr: 'يوبيكويتَس كلمة أكاديمية فخمة تصف الشيء المتواجد في كل مكان في نفس الوقت.'
  }
];

export const TRAINING_PRESETS = [
  {
    label: 'تصحيح زمن الماضي والظرف',
    text: 'He go to school yesterday with his brother.',
    level: 'مبتدئ',
    focusAr: 'توافق الفعل مع الظرف الزمني في الماضي'
  },
  {
    label: 'تصحيح أفعال الكينونة مع agree',
    text: 'I am agree with your opinion because it is good.',
    level: 'مبتدئ',
    focusAr: 'الخلط الشائع بين verb to be والفعل agree'
  },
  {
    label: 'تصحيح توافق الفاعل والمفرد (s)',
    text: 'She like studying English every night in room.',
    level: 'متوسط',
    focusAr: 'توافق الفاعل المفرد الغائب وأدوات التعريف'
  },
  {
    label: 'تصحيح ازدواجية الروابط (Although... but)',
    text: 'Although he worked hard, but he failed the exam.',
    level: 'متوسط',
    focusAr: 'تجنب وضع رابطين للتناقض في نفس الجملة'
  },
  {
    label: 'تحسين الصياغة إلى نبرة أكاديمية راقية',
    text: 'People think that technology is very good for learning.',
    level: 'متقدم',
    focusAr: 'الارتقاء بالمفردات وصياغة رأي بحثي موضوعي'
  },
  {
    label: 'إدخال جملة عربية للترجمة والتحليل',
    text: 'يجب على الطلاب مراجعة الدروس بانتظام لتحقيق النجاح.',
    level: 'تدريب عام',
    focusAr: 'صياغة الجمل الإنجليزية المقابلة بأفضل تركيب نحوي'
  }
];

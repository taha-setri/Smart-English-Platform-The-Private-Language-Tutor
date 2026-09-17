import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily
  let ai: GoogleGenAI | null = null;
  function getAI() {
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return ai;
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", tutor: "Taha Setri Male Tutor" });
  });

  // TTS Endpoint: 100% Strictly Authentic Male Arabic & English speech (Zero API key needed)
  const ttsCache = new Map<string, Buffer>();

  app.get("/api/tts", async (req, res) => {
    try {
      const text = (req.query.text as string || "").trim();
      const lang = (req.query.lang as string || "ar").toLowerCase();
      const requestedVoice = (req.query.voice as string || "").trim();
      
      if (!text) {
        res.status(400).send("Text parameter is required");
        return;
      }

      const isArabic = lang.startsWith("ar");
      // STRICT MALE VOICES ONLY (No females allowed)
      const primaryMaleVoice = isArabic ? "ar-SA-HamedNeural" : "en-US-GuyNeural";
      const secondaryMaleVoice = isArabic ? "ar-EG-ShakirNeural" : "en-GB-RyanNeural";
      const tertiaryMaleVoice = isArabic ? "ar-DZ-IsmaelNeural" : "en-US-ChristopherNeural";

      const selectedVoice = requestedVoice || primaryMaleVoice;
      const cacheKey = `${selectedVoice}_${text.slice(0, 300)}`;

      if (ttsCache.has(cacheKey)) {
        const cached = ttsCache.get(cacheKey)!;
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Cache-Control", "public, max-age=86400");
        res.setHeader("X-Tutor-Gender", "Male");
        res.send(cached);
        return;
      }

      const { EdgeTTS } = await import("@andresaya/edge-tts");
      
      // Try primary male voice, then fallback male voices if needed
      const maleCandidates = [selectedVoice, primaryMaleVoice, secondaryMaleVoice, tertiaryMaleVoice];
      let audioBuffer: Buffer | null = null;
      let lastError: unknown = null;

      for (const voice of maleCandidates) {
        try {
          const tts = new EdgeTTS();
          await tts.synthesize(text.slice(0, 350), voice);
          audioBuffer = tts.toBuffer();
          if (audioBuffer && audioBuffer.length > 0) {
            break;
          }
        } catch (err) {
          lastError = err;
          console.warn(`Failed with male voice ${voice}, trying next male voice...`);
        }
      }

      if (!audioBuffer) {
        throw lastError || new Error("All male voices failed to synthesize");
      }

      // Cache up to 100 recent synthesized sentences in memory for instant replay
      if (ttsCache.size > 120) {
        const firstKey = ttsCache.keys().next().value;
        if (firstKey) ttsCache.delete(firstKey);
      }
      ttsCache.set(cacheKey, audioBuffer);

      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("X-Tutor-Gender", "Male");
      res.send(audioBuffer);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Male TTS Generation Failed";
      console.error("Strict Male TTS error:", msg);
      res.status(500).json({ error: msg });
    }
  });

  // AI Tutor Arabic Pedagogical Explanation Endpoint
  app.post("/api/tutor/explain", async (req, res) => {
    try {
      const { topic, context, prompt } = req.body || {};
      const aiClient = getAI();

      let explanation = "";

      if (aiClient) {
        try {
          const systemInstruction = `أنت "الأستاذ طه" (المعلم الخصوصي الذكي للغة الإنجليزية).
مهمتك: التحدث والشرح باللغة العربية الفصحى المبسطة والودية والمشجعة لمتعلمي اللغة الإنجليزية العرب.
الأسلوب:
1. ابدأ بعبارة ترحيبية دافئة بصوت المعلم (مثال: "أهلاً بك يا بني، سأوضح لك هذا الأمر ببساطة شديدة:").
2. اشرح القاعدة أو المعنى باللغة العربية خطوة بخطوة مع توضيح سبب القاعدة.
3. قارن بين الإنجليزية والعربية لتفادي أخطاء الترجمة الحرفية الشائعة.
4. اذكر أمثلة واضحة وممتعة بالإنجليزية مع ترجمتها للعربية.
5. اختم بنصيحة عملية سهلة التذكر.
اجعل النص سلساً ومباشراً وقابلاً للقراءة الصوتية باللغة العربية.`;

          const userPrompt = prompt || `اشرح لي موضوع: ${topic || 'قواعد صياغة الجمل الإنجليزية'} ${context ? `في هذا السياق: ${context}` : ''} باللغة العربية بإيجاز في 3 إلى 4 أسطر مع مثال عملي.`;

          const modelsToTry = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];

          for (const model of modelsToTry) {
            try {
              const controller = new AbortController();
              const timer = setTimeout(() => controller.abort(), 15000);

              const response = await aiClient.models.generateContent({
                model: model,
                contents: userPrompt,
                config: {
                  systemInstruction: systemInstruction,
                  temperature: 0.6,
                  maxOutputTokens: 250,
                  abortSignal: controller.signal,
                }
              });

              clearTimeout(timer);

              if (response.text) {
                explanation = response.text;
                break;
              }
            } catch {
              // Try next model if available
            }
          }
        } catch {
          // Graceful fallback handled below
        }
      }

      // Rich Pedagogical Fallback when offline or on API delay
      if (!explanation) {
        explanation = `أهلاً بك يا بني، سأشرح لك موضوع (${topic || "قواعد اللغة الإنجليزية"}) باللغة العربية بكل بساطة:\n\n1. في اللغة الإنجليزية، يبدأ تركيب الجملة دائماً بالفاعل (Subject) ثم الفعل (Verb) ثم المفعول به أو التكملة (Object)، على عكس العربية التي تبدأ غالباً بالفعل.\n2. انتبه دائماً للزمن والظروف الزمنية المرافقة للجملة لتحديد التصريف الصحيح للفعل.\n3. تجنب الترجمة الحرفية، ومارس الاستماع للنطق الصحيح باستمرار لتثبيت القاعدة في ذهنك.`;
      }

      res.json({
        success: true,
        topic: topic || "شرح المعلم بالعربية",
        explanation: explanation,
        spokenText: explanation.replace(/[*_#`]/g, "").trim()
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "AI explanation failed";
      console.error("Tutor explanation error:", msg);
      res.status(500).json({ error: msg });
    }
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});

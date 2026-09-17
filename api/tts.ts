// Vercel Serverless Function for 100% Strictly Authentic Male Arabic & English TTS
export default async function handler(req: any, res: any) {
  try {
    const query = req.query || {};
    const text = (query.text as string || "").trim();
    const lang = (query.lang as string || "ar").toLowerCase();
    const requestedVoice = (query.voice as string || "").trim();

    if (!text) {
      res.status(400).send("Text parameter is required");
      return;
    }

    const isArabic = lang.startsWith("ar");
    // STRICT MALE VOICES ONLY
    const primaryMaleVoice = isArabic ? "ar-SA-HamedNeural" : "en-US-GuyNeural";
    const secondaryMaleVoice = isArabic ? "ar-EG-ShakirNeural" : "en-GB-RyanNeural";
    const tertiaryMaleVoice = isArabic ? "ar-DZ-IsmaelNeural" : "en-US-ChristopherNeural";

    const selectedVoice = requestedVoice || primaryMaleVoice;

    const { EdgeTTS } = await import("@andresaya/edge-tts");
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
      }
    }

    if (!audioBuffer) {
      throw lastError || new Error("Male voice synthesis failed");
    }

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("X-Tutor-Gender", "Male");
    res.status(200).send(audioBuffer);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Male TTS Generation Failed";
    res.status(500).json({ error: msg });
  }
}

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

const app = express();
app.use(express.json({ limit: '5mb' }));

// Lazy initializer for Gemini Client as recommended in instructions
let ai: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set. Please add it in the Secrets panel in AI Studio settings.');
    }
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// Full-stack server side evaluation endpoint
app.post('/api/grade', async (req, res) => {
  try {
    const { testId, studentId, studentName, recallAttempts, emailText } = req.body;

    if (!recallAttempts || !emailText) {
      return res.status(400).json({ error: 'Missing recallAttempts or emailText' });
    }

    const client = getGeminiClient();

    // Construct the grading prompt
    const systemPrompt = `You are an expert examiner for the Tata Consultancy Services (TCS) Verbal Ability exam. 
Your task is to accurately grade the student's responsive components (Passage Recall and Email Writing) under strict guidelines.
Be strict but fair. The marking scheme matches the TCS standards.

For Passage Recall (Max 10 per passage):
- Grade each of the passages based on how well the student captured the original concepts, keywords, and semantic facts from the original passage.
- Deduced score from 0 to 10.
- Provide a summary of remembered elements vs forgotten elements, and suggestions for improvement.

For Email Writing (Max 10):
- Grade the email based on:
  1. Structure (Proper clear Greeting/Salutation, Body Paragraphs, and Professional sign-off / Signature).
  2. Grammar, Spelling, and Coherence.
  3. Fulfillment of the prompt situation constraints (Did they mention registration details? Follow rules? State details clearly?).
- Score from 0 to 10.
- Provide clear bullet points of strengths and target areas for improvement.

Must respond ONLY in flat JSON with the specified schema matching the structured feedback.`;

    const instructionsPrompt = `Please grade the following response for Student '${studentId}' (${studentName || 'Anonymous'}).

Original Passages and Student's Attempted Recalls:
${recallAttempts.map((item: any, idx: number) => `
--- PASSAGE RECALL ${idx + 1} ---
Original Passage: "${item.originalPassage}"
Student's Recall: "${item.studentRecallText || '[No written response or time expired]'}"
`).join('\n')}

--- EMAIL WRITING ---
Email Prompt Situation: "${emailText.situation}"
Email Task Prompt: "${emailText.task}"
Student's Email Text:
"${emailText.studentEmailText || '[No written response or time expired]'}"

Provide a detailed evaluation in JSON format containing scores and detailed feedback. Make sure your JSON output is perfect and matches the required structure.`;

    // Query Gemini 3.5 Flash server side and expect standard JSON
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: instructionsPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["passagesGrading", "emailGrading", "overallSummary"],
          properties: {
            passagesGrading: {
              type: Type.ARRAY,
              description: "Array of grades for the passage recalls in sequence.",
              items: {
                type: Type.OBJECT,
                required: ["id", "score", "rememberedKeyPoints", "missedKeyPoints", "suggestions"],
                properties: {
                  id: { type: Type.INTEGER, description: "Passage number (1 to 4)" },
                  score: { type: Type.NUMBER, description: "Score out of 10" },
                  rememberedKeyPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific points or phrases remembered correctly" },
                  missedKeyPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Core points or phrases from original that were omitted" },
                  suggestions: { type: Type.STRING, description: "Concise feedback for getting better recall accuracy next time" }
                }
              }
            },
            emailGrading: {
              type: Type.OBJECT,
              required: ["score", "grammarScore", "structureScore", "strengths", "improvements", "detailedReview"],
              description: "Detailed evaluation of Email Writing",
              properties: {
                score: { type: Type.NUMBER, description: "Total email score out of 10" },
                grammarScore: { type: Type.NUMBER, description: "Grammar & Vocabulary score out of 3" },
                structureScore: { type: Type.NUMBER, description: "Format/Structure score out of 3 (Salutation, body, sign-off)" },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Strong elements of written email" },
                improvements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Constructive feedback on errors or missing parts" },
                detailedReview: { type: Type.STRING, description: "Overall standard feedback on tone and effectiveness" }
              }
            },
            overallSummary: {
              type: Type.OBJECT,
              required: ["keyVerbalStrengths", "criticalImprovements", "customActionableTip"],
              properties: {
                keyVerbalStrengths: { type: Type.STRING, description: "Broad assessment of the student's verbal/comprehension strength" },
                criticalImprovements: { type: Type.STRING, description: "Top improvement area" },
                customActionableTip: { type: Type.STRING, description: "A warm actionable tip explicitly customizable" }
              }
            }
          }
        }
      }
    });

    const outputText = response.text?.trim() || "{}";
    const resultJson = JSON.parse(outputText);
    return res.json(resultJson);

  } catch (error: any) {
    console.error('Server grading error:', error);
    return res.status(500).json({ 
      error: 'Failed to evaluate response with AI engine.', 
      details: error?.message || 'Unknown error' 
    });
  }
});

// Provide a pre-check status config to let client UI know if key exists
app.get('/api/status', (req, res) => {
  res.json({
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Static files or Vite integration
if (!isProd) {
  // Integrate Vite Dev Server
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  // Server static build files
  const distPath = path.resolve(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on http://0.0.0.0:${PORT} in ${isProd ? 'production' : 'development'} mode.`);
});


import { GoogleGenAI, Type } from "@google/genai";
import { GEMINI_MODEL } from '../constants';
import { ExtractedSkill, AIAnalysisResult } from '../types';

const AUDIT_SYSTEM_INSTRUCTION = `
You are a World-Class Talent Intelligence Partner & DE&I Consultant for Open Talent Society.
Your job is not just to summarize, but to AUDIT, STRATEGIZE, and STANDARDIZE.

You will receive a Job Description (JD) and extracted Hard Skills.
Perform the following deep analysis:

1. **Role Persona**: Define the archetype of this hire in 2-3 words (e.g., "The Gritty Specialist").

2. **Role Vitals**: Estimate the Seniority Level and a broad Market Salary Range (USD) based on the complexity and responsibilities described.

3. **JD Health Audit**: Score Clarity (0-100) and scan for Bias/Tone.

4. **Strategic Competencies**: What crucial *Implicit Competencies* are missing? (e.g. "Stakeholder Negotiation").

5. **Interview Strategy**: Generate EXACTLY 5 behavioral questions.

Output strict JSON.
`;

export const analyzeRoleWithGemini = async (
  jobDescription: string, 
  extractedSkills: ExtractedSkill[]
): Promise<AIAnalysisResult> => {
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("Gemini API Key not found in environment.");

  const ai = new GoogleGenAI({ apiKey });

  // Prepare prompt content
  const skillNames = extractedSkills.map(s => s.skill.name).join(", ");
  const prompt = `
    JOB DESCRIPTION:
    "${jobDescription}"

    EXTRACTED LIGHTCAST SKILLS:
    ${skillNames}
  `;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: AUDIT_SYSTEM_INSTRUCTION,
        temperature: 0, // Enforce deterministic results
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rolePersona: { type: Type.STRING },
            executiveSummary: { type: Type.STRING },
            audit: {
              type: Type.OBJECT,
              properties: {
                clarityScore: { type: Type.INTEGER },
                clarityReasoning: { type: Type.STRING },
                biasFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
                tone: { type: Type.STRING }
              },
              required: ["clarityScore", "clarityReasoning", "biasFlags", "tone"]
            },
            roleVitals: {
              type: Type.OBJECT,
              properties: {
                estimatedSalary: { type: Type.STRING },
                seniorityLevel: { type: Type.STRING }
              },
              required: ["estimatedSalary", "seniorityLevel"]
            },
            impliedSoftSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            interviewGuide: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  question: { type: Type.STRING },
                  rationale: { type: Type.STRING }
                },
                required: ["skill", "question", "rationale"]
              }
            }
          },
          required: ["rolePersona", "executiveSummary", "audit", "roleVitals", "impliedSoftSkills", "interviewGuide"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

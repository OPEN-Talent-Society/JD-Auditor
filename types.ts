
// Lightcast API Types
export interface LightcastTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface LightcastSkill {
  id: string;
  name: string;
  type?: string; 
  category?: {
    id: string;
    name: string;
  };
}

export interface ExtractedSkill {
  skill: LightcastSkill;
  confidence: number; // 0-1 provided by API
}

export interface LightcastExtractionResponse {
  data: Array<{
    skill: LightcastSkill;
    confidence: number;
  }>;
}

// Gemini Analysis Types
export interface InterviewQuestion {
  skill: string;
  question: string;
  rationale: string;
}

export interface JDAudit {
  clarityScore: number; // 0-100
  clarityReasoning: string;
  biasFlags: string[]; // e.g. "Masculine-coded language: 'Ninja'"
  tone: string;
}

export interface RoleVitals {
  estimatedSalary: string; // e.g. "$120k - $150k"
  seniorityLevel: string; // e.g. "Mid-Senior Level"
}

export interface AIAnalysisResult {
  rolePersona: string; // e.g. "The Strategic Builder"
  executiveSummary: string;
  audit: JDAudit;
  roleVitals: RoleVitals;
  impliedSoftSkills: string[];
  interviewGuide: InterviewQuestion[];
}

// App State
export interface AppState {
  status: 'idle' | 'authenticating' | 'extracting' | 'analyzing' | 'complete' | 'error';
  errorMessage?: string;
  inputText: string;
  extractedSkills: ExtractedSkill[];
  aiAnalysis: AIAnalysisResult | null;
}

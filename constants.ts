
export const APP_NAME = "The JD Auditor";

// Helper to safely access Environment Variables in both Vite and standard environments
const getEnvVar = (key: string): string => {
  // 1. Try Vite standard (import.meta.env)
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      const val = (import.meta as any).env[key];
      if (val) return val;
    }
  } catch (e) {
    // Ignore errors if import.meta is not supported
  }

  // 2. Try Node/Webpack standard (process.env)
  try {
    if (typeof process !== 'undefined' && process.env) {
      const val = process.env[key];
      if (val) return val;
    }
  } catch (e) {
    // Ignore
  }

  return '';
};

// SECURITY NOTE:
// Keys are loaded from environment variables with explicit fallbacks to ensure functionality.
export const LIGHTCAST_CONFIG = {
  // Attempt to read variables first, fall back to provided credentials if missing
  CLIENT_ID: getEnvVar('VITE_LIGHTCAST_CLIENT_ID') || "vawkzfb8w2hdb7ng", 
  SECRET: getEnvVar('VITE_LIGHTCAST_SECRET') || "6gCVkBIl",
  SCOPE: "emsi_open",
  AUTH_URL: "https://auth.emsicloud.com/connect/token",
  BASE_URL: "https://emsiservices.com/skills/versions/latest",
};

export const GEMINI_MODEL = "gemini-2.5-flash";

export const HR_DAD_JOKES = [
  "Why did the Sourcer cross the road? To bypass the gatekeeper.",
  "Recruiting is easy. It’s like riding a bike. Except the bike is on fire. You are on fire. Everything is on fire.",
  "Why did the Boolean string break up with the job description? It was too restrictive.",
  "A People Analytics pro walks into a bar. The bartender asks, 'What can I get you?' The analyst says, 'I need to see the consumption data first.'",
  "Why don't L&D Managers tell secrets? Because they believe in knowledge sharing.",
  "Knock knock. Who's there? GDPR. GDPR who? We will get back to you within 30 days regarding this request.",
  "Why did the ATS get promoted? It successfully parsed the CEO's resume.",
  "What's a Recruiter's favorite workout? Jumping to conclusions about salary expectations.",
  "Why did the Compensation Analyst bring a ladder? To check the salary bands.",
  "How do you know a Headhunter is at your party? Don't worry, they'll find you.",
  "Why did the Pivot Table go to therapy? It had too many dimension issues.",
  "What is an HR Business Partner's favorite game? 'Risk'.",
  "Why did the Onboarding Specialist get lost? The roadmap wasn't updated.",
  "Why did the Job Description go to the doctor? It had a bloated scope.",
  "I told a joke about unemployment at the office... but it didn't work.",
  "Why did the Talent Intelligence manager buy a crystal ball? Because the workforce planning model was broken.",
  "What's a Sourcer's favorite horror movie? 'The Silence of the Candidates'.",
  "Why did the Diversity Inclusion officer sit at a round table? So no one could be cornered.",
  "Why are Recruiters terrible at hide and seek? They always leave a paper trail.",
  "Why did the Employee Handbook break up with the Policy Manual? Lack of alignment.",
  "What's the difference between a Recruiter and a Car Salesman? The car salesman knows when to stop selling.",
  "Why did the Hiring Manager stare at the frozen orange juice? Because the can said 'Concentrate'.",
  "Why did the spreadsheet have a panic attack? It lost its reference.",
  "Why do People Ops love elevators? They are great at lifting morale.",
  "What do you call a Data Scientist in HR? A 'Predictive' Person.",
  "Why was the Offer Letter nervous? It had too many contingencies.",
  "Why did the CHRO bring a compass? To navigate the organizational matrix.",
  "Why did the Exit Interview feel awkward? It was a one-way conversation.",
  "What's a Talent Acquisition Leader's favorite sport? Relay races... lots of handoffs.",
  "Why did the candidate bring a shovel? To dig into the company culture.",
  "Why did the benefits package go to the gym? To get more robust.",
  "Why don't HR pros play poker? They have too many tells... and NDAs.",
  "Why did the recruiter start a garden? To grow their pipeline.",
  "What's a Sourcer's favorite fruit? Dates... specifically start dates.",
  "Why did the resume cross the road? To get to the other side of the ATS.",
  "Why did the interview go until midnight? They were looking for a star.",
  "What do you call an HR meeting without coffee? Depresso.",
  "Why did the purple squirrel stay home? It knew it was unicorn hunting season.",
  "Why did the compliance officer refuse to dance? They didn't want to step out of line.",
  "Why did the payroll specialist get a telescope? To see the net pay.",
  "Why did the background check take so long? It had a lot of history to cover.",
  "Why did the org chart feel lonely? It had no direct reports.",
  "Why did the recruiter get a ticket? For speeding through the screening process.",
  "What's an L&D pro's favorite season? Fall... because that's when training budgets drop.",
  "Why did the candidate refuse the chair? They wanted to stand out.",
  "Why did the HR bot fail the Turing test? It lacked empathy.",
  "Why did the succession plan fail? No one wanted to follow the leader.",
  "Why did the retention strategy go to the beach? To stop the churn.",
  "What do you call a recruiter who doesn't use LinkedIn? Invisible.",
  "Why did the job offer get cold feet? It wasn't signed immediately.",
  "Why did the workforce planner get glasses? To improve their foresight.",
  "Why did the HR dashboard break up with the database? Bad connection.",
  "What's a sourcer's favorite type of fish? Headhunters.",
  "Why did the training module get an award? It had great engagement.",
  "Why are HR generalists good at baseball? They cover all the bases.",
  "Why did the recruiter wear sunglasses? Because the future talent is bright.",
  "Why did the candidate ghost the interview? They saw right through the culture.",
  "What's an HR manager's favorite drink? Penal-tea.",
  "Why did the spreadsheet go on a date? It wanted to find a match.",
  "Why did the employee bring a ladder to the review? To reach their goals.",
  "Why did the recruiter buy a boat? To navigate the talent pool.",
  "Why did the HR director go to art school? To learn how to draw better conclusions.",
  "Why did the policy document get locked out? It expired.",
  "Why did the intern bring a map? To find their career path."
];

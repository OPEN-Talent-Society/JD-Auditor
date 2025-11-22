
# The JD Auditor - Open Talent Intelligence

**Powered by Open Talent Society**

The JD Auditor (formerly SkillLens) is a strategic intelligence tool designed for the **People Industry** (HR, Talent Acquisition, L&D, People Analytics). 

It goes beyond simple keyword matching. By combining the **Lightcast Open Skills Taxonomy** with **Google Gemini's** reasoning engine, it audits job descriptions for bias, clarity, and strategic alignment, turning unstructured text into actionable data.

## 🌲 About Open Talent Society

**Together We Grow.**

The People Industry is where the future of work and labor takes shape. We believe the only way to meet this challenge and opportunity is together.

We are a nonprofit and open source community of practice, dedicated to mutual support and growth. People pros (HR, TA, L&D, People Ops) learn and create with engineers, designers, researchers, and marketers. Everyone here is a builder in their own way.

[Visit opentalentsociety.org](https://opentalentsociety.org)

---

## 🚀 Capabilities

### 1. Strategic Audit
*   **Clarity Scoring**: Quantitative assessment (0-100) of role definition and transparency.
*   **Bias & Tone Detector**: Identifies exclusionary language, gender-coding, and corporate clichés to ensure inclusive hiring.

### 2. Talent Intelligence
*   **Persona Generation**: Identifies the specific archetype (e.g., "The Strategic Builder") needed for the role.
*   **Role Vitals**: AI-estimated **Seniority Level** and **Market Salary Bands** based on responsibilities.

### 3. Taxonomy & Skills
*   **Standardization**: Maps messy JD text to the global **Lightcast Open Skills Taxonomy**.
*   **Confidence Scoring**: Visualizes how strongly the API matches specific terms.

### 4. Actionable Strategy
*   **Implicit Competencies**: Reveals the "unspoken" soft skills required for success (e.g., "Stakeholder Negotiation").
*   **Interview Guide**: Generates behavioral questions specifically targeting the identified competencies.

### 5. Reporting
*   **Bento Grid Dashboard**: A visually structured, data-dense workspace.
*   **PDF Export**: Professional print-ready reports for hiring managers.

## 🛠️ Tech Stack

*   **Framework**: React 18 (Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS (Ghost Theme Integration)
*   **AI Models**: Google Gemini 2.5 Flash
*   **Data**: Lightcast Open Skills API

## ⚙️ Setup & Configuration

### 1. Prerequisites
*   Node.js (v18+)
*   A Lightcast API Client ID & Secret
*   A Google Gemini API Key

### 2. Environment Variables
**IMPORTANT:** You must create a `.env` file in the root directory.

```env
# Google Gemini API Key
API_KEY=your_key

# Lightcast Open Skills Credentials
VITE_LIGHTCAST_CLIENT_ID=your_id
VITE_LIGHTCAST_SECRET=your_secret
```

## 📜 License

Open Source / MIT

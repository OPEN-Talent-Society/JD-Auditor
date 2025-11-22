import React, { useState } from 'react';
import { ArrowRight, Wand2, FileText, Layers, BrainCircuit, Target, HeartHandshake, Stethoscope } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [inputVal, setInputVal] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSubmit(inputVal);
    }
  };

  const fillExample = () => {
    const example = `Senior Product Designer
    
We are looking for a thoughtful Senior Product Designer to join our core experience team. You will be responsible for the end-to-end design of our main dashboard.
    
Requirements:
- 5+ years of experience with Figma and prototyping tools.
- Deep understanding of UX research methods.
- Ability to write clear documentation.
- Experience mentoring junior designers is a must.
- We need a design rockstar who can crush deadlines and dominate the UI space.`;
    setInputVal(example);
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-8 md:mt-16 px-4 animate-in fade-in zoom-in-95 duration-700 pb-20" aria-labelledby="hero-heading">
      
      {/* Header Copy */}
      <div className="text-center mb-12 space-y-6">
        <h2 id="hero-heading" className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight font-poppins leading-tight">
          Decode the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1b4d3e] to-emerald-600">Role.</span>
        </h2>
        <p className="text-lg md:text-2xl text-slate-700 font-normal max-w-3xl mx-auto leading-relaxed">
          Don't just read a Job Description—<strong>audit it.</strong> We combine Lightcast's industry-standard taxonomy with Gemini's reasoning engine to give you a strategic advantage.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-[#1b4d3e]/20 hover:shadow-md transition-all duration-300">
          <div className="bg-blue-50 p-4 rounded-xl mb-4 group-hover:bg-[#1b4d3e]/10 transition-colors">
            <Layers className="w-6 h-6 text-blue-700 group-hover:text-[#1b4d3e]" />
          </div>
          <h3 className="font-bold font-poppins text-slate-900 text-lg mb-3">Standardize Skills</h3>
          <p className="text-base text-slate-600 leading-relaxed">Map messy text to the global Lightcast Open Skills Taxonomy.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-[#1b4d3e]/20 hover:shadow-md transition-all duration-300">
          <div className="bg-violet-50 p-4 rounded-xl mb-4 group-hover:bg-[#1b4d3e]/10 transition-colors">
            <Stethoscope className="w-6 h-6 text-violet-700 group-hover:text-[#1b4d3e]" />
          </div>
          <h3 className="font-bold font-poppins text-slate-900 text-lg mb-3">Audit Health & Bias</h3>
          <p className="text-base text-slate-600 leading-relaxed">Score clarity, detect tone, and flag exclusionary language.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-[#1b4d3e]/20 hover:shadow-md transition-all duration-300">
          <div className="bg-amber-50 p-4 rounded-xl mb-4 group-hover:bg-[#1b4d3e]/10 transition-colors">
            <BrainCircuit className="w-6 h-6 text-amber-700 group-hover:text-[#1b4d3e]" />
          </div>
          <h3 className="font-bold font-poppins text-slate-900 text-lg mb-3">Reveal the Persona</h3>
          <p className="text-base text-slate-600 leading-relaxed">Identify the archetype, estimate vitals, and generate interview strategy.</p>
        </div>
      </div>

      {/* Input Form */}
      <form 
        onSubmit={handleSubmit} 
        className={`
          relative group bg-white rounded-3xl transition-all duration-500 mb-32
          ${isFocused ? 'shadow-2xl shadow-[#1b4d3e]/15 ring-2 ring-[#1b4d3e]/30' : 'shadow-xl shadow-slate-200/60 border border-slate-200'}
        `}
      >
        <div className="p-2">
          <div className="relative">
            <label htmlFor="jd-input" className="sr-only">Job Description Input</label>
            <textarea
              id="jd-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-72 p-6 md:p-10 text-slate-800 placeholder-slate-400 text-lg md:text-xl bg-transparent border-none focus:ring-0 resize-none outline-none font-normal leading-relaxed rounded-2xl"
              placeholder="Paste a Job Description, Scope of Work, or Resume here to begin..."
              disabled={isLoading}
            />
            
            <div className="absolute bottom-4 right-4 pointer-events-none">
              <span className={`text-sm font-mono font-bold transition-colors ${inputVal.length > 0 ? 'text-slate-500' : 'text-transparent'}`}>
                {inputVal.length} chars
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 px-6 py-5 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 rounded-b-3xl gap-4">
          <button
            type="button"
            onClick={fillExample}
            disabled={isLoading}
            className="text-base font-bold text-slate-600 hover:text-[#1b4d3e] transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#1b4d3e]/5 w-full md:w-auto justify-center md:justify-start focus:outline-none focus:ring-2 focus:ring-[#1b4d3e]/20"
          >
            <FileText className="w-5 h-5" aria-hidden="true" />
            Try with Example
          </button>

          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className={`
              w-full md:w-auto relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 shadow-lg
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b4d3e]
              ${!inputVal.trim() || isLoading 
                ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-[#1b4d3e] hover:bg-[#143d30] hover:shadow-[#1b4d3e]/30 hover:-translate-y-0.5'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 animate-spin" /> Processing...
              </span>
            ) : (
              <>
                <span>Analyze Role</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Community Section - Refined & Centered */}
      <div className="relative rounded-[2rem] bg-[#1b4d3e] text-white overflow-hidden p-10 md:p-20 text-center shadow-2xl shadow-[#1b4d3e]/20">
         {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
             <svg className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M50 0 L100 100 L0 100 Z" fill="white" transform="rotate(0 50 50)" opacity="0.5" />
                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" fill="none" />
             </svg>
         </div>
         
         <div className="relative z-10 max-w-4xl mx-auto space-y-10 flex flex-col items-center">
            
            {/* Logo Badge */}
            <div className="bg-white p-5 rounded-2xl shadow-lg mb-2 inline-flex items-center justify-center">
               <img 
                  src="/logo.png" 
                  alt="Open Talent Society Logo" 
                  width="64"
                  height="64"
                  className="h-16 w-auto object-contain"
               />
            </div>

            <div className="inline-flex items-center gap-2.5 bg-white/10 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest border border-white/20 shadow-sm backdrop-blur-sm">
               <HeartHandshake className="w-5 h-5 text-emerald-300" />
               <span>Nonprofit Community</span>
            </div>

            <h2 className="text-4xl md:text-7xl font-poppins font-bold leading-tight tracking-tight">
               Together We Grow.
            </h2>
            
            <div className="space-y-8 text-lg md:text-2xl font-light text-emerald-50 leading-relaxed">
              <p>
                  The People Industry is where the future of work and labor takes shape. We believe the only way to meet this challenge and opportunity is <span className="font-semibold text-white border-b-2 border-emerald-400/50 pb-0.5">together</span>.
               </p>
               <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                  We are a nonprofit and open source community of practice. People pros (HR, TA, L&D) learn and create with engineers, designers, and researchers. Everyone here is a builder in their own way.
               </p>
            </div>

            <div className="pt-8">
               <a 
                  href="https://opentalentsociety.org" 
                  target="_blank" 
                  rel="noreferrer"
                  className="
                    inline-flex items-center gap-3 bg-white text-[#1b4d3e] px-10 py-5 rounded-2xl font-bold text-xl shadow-xl 
                    hover:bg-emerald-50 hover:scale-105 hover:shadow-2xl transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-white/30
                  "
               >
                  Join the Society
                  <ArrowRight className="w-6 h-6" aria-hidden="true" />
               </a>
            </div>
         </div>
      </div>

    </section>
  );
};

export default InputSection;
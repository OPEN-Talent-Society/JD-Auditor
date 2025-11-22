
import React from 'react';
import { AIAnalysisResult, ExtractedSkill } from '../types';
import { 
  Fingerprint,
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  BrainCircuit,
  Download,
  BarChart3,
  Stethoscope,
  MessageSquare,
  DollarSign,
  Briefcase
} from 'lucide-react';
import SkillsCloud from './SkillsCloud';

interface AnalysisResultsProps {
  analysis: AIAnalysisResult;
  skills: ExtractedSkill[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, skills }) => {

  const getClarityColor = (score: number) => {
    if (score >= 80) return 'text-[#1b4d3e]';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <article className="w-full max-w-7xl mx-auto pb-24 animate-in slide-in-from-bottom-8 fade-in duration-700 font-inter print:p-0 print:max-w-none">
      
      {/* --- BENTO GRID LAYOUT --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 break-inside-avoid">
        
        {/* 1. HERO CARD (Spans full width) */}
        <div className="md:col-span-12 relative bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group">
           {/* Texture & Decor */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-50 via-transparent to-transparent rounded-full opacity-60 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="bg-[#1b4d3e]/5 p-5 rounded-3xl ring-1 ring-[#1b4d3e]/10">
                 <Fingerprint className="w-14 h-14 text-[#1b4d3e]" />
              </div>
              <div className="flex-1 w-full">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-widest text-slate-500 font-poppins">
                         Identified Archetype
                      </div>
                      {/* Vitals Tags */}
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 font-inter">
                          <Briefcase className="w-3 h-3" />
                          {analysis.roleVitals.seniorityLevel}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 font-inter">
                          <DollarSign className="w-3 h-3" />
                          {analysis.roleVitals.estimatedSalary}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm hover:shadow-md no-print"
                    >
                       <Download className="w-4 h-4" />
                       Download PDF
                    </button>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-poppins font-black text-slate-900 tracking-tight mb-4 leading-[1.1]">
                   {analysis.rolePersona}
                 </h2>
                 <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-4xl font-inter">
                   {analysis.executiveSummary}
                 </p>
              </div>
           </div>
        </div>

        {/* 2. JD HEALTH AUDIT DASHBOARD */}
        <div className="md:col-span-12 bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm">
           <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
              <div className="bg-indigo-50 p-2 rounded-lg">
                 <Stethoscope className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-poppins">JD Health Audit</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Clarity */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-poppins">Clarity Score</span>
                 </div>
                 <div className={`text-7xl font-poppins font-black tracking-tighter leading-none mb-4 ${getClarityColor(analysis.audit.clarityScore)}`}>
                    {analysis.audit.clarityScore}
                 </div>
                 <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {analysis.audit.clarityReasoning}
                 </p>
              </div>

              {/* Tone */}
              <div className="flex flex-col md:pl-8 pt-8 md:pt-0">
                 <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-poppins">Detected Tone</span>
                 </div>
                 <p className="text-lg font-semibold text-slate-900 font-inter leading-relaxed italic">
                    "{analysis.audit.tone}"
                 </p>
              </div>

              {/* Bias */}
              <div className="flex flex-col md:pl-8 pt-8 md:pt-0">
                 <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-poppins">Bias Flags</span>
                 </div>
                 {analysis.audit.biasFlags.length === 0 || (analysis.audit.biasFlags.length === 1 && analysis.audit.biasFlags[0].includes('None')) ? (
                    <div className="flex items-start gap-3 text-[#1b4d3e] bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                       <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                       <span className="text-sm font-bold font-inter">Clean. No exclusionary language detected.</span>
                    </div>
                 ) : (
                    <div className="space-y-2">
                       {analysis.audit.biasFlags.map((flag, i) => (
                          <div key={i} className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 font-medium text-sm font-inter flex items-start gap-2">
                             <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" /> 
                             <span>{flag}</span>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* 3. SKILLS & COMPETENCIES SPLIT */}
        <div className="md:col-span-6 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-poppins">Explicit Taxonomy</h3>
              </div>
           </div>
           <div className="flex-grow">
               <SkillsCloud skills={skills} />
           </div>
        </div>

        <div className="md:col-span-6 bg-[#1b4d3e] rounded-[2rem] p-8 shadow-xl shadow-[#1b4d3e]/20 flex flex-col relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
           <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
              <div className="bg-white/10 p-2 rounded-lg">
                  <BrainCircuit className="w-5 h-5 text-emerald-300" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest font-poppins">Strategic Competencies</h3>
           </div>
           <div className="flex-grow relative z-10">
               <div className="flex flex-wrap gap-3">
                  {analysis.impliedSoftSkills.map((s, i) => (
                     <span key={i} className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-base text-white font-semibold font-inter backdrop-blur-md transition-colors cursor-default">
                        {s}
                     </span>
                  ))}
               </div>
           </div>
        </div>

        {/* 4. INTERVIEW GUIDE */}
        <div className="md:col-span-12 mt-4 break-inside-avoid">
           <div className="flex items-center gap-4 mb-8">
               <div className="bg-slate-900 p-2 rounded-lg text-white">
                  <MessageSquare className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-poppins font-black text-slate-900 tracking-tight uppercase">Strategic Interview Guide</h3>
               <div className="h-px flex-grow bg-slate-200"></div>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {analysis.interviewGuide.map((item, idx) => (
                 <div key={idx} className="group bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#1b4d3e]/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <div className="text-5xl font-poppins font-black text-slate-300 group-hover:text-[#1b4d3e] transition-colors duration-300 min-w-[3ch]">
                           0{idx + 1}
                        </div>
                        <div className="flex-1">
                           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest font-poppins mb-4">
                              <span>Targeting:</span>
                              <span className="text-slate-900">{item.skill}</span>
                           </div>
                           <h4 className="text-xl md:text-2xl font-poppins font-bold text-slate-800 leading-snug mb-6">
                              "{item.question}"
                           </h4>
                           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                              <p className="text-base text-slate-600 font-medium font-inter leading-relaxed">
                                 <span className="text-[#1b4d3e] font-bold mr-2 uppercase text-xs tracking-wider">Rationale:</span>
                                 {item.rationale}
                              </p>
                           </div>
                        </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>

      {/* --- FOOTER --- */}
      <div className="mt-24 pb-8 flex justify-center opacity-100 no-print">
         <a 
           href="https://opentalentsociety.org" 
           target="_blank" 
           rel="noreferrer"
           className="hover:opacity-80 transition-opacity"
         >
            <img 
              src="/logo.png" 
              alt="Open Talent Society"
              width="64"
              height="64" 
              className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
            />
         </a>
      </div>
    </article>
  );
};

export default AnalysisResults;

import React from 'react';
import { ExtractedSkill } from '../types';

interface SkillsCloudProps {
  skills: ExtractedSkill[];
}

const SkillsCloud: React.FC<SkillsCloudProps> = ({ skills }) => {
  if (skills.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 italic font-inter">
        No explicit skills detected in this text.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300 h-full content-start">
      {skills.map((item) => {
        const confidencePct = Math.round(item.confidence * 100);
        const isHighConfidence = item.confidence > 0.8;

        return (
          <div 
            key={item.skill.id}
            className={`
              group flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl text-base font-semibold
              border transition-all duration-200 cursor-default
              ${isHighConfidence 
                ? 'bg-slate-50 border-slate-200 text-slate-800 hover:border-[#1b4d3e]/40 hover:bg-emerald-50/30' 
                : 'bg-slate-50/50 border-slate-100 text-slate-600 hover:border-slate-300'}
            `}
          >
            <span className="font-inter">{item.skill.name}</span>
            <div 
              className={`
                flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold font-mono
                ${isHighConfidence ? 'bg-emerald-100 text-[#1b4d3e]' : 'bg-slate-200 text-slate-500'}
              `}
              title={`Confidence Score: ${confidencePct}%`}
            >
              {confidencePct}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsCloud;
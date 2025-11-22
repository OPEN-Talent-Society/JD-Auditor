
import React, { useState } from 'react';
import HeroHeader from './components/HeroHeader';
import InputSection from './components/InputSection';
import AnalysisResults from './components/AnalysisResults';
import LoadingOverlay from './components/LoadingOverlay';
import { extractSkillsFromText } from './services/lightcastService';
import { analyzeRoleWithGemini } from './services/geminiService';
import { AppState } from './types';
import { XCircle, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: 'idle',
    inputText: '',
    extractedSkills: [],
    aiAnalysis: null,
  });

  const handleAnalysis = async (input: string) => {
    setState(prev => ({ ...prev, status: 'authenticating', inputText: input, errorMessage: undefined }));

    try {
      // Step 1: Extract Skills
      setState(prev => ({ ...prev, status: 'extracting' }));
      const skills = await extractSkillsFromText(input);
      
      // Step 2: AI Analysis (Get Insights)
      setState(prev => ({ ...prev, status: 'analyzing', extractedSkills: skills }));
      const analysis = await analyzeRoleWithGemini(input, skills);

      // Transition to complete
      setState(prev => ({ 
        ...prev, 
        status: 'complete', 
        aiAnalysis: analysis,
      }));

    } catch (error) {
      console.error(error);
      setState(prev => ({ 
        ...prev, 
        status: 'error', 
        errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred.' 
      }));
    }
  };

  const resetApp = () => {
    setState({
      status: 'idle',
      inputText: '',
      extractedSkills: [],
      aiAnalysis: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-900 selection:bg-[#1b4d3e]/20 selection:text-[#1b4d3e] bg-[#f8fafc]">
      <HeroHeader />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 relative">
        
        {state.status === 'idle' && (
           <InputSection onSubmit={handleAnalysis} isLoading={false} />
        )}

        {(state.status === 'authenticating' || state.status === 'extracting' || state.status === 'analyzing') && (
          <LoadingOverlay status={state.status} />
        )}

        {/* Error State */}
        {state.status === 'error' && (
          <div className="mt-16 max-w-lg mx-auto bg-rose-50 border border-rose-100 rounded-2xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 shadow-lg">
            <XCircle className="w-12 h-12 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold text-rose-900 font-serif">Analysis Interrupted</h3>
            <p className="text-rose-700 mt-2 mb-6 leading-relaxed">{state.errorMessage}</p>
            <button 
              onClick={() => setState(prev => ({ ...prev, status: 'idle' }))}
              className="px-8 py-3 bg-white border border-rose-200 text-rose-700 font-semibold rounded-xl hover:bg-rose-100 transition-colors shadow-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results View */}
        {state.status === 'complete' && state.aiAnalysis && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-4 no-print">
               <div>
                  <h2 className="text-3xl font-poppins font-bold text-slate-900">Intelligence Report</h2>
                  <p className="text-slate-500 text-sm font-inter">Generated via Lightcast & Gemini</p>
               </div>
               <button 
                  onClick={resetApp}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-[#1b4d3e] hover:border-[#1b4d3e]/30 transition-all font-medium shadow-sm"
               >
                 <RotateCcw className="w-4 h-4" />
                 Analyze New Role
               </button>
            </div>
            <AnalysisResults 
              analysis={state.aiAnalysis} 
              skills={state.extractedSkills} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { HR_DAD_JOKES } from '../constants';

interface LoadingOverlayProps {
  status: 'authenticating' | 'extracting' | 'analyzing';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ status }) => {
  const [joke, setJoke] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Shuffle jokes on mount so it's random every session
    const shuffled = [...HR_DAD_JOKES].sort(() => Math.random() - 0.5);
    setJoke(shuffled[0]);
    
    let jokeIndex = 0;
    // Rotate jokes every 8 seconds
    const jokeInterval = setInterval(() => {
      jokeIndex = (jokeIndex + 1) % shuffled.length;
      setJoke(shuffled[jokeIndex]);
    }, 8000);

    return () => clearInterval(jokeInterval);
  }, []);

  // Simulated progress bar
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'authenticating') {
      setProgress(10);
      interval = setInterval(() => {
         setProgress(prev => Math.min(prev + 2, 30));
      }, 200);
    } else if (status === 'extracting') {
      setProgress(30);
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 60));
      }, 50);
    } else if (status === 'analyzing') {
      setProgress(60);
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.5, 95));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);

  const getStatusText = () => {
    switch(status) {
      case 'authenticating': return 'Authenticating with Lightcast...';
      case 'extracting': return 'Extracting Taxonomy from Unstructured Text...';
      case 'analyzing': return 'Gemini is Auditing Bias & Generating Strategy...';
      default: return 'Loading...';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl animate-in fade-in duration-500 font-inter">
      <div className="w-full max-w-lg p-8 flex flex-col items-center text-center space-y-10">
        
        {/* Icon Animation */}
        <div className="relative scale-125">
          <div className="absolute inset-0 bg-[#1b4d3e] blur-3xl opacity-20 rounded-full animate-pulse"></div>
          <div className="relative bg-white p-5 rounded-2xl shadow-2xl border border-slate-100">
             <Loader2 className="w-12 h-12 text-[#1b4d3e] animate-spin" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-3">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 font-poppins">
             <span>{status}</span>
             <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#1b4d3e] via-emerald-500 to-[#1b4d3e] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-600 font-medium animate-pulse font-inter">{getStatusText()}</p>
        </div>

        {/* The Joke Card (Clean) */}
        <div className="w-full bg-white border border-slate-200 p-8 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-transform duration-500 relative overflow-hidden flex items-center justify-center min-h-[120px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-amber-500"></div>
          <p className="text-slate-800 font-inter font-medium text-lg italic leading-relaxed text-center">
            "{joke}"
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoadingOverlay;

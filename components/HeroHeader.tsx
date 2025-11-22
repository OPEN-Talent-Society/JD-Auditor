
import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';

const HeroHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolling up or at the top, hide if scrolling down
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        bg-white text-[#15171A] border-b border-transparent fixed top-0 left-0 right-0 z-[100] font-inter h-[88px] flex items-center transition-transform duration-300 shadow-sm
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">
        
        {/* LEFT: BRANDING */}
        <div className="flex items-center flex-shrink-0">
          <a href="https://opentalentsociety.org" className="block opacity-100 hover:opacity-100 transition-opacity">
             <img 
               src="/logo.png" 
               alt="OPEN Talent Society" 
               className="h-[42px] w-auto object-contain"
             />
          </a>
        </div>

        {/* CENTER: NAVIGATION (Desktop) */}
        <nav className="hidden lg:flex items-center pl-10">
           <ul className="flex items-center gap-8 text-[15px] leading-[1.5] font-medium text-[#15171A] tracking-tight">
              <li>
                <a href="https://opentalentsociety.org/volunteer-opportunities/" className="hover:opacity-70 transition-opacity">
                  Volunteer With Us
                </a>
              </li>
              <li>
                <a href="https://luma.com/opentalentsociety" className="hover:opacity-70 transition-opacity">
                  OPEN Community Hour
                </a>
              </li>
              <li>
                <a href="#" className="font-bold opacity-100">
                  JD Auditor
                </a>
              </li>
           </ul>
        </nav>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-5 ml-auto">
            <a 
              href="https://opentalentsociety.org/#/search" 
              className="p-2 hover:bg-transparent transition-colors block" 
              aria-label="Search"
            >
               <Search className="w-[18px] h-[18px] text-[#15171A]" strokeWidth={2.5} />
            </a>
            
            <div className="hidden md:flex items-center gap-5">
               <a href="https://opentalentsociety.org/#/portal/signin" className="text-[15px] font-bold text-[#15171A] hover:opacity-70 transition-opacity whitespace-nowrap">
                 Sign in
               </a>
               <a 
                 href="https://opentalentsociety.org/#/portal/signup" 
                 className="bg-[#1b4d3e] text-white px-5 py-[7px] rounded-[5px] text-[15px] font-bold hover:bg-[#153b30] transition-colors whitespace-nowrap"
               >
                 Subscribe
               </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 -mr-2 text-[#15171A]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-[88px] left-0 w-full bg-white border-b border-gray-100 p-6 shadow-xl lg:hidden flex flex-col gap-6 animate-in slide-in-from-top-5">
           <ul className="flex flex-col gap-5 text-[1.6rem] font-bold text-[#15171A]">
              <li><a href="https://opentalentsociety.org/volunteer-opportunities/" className="block hover:opacity-70">Volunteer With Us</a></li>
              <li><a href="https://luma.com/opentalentsociety" className="block hover:opacity-70">OPEN Community Hour</a></li>
              <li><a href="#" className="block text-[#1b4d3e]">JD Auditor</a></li>
           </ul>
           <div className="h-px bg-gray-100 w-full"></div>
           <div className="flex flex-col gap-4 items-center">
              <a href="https://opentalentsociety.org/#/portal/signin" className="text-[1.6rem] font-bold text-[#15171A]">Sign in</a>
              <a href="https://opentalentsociety.org/#/portal/signup" className="bg-[#1b4d3e] text-white px-8 py-3 rounded-full text-center text-[1.6rem] font-bold w-full">Subscribe</a>
           </div>
        </div>
      )}
    </header>
  );
};

export default HeroHeader;

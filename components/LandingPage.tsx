import React, { useState } from 'react';
import { Instagram, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';

interface LandingPageProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  isDark?: boolean;
  toggleTheme?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-x-hidden bg-[#050505] text-white selection:bg-brand-orange/30">
      {/* Background Gradients - Matching screenshot with deep, rich colors */}
      {/* Changed to fixed to stay consistent while scrolling */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Top Right / Center - Purple/Red glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-[pulse_8s_ease-in-out_infinite]" />
        {/* Bottom Left - Dark Teal/Blue glow */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] bg-[#0f4c5c]/20 rounded-full blur-[100px] mix-blend-screen opacity-30 animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Content Wrapper - Added py-12 for mobile spacing and min-h-screen for centering */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center justify-center min-h-screen py-12 md:py-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 md:mb-10 shadow-lg hover:bg-white/10 transition-colors animate-[fadeInDown_0.6s_ease-out]">
          <Instagram className="w-4 h-4 text-brand-orange" />
          <span className="text-xs font-medium text-gray-300 tracking-wide">Instagram Analytics Intelligence</span>
        </div>

        {/* Title - Adjusted for mobile sizes */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          Unlock Social <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-burnt">Performance</span>
        </h1>

        {/* Subtitle - Adjusted margin and text size */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
          Get deep insights into any public Instagram profile. Analyze engagement rates, content performance, and growth trends in seconds.
        </p>

        {/* Search Box - Adjusted margin */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto relative group mb-12 md:mb-20 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
          {/* Glow effect behind */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-orange to-brand-ruby rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          
          <div className="relative flex items-center bg-[#0a0a0a] rounded-2xl p-1.5 border border-white/10 shadow-2xl transition-all duration-300 focus-within:border-brand-orange/30 focus-within:ring-1 focus-within:ring-brand-orange/20">
            <div className="pl-4 pr-2 text-gray-500 shrink-0">
              <span className="text-xl font-light">@</span>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="flex-1 bg-transparent border-none outline-none text-white px-2 py-3 text-base md:text-lg placeholder:text-gray-600 font-medium min-w-0"
              disabled={isLoading}
              autoFocus
            />
            <Button 
              type="submit" 
              isLoading={isLoading}
              disabled={!username.trim()}
              className="rounded-xl py-2 px-4 md:px-6 h-11 md:h-12 bg-brand-orange hover:bg-brand-burnt text-black font-semibold text-sm transition-all shrink-0"
            >
              Analyze
            </Button>
          </div>
        </form>

        {/* Feature Cards - Adjusted grid gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left w-full animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
          {/* Card 1 */}
          <div className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#111] hover:shadow-2xl hover:shadow-brand-teal/5">
            <div className="w-10 h-10 rounded-lg bg-[#0f4c5c]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#0f4c5c]/20">
              <TrendingUp className="w-5 h-5 text-[#0f4c5c] group-hover:text-[#2dd4bf]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Deep Analytics</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">Track engagement rates, growth patterns, and content efficiency metrics.</p>
          </div>

          {/* Card 2 */}
          <div className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#111] hover:shadow-2xl hover:shadow-brand-ruby/5">
            <div className="w-10 h-10 rounded-lg bg-[#9a031e]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#9a031e]/20">
              <ShieldCheck className="w-5 h-5 text-[#9a031e] group-hover:text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Competitor Intel</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">Analyze competitor strategies and benchmark your performance.</p>
          </div>

          {/* Card 3 */}
          <div className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#111] hover:shadow-2xl hover:shadow-brand-orange/5">
            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-brand-orange/20">
              <Zap className="w-5 h-5 text-brand-orange group-hover:text-yellow-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real-time Data</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">Powered by n8n workflows to fetch the latest available public data.</p>
          </div>
        </div>
      </div>
      
      {/* Inline styles for keyframe animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
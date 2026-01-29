import React from 'react';
import { AnalyticsData } from '../types';
import { ProfileOverview } from './dashboard/ProfileOverview';
import { MetricsGrid } from './dashboard/MetricsGrid';
import { ChartsSection } from './dashboard/ChartsSection';
import { PostsGrid } from './dashboard/PostsGrid';
import { ArrowLeft, Share2, Download, Instagram, Sun, Moon } from 'lucide-react';
import { Button } from './ui/Button';

interface DashboardProps {
  data: AnalyticsData;
  onBack: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onBack, isDark, toggleTheme }) => {
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Instalytics Report - ${data.profile.username} - ${new Date().toISOString().split('T')[0]}`;
    setTimeout(() => {
        window.print();
        document.title = originalTitle;
    }, 100);
  };

  const handleShare = () => {
    console.log(`[Share] Share Report initiated for user: ${data.profile.username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] p-4 lg:p-8 transition-colors duration-300">
      <style>{`
        @media print {
          @page { margin: 0; size: auto; }
          html, body {
            height: auto !important;
            overflow: visible !important;
            background-color: #050505 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
          .print-only { display: flex !important; }
          #root { width: 100% !important; }
          .bg-brand-card {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            background-color: #151515 !important;
            border: 1px solid #333 !important;
            box-shadow: none !important;
            color: white !important;
          }
          h1, h2, h3, h4, p, span, div {
             color-adjust: exact !important;
             -webkit-print-color-adjust: exact !important;
             color: white !important;
          }
          .text-gray-900 { color: white !important; }
          .grid { display: grid !important; }
        }
      `}</style>

      {/* Print Only Header */}
      <div className="hidden print-only flex-col mb-8 p-8 border-b border-white/20 bg-[#050505]">
        <div className="flex items-center gap-2 mb-4">
           <Instagram className="w-8 h-8 text-brand-orange" />
           <span className="text-2xl font-bold text-white">Instalytics Report</span>
        </div>
        <div className="text-sm text-gray-400 flex justify-between items-end">
           <div className="flex flex-col">
             <span className="uppercase tracking-wider text-xs font-semibold text-gray-500 mb-1">Generated For</span>
             <span className="text-white font-mono text-lg">@{data.profile.username}</span>
           </div>
           <div className="flex flex-col items-end">
             <span className="uppercase tracking-wider text-xs font-semibold text-gray-500 mb-1">Date</span>
             <span className="text-white">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
           </div>
        </div>
      </div>

      {/* Navbar / Header - Hidden on Print */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 pl-0 hover:bg-transparent hover:text-brand-orange">
            <ArrowLeft className="w-5 h-5" />
            <span>New Search</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
           <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors"
             title="Toggle Theme"
           >
             {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
           </button>
           <Button variant="outline" className="text-sm py-2 h-10 flex-1 md:flex-none" onClick={handleShare}>
             <Share2 className="w-4 h-4 mr-2" /> Share
           </Button>
           <Button variant="primary" className="text-sm py-2 h-10 flex-1 md:flex-none" onClick={handlePrint}>
             <Download className="w-4 h-4 mr-2" /> Export
           </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <ProfileOverview profile={data.profile} engagementRate={data.analytics.overall_engagement_rate} />
        <MetricsGrid analytics={data.analytics} />
        <ChartsSection posts={data.posts} isDark={isDark} />
        <PostsGrid posts={data.posts} />
      </div>
      
      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-white/5 text-center text-gray-500 text-sm no-print">
        <p>© 2026 Instalytics. Powered by n8n Intelligence.</p>
      </div>
      {/* Print Footer */}
      <div className="hidden print-only mt-12 pt-8 border-t border-white/20 text-center text-gray-500 text-xs">
        <p>Generated by Instalytics - Professional Instagram Analytics</p>
      </div>
    </div>
  );
};
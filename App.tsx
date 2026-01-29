import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AppState, AnalyticsData } from './types';
import { fetchInstagramAnalytics } from './services/api';
import { WifiOff, ServerCrash } from 'lucide-react';
import { Button } from './components/ui/Button';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('LANDING');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme based on system preference
  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(systemPrefersDark);
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchInstagramAnalytics(username);
      
      if (response.success && response.data) {
        setData(response.data);
        setView('DASHBOARD');
      } else {
        setError(response.error || 'Failed to fetch analytics');
        setView('ERROR');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected network error occurred.');
      setView('ERROR');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setView('LANDING');
    setData(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center relative z-50">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* Custom Loader */}
        <div className="relative flex flex-col items-center">
          {/* Rotating Rings */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-t-4 border-brand-orange rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
            <div className="absolute inset-2 border-r-4 border-brand-orange/40 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-brand-orange/20 rounded-full backdrop-blur-md flex items-center justify-center">
                 <div className="w-8 h-8 bg-brand-orange rounded-full shadow-[0_0_20px_rgba(251,139,36,0.6)] animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Text */}
          <div className="mt-10 text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">ANALYZING PROFILE</h3>
            <div className="flex items-center gap-1 justify-center text-brand-orange/80 text-sm font-mono">
              <span className="w-1 h-1 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1 h-1 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1 h-1 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              <span className="ml-2">Connecting to Intelligence Engine...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'ERROR') {
    // Detect if the error is related to network, fetch, CORS, or connection
    const lowerError = error?.toLowerCase() || '';
    const isNetworkError = 
      lowerError.includes('failed to fetch') || 
      lowerError.includes('network error') ||
      lowerError.includes('cors');

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#121212] max-w-[400px] w-full p-8 rounded-2xl border border-gray-200 dark:border-white/10 text-center shadow-2xl relative overflow-hidden transition-colors">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-red-500/10 blur-[40px] pointer-events-none"></div>

          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 relative z-10">
             {isNetworkError ? (
               <WifiOff className="w-8 h-8 text-red-500" />
             ) : (
               <ServerCrash className="w-8 h-8 text-red-500" />
             )}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {isNetworkError ? 'Connection Issue' : 'Analysis Failed'}
          </h2>
          
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed space-y-4">
            <p>
              {isNetworkError 
                ? 'API connection failed. Please check your N8N_WEBHOOK_URL and try again.' 
                : error}
            </p>
            
            {isNetworkError && (
              <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 text-xs text-gray-600 dark:text-gray-500 text-left">
                <strong className="text-gray-800 dark:text-gray-300 block mb-2">Troubleshooting Steps:</strong>
                <ul className="list-disc pl-4 space-y-1.5 marker:text-gray-600">
                  <li>Check your internet connection</li>
                  <li>Verify <code>N8N_WEBHOOK_URL</code> configuration</li>
                  <li>Try searching for a different username</li>
                </ul>
              </div>
            )}
          </div>

          <Button onClick={handleBack} className="w-full rounded-xl text-sm font-bold h-12">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (view === 'DASHBOARD' && data) {
    return <Dashboard data={data} onBack={handleBack} isDark={isDark} toggleTheme={toggleTheme} />;
  }

  return (
    <LandingPage onSearch={handleSearch} isLoading={loading} isDark={isDark} toggleTheme={toggleTheme} />
  );
};

export default App;
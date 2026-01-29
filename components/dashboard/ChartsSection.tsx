import React, { useState, useRef } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { InstagramPost } from '../../types';
import { Card } from '../ui/Card';
import { Heart, MessageCircle, Trophy, Play, Zap, ImageOff, Loader2 } from 'lucide-react';

interface ChartsSectionProps {
  posts: InstagramPost[];
  isDark: boolean;
}

const TopPostItem = ({ post, formatNumber, isDark }: { post: InstagramPost, formatNumber: (n: number) => string, isDark: boolean }) => {
  const [mediaStatus, setMediaStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const isVideo = post.media_type === 'video';
  const displayUrl = post.thumbnail_url || post.media_url;
  
  const handleLoad = () => setMediaStatus('loaded');
  const handleError = () => setMediaStatus('error');

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Media Section - Takes available space */}
      <div 
        className="relative flex-1 w-full min-h-0 mb-4 group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
         <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] relative shadow-lg ring-1 ring-black/5 dark:ring-white/10">
            
            {/* Loading State */}
            {mediaStatus === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-[#222] z-10">
                 <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
              </div>
            )}

            {/* Error State */}
            {mediaStatus === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-[#222] z-10 text-gray-400">
                 <ImageOff className="w-8 h-8 mb-2 opacity-50" />
                 <span className="text-xs font-medium">Preview Unavailable</span>
              </div>
            )}

            {/* Badge */}
            <div className="absolute top-3 right-3 z-20">
                <div className="bg-brand-orange text-black text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg uppercase tracking-wide">
                  #1 Ranked
                </div>
            </div>

            {/* Media Content */}
            {(post.media_url || post.thumbnail_url) && (
               isVideo ? (
                 <div className="w-full h-full relative bg-black">
                    <video 
                      ref={videoRef}
                      src={post.media_url} 
                      className="w-full h-full object-cover absolute inset-0"
                      muted 
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={handleLoad}
                      onError={(e) => {
                         if (mediaStatus !== 'loaded') handleError();
                      }}
                    />
                    
                    {/* Thumbnail Image Overlay */}
                    {displayUrl && (
                       <img 
                          src={displayUrl}
                          alt="Top Post Thumbnail"
                          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                          referrerPolicy="no-referrer"
                          onLoad={handleLoad}
                          onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             // If no video yet, keep loading/error handling separate or fallback to video load
                          }}
                       />
                    )}

                    {/* Play Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                       <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-brand-orange/80 group-hover:border-brand-orange transition-all duration-300">
                          <Play className="w-5 h-5 text-white fill-white ml-1" />
                       </div>
                    </div>
                 </div>
               ) : (
                 <img 
                    src={post.media_url || post.thumbnail_url || ''} 
                    alt="Top Post" 
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${mediaStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                    referrerPolicy="no-referrer"
                    onLoad={handleLoad}
                    onError={handleError}
                 />
               )
            )}

            {/* Trophy Overlay - Centered Bottom */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${isPlaying ? 'opacity-50' : 'opacity-100'}`}>
                <div className="bg-white dark:bg-[#151515] p-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-white/10 ring-4 ring-black/5 dark:ring-white/5">
                    <Trophy className="w-5 h-5 text-brand-orange fill-brand-orange" />
                </div>
            </div>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 shrink-0 h-[75px]">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 group hover:border-brand-ruby/30 transition-colors relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-ruby/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <Heart className="w-4 h-4 text-brand-ruby fill-brand-ruby mb-1 relative z-10" />
             <span className="text-sm font-bold text-gray-900 dark:text-white relative z-10">{formatNumber(post.likes)}</span>
             <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold relative z-10">Likes</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 group hover:border-brand-teal/30 transition-colors relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <MessageCircle className="w-4 h-4 text-brand-teal fill-brand-teal mb-1 relative z-10" />
             <span className="text-sm font-bold text-gray-900 dark:text-white relative z-10">{formatNumber(post.comments)}</span>
             <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold relative z-10">Comm.</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 group hover:border-brand-orange/30 transition-colors relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <Zap className="w-4 h-4 text-brand-orange fill-brand-orange mb-1 relative z-10" />
             <span className="text-sm font-bold text-gray-900 dark:text-white relative z-10">{post.engagement_rate}%</span>
             <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold relative z-10">Rate</span>
          </div>
      </div>
    </div>
  );
};

export const ChartsSection: React.FC<ChartsSectionProps> = ({ posts, isDark }) => {
  // Sort posts by date for time-series data
  const sortedPosts = [...posts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  // Top 1 Post by Engagement (Likes + Comments)
  const topPosts = [...posts]
    .sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
    .slice(0, 1);

  const engagementData = sortedPosts.map(post => ({
    date: new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    engagement: post.engagement_rate,
    likes: post.likes,
    comments: post.comments
  }));

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
  };

  // Theme-aware colors
  const axisColor = isDark ? '#666' : '#9ca3af';
  const gridColor = isDark ? '#333' : '#e5e7eb';
  const tooltipBg = isDark ? '#151515' : '#ffffff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const textColor = isDark ? '#ffffff' : '#111827';
  const subTextColor = isDark ? '#9ca3af' : '#6b7280';

  // Custom Tooltip for Area and Bar Charts
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-3 rounded-xl shadow-2xl backdrop-blur-md min-w-[150px]"
          style={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }}
        >
          <p className="text-xs font-medium mb-2 uppercase tracking-wider border-b pb-2" style={{ color: subTextColor, borderColor: tooltipBorder }}>{label}</p>
          {payload.map((p: any, index: number) => {
             // Determine color based on data key if explicit color isn't passed correctly in all cases
             let color = p.color;
             if (p.name === 'Likes') color = '#0f4c5c';
             if (p.name === 'Comments') color = '#9a031e';
             if (p.name === 'Engagement Rate') color = '#fb8b24';

             // Handle gradient URLs in color by hardcoding for tooltip dots
             if (typeof color === 'string' && color.startsWith('url')) {
                if (p.name === 'Likes') color = '#0f4c5c';
                else if (p.name === 'Comments') color = '#9a031e';
                else color = '#fb8b24';
             }

            return (
              <div key={index} className="flex items-center justify-between gap-4 text-sm mb-1.5 last:mb-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: color, backgroundColor: color }} />
                  <span className="font-medium" style={{ color: subTextColor }}>{p.name}:</span>
                </div>
                <span className="font-bold font-mono" style={{ color: textColor }}>
                  {p.name === 'Engagement Rate' ? `${p.value}%` : formatNumber(p.value)}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Engagement Trend */}
      <Card className="lg:col-span-2" title="Engagement Trend">
        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb8b24" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#fb8b24" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke={axisColor} 
                tick={{ fill: axisColor, fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis 
                stroke={axisColor} 
                tick={{ fill: axisColor, fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: '#fb8b24', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                name="Engagement Rate"
                stroke="#fb8b24" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEngagement)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: isDark ? '#fff' : '#000' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Performing Post (Singular - Full Card Layout) */}
      <Card title="Top Performing Post">
        <div className="h-[350px] w-full flex flex-col">
          {topPosts.length > 0 ? (
            <TopPostItem post={topPosts[0]} formatNumber={formatNumber} isDark={isDark} />
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
                No posts available.
             </div>
          )}
        </div>
      </Card>

      {/* Interactions Breakdown */}
      <Card className="lg:col-span-3" title="Likes vs Comments (Recent Posts)">
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} barGap={0}>
              <defs>
                <linearGradient id="likesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f4c5c" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#0f4c5c" stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="commentsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9a031e" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#9a031e" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke={axisColor} 
                tick={{ fill: axisColor, fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke={axisColor} 
                tick={{ fill: axisColor, fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomChartTooltip />} cursor={{fill: isDark ? 'white' : 'black', opacity: 0.05}} />
              <Bar dataKey="likes" name="Likes" fill="url(#likesGradient)" radius={[4, 4, 0, 0]} maxBarSize={50} />
              <Bar dataKey="comments" name="Comments" fill="url(#commentsGradient)" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { InstagramPost } from '../../types';
import { Card } from '../ui/Card';
import { Heart, MessageCircle, ImageOff, X, Calendar, Zap, ExternalLink, Loader2, Filter, ChevronDown, Grid, Video, Layers, Image as ImageIcon, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface PostsGridProps {
  posts: InstagramPost[];
}

interface PostThumbnailProps {
  post: InstagramPost;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ post, onClick, className, style }) => {
  // Initialize state based on whether we have a URL or not
  const [mediaStatus, setMediaStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = post.media_type === 'video';
  const displayUrl = post.thumbnail_url || post.media_url;

  useEffect(() => {
      // If we have strictly no URL, error out
      if (!post.media_url && !post.thumbnail_url) {
          setMediaStatus('error');
      }
  }, [post]);

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
             setIsPlaying(false);
          });
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

  // Helper to handle load events
  const handleLoad = () => setMediaStatus('loaded');
  const handleError = () => setMediaStatus('error');
  
  // Specific handler for image error (e.g. trying to load a video as an image)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.style.display = 'none'; // Hide broken image so video can show through
      if (!isVideo) handleError();
  };

  return (
    <div 
      onClick={onClick}
      style={style}
      className={`group relative rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-white/5 cursor-pointer hover:border-brand-orange/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,139,36,0.15)] ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Loading State - Only show if loading */}
      {mediaStatus === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-white/5 z-10">
             <div className="w-8 h-8 rounded-full border-2 border-brand-orange/30 border-t-brand-orange animate-spin" />
        </div>
      )}

      {/* Fallback / Error State */}
      {mediaStatus === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 p-4 text-center z-10">
           <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center mb-2">
             {isVideo ? <Video className="w-5 h-5 text-gray-400" /> : <ImageOff className="w-5 h-5 text-gray-400" />}
           </div>
           <p className="text-[10px] text-gray-400 line-clamp-3 leading-tight font-medium">{post.caption || 'No Preview Available'}</p>
        </div>
      )}

      {/* Media Content */}
      {isVideo ? (
        <div className="w-full h-full relative">
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
                // If video fails and we have no valid image loaded, it's an error
                if (mediaStatus !== 'loaded') handleError();
            }}
          />
          
          {/* Thumbnail Image Overlay - Shown when not playing. 
              If thumbnail_url is valid, it covers the video. 
              If thumbnail_url is invalid (or is a video url), onError hides it and video (w/ preload) shows.
          */}
          {displayUrl && (
             <img 
               src={displayUrl} 
               alt={post.caption}
               referrerPolicy="no-referrer"
               className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
               onLoad={handleLoad}
               onError={handleImageError}
             />
          )}

          {/* Play Icon Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
             <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Play className="w-5 h-5 text-white fill-white" />
             </div>
          </div>
        </div>
      ) : (
        <img 
          src={displayUrl} 
          alt="Post thumbnail" 
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${mediaStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20 pointer-events-none">
        <div className="flex justify-between items-center text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-brand-ruby text-brand-ruby" />
            <span className="text-sm font-bold">{new Intl.NumberFormat('en-US', { notation: "compact" }).format(post.likes)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 fill-white/20 text-white" />
            <span className="text-sm font-bold">{new Intl.NumberFormat('en-US', { notation: "compact" }).format(post.comments)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-200 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{post.caption}</p>
      </div>
      
      {/* Type Badge */}
      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 z-20">
        {post.media_type}
      </div>
    </div>
  );
};

const PostDetailModal: React.FC<{ post: InstagramPost; onClose: () => void }> = ({ post, onClose }) => {
  const [mediaStatus, setMediaStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const isVideo = post.media_type === 'video';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
      <div 
        className="bg-white dark:bg-[#151515] w-full max-w-5xl max-h-[90vh] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl relative animate-[zoomIn_0.2s_ease-out]" 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 md:hidden p-2 bg-black/50 rounded-full text-white backdrop-blur-sm">
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-3/5 bg-gray-100 dark:bg-[#050505] flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/5 min-h-[300px] md:h-auto">
           {mediaStatus === 'loading' && (
             <div className="absolute inset-0 flex items-center justify-center">
               <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
             </div>
           )}
           
           {mediaStatus === 'error' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-50 dark:bg-white/5 p-8 text-center">
               {isVideo ? <Video className="w-10 h-10 mb-2 opacity-50" /> : <ImageOff className="w-10 h-10 mb-2 opacity-50" />}
               <span className="text-sm font-medium mb-1">Preview Unavailable</span>
               <span className="text-xs text-gray-400">The media source could not be loaded.</span>
               {post.media_url && (
                 <a 
                  href={post.media_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 bg-white dark:bg-white/10 rounded-full text-xs font-semibold hover:bg-brand-orange hover:text-white transition-colors"
                 >
                   Try opening in browser
                 </a>
               )}
             </div>
           )}

           {(post.media_url || post.thumbnail_url) && (
             isVideo ? (
               <video 
                  src={post.media_url} 
                  poster={post.thumbnail_url}
                  controls 
                  autoPlay 
                  className={`max-h-[50vh] md:max-h-full w-full object-contain ${mediaStatus === 'loaded' ? 'opacity-100' : 'opacity-100'} transition-opacity duration-300`}
                  onLoadedData={() => setMediaStatus('loaded')}
                  onError={() => setMediaStatus('error')}
               />
             ) : (
               <img 
                  src={post.media_url} 
                  alt="Post content" 
                  referrerPolicy="no-referrer"
                  className={`max-h-[50vh] md:max-h-full w-full object-contain transition-opacity duration-300 ${mediaStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setMediaStatus('loaded')}
                  onError={() => setMediaStatus('error')}
               />
             )
           )}
        </div>
        
        <div className="w-full md:w-2/5 flex flex-col h-[50vh] md:h-auto bg-white dark:bg-[#151515] overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-start shrink-0">
              <div>
                   <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 uppercase tracking-wider font-semibold">Posted on</p>
                   <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Calendar className="w-4 h-4 text-brand-orange" />
                      <span className="font-medium font-mono">{new Date(post.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                   </div>
              </div>
              <button onClick={onClose} className="hidden md:block p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
              </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-brand-ruby/5 dark:bg-brand-ruby/5 p-3 rounded-xl border border-brand-ruby/20 text-center hover:border-brand-ruby/50 transition-colors group">
                    <Heart className="w-5 h-5 text-brand-ruby mx-auto mb-2 group-hover:scale-110 transition-transform fill-brand-ruby/10" />
                    <span className="block text-lg font-bold text-gray-900 dark:text-white tracking-tight">{new Intl.NumberFormat('en-US', { notation: "compact" }).format(post.likes)}</span>
                    <span className="text-[10px] text-brand-ruby font-semibold uppercase tracking-wider">Likes</span>
                </div>
                <div className="bg-brand-teal/5 dark:bg-brand-teal/5 p-3 rounded-xl border border-brand-teal/20 text-center hover:border-brand-teal/50 transition-colors group">
                    <MessageCircle className="w-5 h-5 text-brand-teal mx-auto mb-2 group-hover:scale-110 transition-transform fill-brand-teal/10" />
                    <span className="block text-lg font-bold text-gray-900 dark:text-white tracking-tight">{new Intl.NumberFormat('en-US', { notation: "compact" }).format(post.comments)}</span>
                    <span className="text-[10px] text-brand-teal font-semibold uppercase tracking-wider">Comments</span>
                </div>
                 <div className="bg-brand-orange/5 dark:bg-brand-orange/5 p-3 rounded-xl border border-brand-orange/20 text-center hover:border-brand-orange/50 transition-colors group">
                    <Zap className="w-5 h-5 text-brand-orange mx-auto mb-2 group-hover:scale-110 transition-transform fill-brand-orange/10" />
                    <span className="block text-lg font-bold text-gray-900 dark:text-white tracking-tight">{post.engagement_rate}%</span>
                    <span className="text-[10px] text-brand-orange font-semibold uppercase tracking-wider">Eng. Rate</span>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>Caption</span>
                  <div className="h-[1px] flex-1 bg-gray-100 dark:bg-white/10"></div>
                </h4>
                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 hover:border-brand-orange/20 transition-colors">
                   <p className="text-gray-600 dark:text-gray-300 text-sm leading-7 whitespace-pre-wrap font-light">{post.caption || 'No caption provided.'}</p>
                </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#121212] shrink-0">
             {post.media_url ? (
                <a 
                  href={post.media_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-orange text-black hover:bg-[#ff9f4d] active:bg-[#e07a1c] rounded-xl text-sm font-bold transition-all shadow-[0_4px_14px_0_rgba(251,139,36,0.39)] hover:shadow-[0_6px_20px_rgba(251,139,36,0.23)] hover:-translate-y-0.5"
                >
                    <ExternalLink className="w-4 h-4" />
                    Open Original Media
                </a>
             ) : (
                <div className="text-center text-xs text-gray-500">
                    Media URL not available for this post.
                </div>
             )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

type SortOption = 'date' | 'likes' | 'comments' | 'engagement';
type FilterType = 'ALL' | 'photo' | 'video' | 'carousel';

export const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('engagement');
  const [filterType, setFilterType] = useState<FilterType>('ALL');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const scrollRef = useRef<HTMLDivElement>(null);

  const processedPosts = useMemo(() => {
    let result = [...posts];

    // Filter
    if (filterType !== 'ALL') {
      result = result.filter(post => post.media_type === filterType);
    }

    // Sort
    return result.sort((a, b) => {
      switch (sortOption) {
        case 'likes':
          return b.likes - a.likes;
        case 'comments':
          return b.comments - a.comments;
        case 'date':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'engagement':
        default:
          return b.engagement_rate - a.engagement_rate;
      }
    });
  }, [posts, sortOption, filterType]);

  // Reset page when filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(processedPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = processedPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setIsAnimating(true);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleFilterChange = (type: FilterType) => {
    setFilterType(type);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  const filterAction = (
     <div className="flex bg-gray-100 dark:bg-[#0a0a0a] rounded-lg p-1 border border-gray-200 dark:border-white/10">
        {(['ALL', 'photo', 'video', 'carousel'] as const).map((type) => {
             const icons = {
                 ALL: Grid,
                 photo: ImageIcon,
                 video: Video,
                 carousel: Layers
             };
             const Icon = icons[type];
             return (
                <button
                    key={type}
                    onClick={() => handleFilterChange(type)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        filterType === type 
                        ? 'bg-white dark:bg-[#1a1a1a] text-brand-orange shadow-sm border border-gray-200 dark:border-white/10' 
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5'
                    }`}
                >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{type === 'ALL' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </button>
             );
        })}
    </div>
  );

  const sortAction = (
    <div className="relative group min-w-[160px]">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
        <Filter className="w-3.5 h-3.5 text-brand-orange group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
      </div>
      <select 
        value={sortOption} 
        onChange={handleSortChange}
        className="w-full appearance-none bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer shadow-sm"
      >
        <option value="engagement" className="bg-white dark:bg-[#151515] text-gray-900 dark:text-white">Best Engagement</option>
        <option value="likes" className="bg-white dark:bg-[#151515] text-gray-900 dark:text-white">Most Likes</option>
        <option value="comments" className="bg-white dark:bg-[#151515] text-gray-900 dark:text-white">Most Comments</option>
        <option value="date" className="bg-white dark:bg-[#151515] text-gray-900 dark:text-white">Newest First</option>
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 group-hover:text-brand-orange transition-colors" />
      </div>
    </div>
  );

  // Pagination UI Helper
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10">1</button>
            {startPage > 2 && <span className="text-gray-400">...</span>}
          </>
        )}

        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
              currentPage === page
                ? 'bg-brand-orange text-black shadow-lg shadow-brand-orange/20 scale-110'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10">{totalPages}</button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <Card 
        title="Post Gallery" 
        action={
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                {filterAction}
                {sortAction}
            </div>
        }
      >
        {/* Inner Scroll Container */}
        <div ref={scrollRef} className="max-h-[800px] overflow-y-auto custom-scrollbar pr-2 -mr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 min-h-[200px]">
            {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <PostThumbnail 
                  key={post.id} 
                  post={post} 
                  onClick={() => setSelectedPost(post)}
                  className={isAnimating ? 'animate-fade-up' : ''}
                  style={{ animationDelay: `${index * 50}ms` }}
                  />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
                      <ImageOff className="w-8 h-8 opacity-50" />
                  </div>
                  <p>No posts found matching the selected filter.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Pagination Controls */}
        {renderPagination()}
      </Card>
      
      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
};
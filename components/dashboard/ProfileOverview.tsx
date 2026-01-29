import React from 'react';
import { InstagramProfile } from '../../types';
import { BadgeCheck, Users, Image as ImageIcon, UserPlus, Zap } from 'lucide-react';

interface ProfileOverviewProps {
  profile: InstagramProfile;
  engagementRate: number;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({ profile, engagementRate }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
  };

  const stats = [
    {
      label: 'Followers',
      value: formatNumber(profile.followersCount),
      icon: Users,
      color: 'text-brand-teal',
      bgColor: 'bg-brand-teal/10 dark:bg-brand-teal/20',
    },
    {
      label: 'Following',
      value: formatNumber(profile.followsCount),
      icon: UserPlus,
      color: 'text-brand-purple',
      bgColor: 'bg-brand-purple/10 dark:bg-brand-purple/20',
    },
    {
      label: 'Posts',
      value: formatNumber(profile.mediaCount),
      icon: ImageIcon,
      color: 'text-brand-orange',
      bgColor: 'bg-brand-orange/10 dark:bg-brand-orange/20',
    },
    {
      label: 'Engagement',
      value: engagementRate + '%',
      icon: Zap,
      color: 'text-brand-ruby',
      bgColor: 'bg-brand-ruby/10 dark:bg-brand-ruby/20',
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Profile Card */}
      <div className="lg:col-span-2 bg-white dark:bg-brand-card border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden shadow-sm dark:shadow-xl transition-colors duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 dark:bg-brand-orange/10 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="relative group/image flex-shrink-0">
          {/* Profile Picture with Robust Loading */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-[3px] bg-gradient-to-tr from-brand-orange via-brand-ruby to-brand-purple shadow-lg">
             <div className="w-full h-full rounded-full bg-white dark:bg-[#151515] p-[3px]">
                <img 
                  src={profile.profilePicUrlHD || profile.profilePicUrl} 
                  alt={profile.username} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                />
             </div>
          </div>
          {profile.isVerified && (
            <div className="absolute bottom-2 right-2 bg-brand-teal text-white p-1 rounded-full border-4 border-white dark:border-[#151515] shadow-sm z-10">
              <BadgeCheck className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left relative z-10 w-full flex flex-col justify-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
              {profile.fullName}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-4 text-brand-orange font-medium">
              <span>@{profile.username}</span>
              {profile.isVerified && (
                <BadgeCheck className="w-4 h-4 text-brand-teal" />
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mb-6 leading-relaxed mx-auto sm:mx-0">
              {profile.biography}
            </p>
          </div>
          
          {/* Inline Stats Row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-4 w-full">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 group cursor-default"
              >
                <div className={`p-2 rounded-full ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats / Highlights - High Vibrancy Version */}
      <div className="bg-white dark:bg-brand-card border border-brand-ruby/10 dark:border-brand-ruby/30 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden shadow-sm dark:shadow-[0_0_30px_-5px_rgba(154,3,30,0.3)] transition-all duration-300 group hover:border-brand-ruby/50">
        {/* Intense Background Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-ruby/20 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-ruby to-transparent opacity-80" />

        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-200 mb-6 relative z-10">Engagement Score</h3>
        <div className="flex items-baseline gap-3 mb-3 relative z-10">
          {/* Enhanced Typography with stronger gradient and drop shadow */}
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ff4d4d] via-brand-ruby to-[#5f0f40] drop-shadow-[0_0_20px_rgba(255,77,77,0.4)]">A+</span>
          <span className="text-base font-bold text-brand-ruby dark:text-[#ff4d4d] pb-1 tracking-wide">Excellent</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-white/5 h-3 rounded-full mb-4 relative z-10 overflow-hidden ring-1 ring-white/5">
          {/* Animated Vibrant Progress Bar */}
          <div className="w-[92%] h-full bg-gradient-to-r from-brand-ruby via-[#ff4d4d] to-brand-orange rounded-full shadow-[0_0_15px_rgba(255,77,77,0.6)] relative overflow-hidden">
             <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10">
          This profile performs better than <span className="text-brand-ruby dark:text-[#ff4d4d] font-bold">92%</span> of accounts in a similar niche.
        </p>
      </div>
    </div>
  );
};
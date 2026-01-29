export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  profilePicUrlHD?: string;
  followersCount: number;
  followsCount: number;
  mediaCount: number;
  isVerified: boolean;
}

export interface InstagramPost {
  id: string;
  caption: string;
  likes: number;
  comments: number;
  media_type: 'photo' | 'video' | 'carousel';
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  engagement_rate: number;
}

export interface AnalyticsSummary {
  avg_likes: number;
  avg_comments: number;
  overall_engagement_rate: number;
  total_engagements: number;
  best_post: {
    id: string;
    likes: number;
    comments: number;
  };
}

export interface AnalyticsData {
  profile: InstagramProfile;
  posts: InstagramPost[];
  analytics: AnalyticsSummary;
}

export interface ApiResponse {
  success: boolean;
  username: string;
  request_id: string;
  data?: AnalyticsData;
  error?: string;
}

export type AppState = 'LANDING' | 'LOADING' | 'DASHBOARD' | 'ERROR';
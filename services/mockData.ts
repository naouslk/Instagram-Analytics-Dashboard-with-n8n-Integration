import { AnalyticsData } from '../types';

export const MOCK_DATA: AnalyticsData = {
  profile: {
    username: "tech_visionary",
    fullName: "Alex Rivera",
    biography: "Building the future of tech 🚀 | AI Enthusiast | Speaker",
    profilePicUrl: "https://picsum.photos/200",
    profilePicUrlHD: "https://picsum.photos/400",
    followersCount: 125400,
    followsCount: 450,
    mediaCount: 342,
    isVerified: true
  },
  posts: [
    {
      id: "p1",
      caption: "The future of AI is here. #tech #ai",
      likes: 12500,
      comments: 340,
      media_type: "photo",
      media_url: "https://picsum.photos/600/600?random=1",
      timestamp: "2023-10-25T10:00:00Z",
      engagement_rate: 10.2
    },
    {
      id: "p2",
      caption: "Behind the scenes at the conference 🎥",
      likes: 8900,
      comments: 120,
      media_type: "video",
      media_url: "https://picsum.photos/600/600?random=2",
      timestamp: "2023-10-24T14:30:00Z",
      engagement_rate: 7.2
    },
    {
      id: "p3",
      caption: "New setup tour! 🖥️ Link in bio.",
      likes: 15600,
      comments: 890,
      media_type: "carousel",
      media_url: "https://picsum.photos/600/600?random=3",
      timestamp: "2023-10-22T09:15:00Z",
      engagement_rate: 13.1
    },
    {
      id: "p4",
      caption: "Morning coffee and code ☕️",
      likes: 5400,
      comments: 80,
      media_type: "photo",
      media_url: "https://picsum.photos/600/600?random=4",
      timestamp: "2023-10-20T08:00:00Z",
      engagement_rate: 4.3
    },
    {
      id: "p5",
      caption: "Collaboration with @design_daily",
      likes: 22100,
      comments: 1200,
      media_type: "photo",
      media_url: "https://picsum.photos/600/600?random=5",
      timestamp: "2023-10-18T18:00:00Z",
      engagement_rate: 18.5
    },
    {
      id: "p6",
      caption: "Sunday vibes",
      likes: 4300,
      comments: 45,
      media_type: "photo",
      media_url: "https://picsum.photos/600/600?random=6",
      timestamp: "2023-10-15T12:00:00Z",
      engagement_rate: 3.5
    },
    {
      id: "p7",
      caption: "Q&A Session - Drop your questions below!",
      likes: 6700,
      comments: 1500,
      media_type: "video",
      media_url: "https://picsum.photos/600/600?random=7",
      timestamp: "2023-10-12T16:20:00Z",
      engagement_rate: 6.5
    }
  ],
  analytics: {
    avg_likes: 10785,
    avg_comments: 596,
    overall_engagement_rate: 9.1,
    total_engagements: 79665,
    best_post: {
      id: "p5",
      likes: 22100,
      comments: 1200
    }
  }
};
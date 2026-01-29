import React from 'react';
import { AnalyticsSummary } from '../../types';
import { Heart, MessageCircle, BarChart2, Zap } from 'lucide-react';
import { Card } from '../ui/Card';

interface MetricsGridProps {
  analytics: AnalyticsSummary;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ analytics }) => {
  const items = [
    {
      label: 'Avg. Likes',
      value: analytics.avg_likes.toLocaleString(),
      icon: Heart,
      color: 'text-brand-ruby',
      bg: 'bg-brand-ruby/10'
    },
    {
      label: 'Avg. Comments',
      value: analytics.avg_comments.toLocaleString(),
      icon: MessageCircle,
      color: 'text-brand-teal',
      bg: 'bg-brand-teal/10'
    },
    {
      label: 'Engagement Rate',
      value: `${analytics.overall_engagement_rate}%`,
      icon: Zap,
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10'
    },
    {
      label: 'Total Interactions',
      value: new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(analytics.total_engagements),
      icon: BarChart2,
      color: 'text-brand-purple',
      bg: 'bg-brand-purple/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {items.map((item, index) => (
        <Card key={index} className="flex items-center gap-4 hover:border-brand-orange/30 transition-colors cursor-default">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
            <item.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{item.label}</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</h4>
          </div>
        </Card>
      ))}
    </div>
  );
};
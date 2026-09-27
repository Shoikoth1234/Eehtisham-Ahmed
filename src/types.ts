export type ProjectCategory = 'all' | 'youtube' | 'shorts' | 'saas' | 'ads' | 'design';

export interface VideoProject {
  id: string;
  title: string;
  category: 'youtube' | 'shorts' | 'saas' | 'ads';
  videoId?: string;
  youtubeUrl?: string;
  thumbnailUrl: string;
  duration?: string;
  resolution?: string;
  tags: string[];
  metrics?: {
    views?: string;
    retention?: string;
    subscribers?: string;
  };
  isShort?: boolean;
  isComingSoon?: boolean;
  comingSoonBadge?: string;
  client?: string;
  description?: string;
}

export interface GraphicDesignProject {
  id: string;
  title: string;
  category: 'thumbnail' | 'branding' | 'poster' | 'social';
  image: string;
  description: string;
  tools: string[];
  aspectRatio: '16:9' | '1:1' | '4:5';
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  videoPreviewUrl?: string;
  rating: number;
  stats: {
    viewsBadge: string;
    subsBadge: string;
  };
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  description: string;
  growthStat: string;
  growthLabel: string;
  viewsStat: string;
  viewsLabel: string;
  previewUrl: string;
  reversed?: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  isPopular?: boolean;
  features: string[];
  buttonText: string;
  ctaAction: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  projectType: string;
  date: string;
  timeSlot: string;
  notes: string;
}

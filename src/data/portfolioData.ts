import { VideoProject, GraphicDesignProject, MetricItem, Testimonial, CaseStudy, ProcessStep, PricingPlan, FaqItem } from '../types';

export const BRAND_INFO = {
  name: 'Eehtisham',
  logoUrl: 'https://i.postimg.cc/Kv6XNNXg/Eehtisham-Ahmed.jpg',
  tagline: 'Senior Video Editor & Motion Artist',
  role: 'Senior Video Editor & Motion Designer',
};

export const SOCIAL_LINKS = {
  behance: 'https://www.behance.net/eehtisham',
  youtube: 'https://www.youtube.com/@Eehtisham2004',
  instagram: 'https://www.instagram.com/eehtisham.uiux/',
  facebook: 'https://facebook.com',
};

export const METRICS_DATA: MetricItem[] = [
  { id: 'm1', value: '50%', label: 'More Engagement' },
  { id: 'm2', value: '32%', label: 'Viral Edits' },
  { id: 'm3', value: '40%', label: 'More Reach' },
  { id: 'm4', value: '30%', label: 'Strategic Distribution' },
  { id: 'm5', value: '20%', label: 'Automated Systems' },
];

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: 'vid-youtube-1',
    title: 'High-Retention Dynamic Narrative & Kinetic Motion',
    category: 'youtube',
    videoId: '3_dCjH9rCEE',
    youtubeUrl: 'https://youtu.be/3_dCjH9rCEE?si=0bvxUuTdC8m3lO2a',
    thumbnailUrl: 'https://i.ytimg.com/vi/3_dCjH9rCEE/hqdefault.jpg',
    duration: '08:42',
    resolution: '4K • 60FPS',
    tags: ['YouTube Edit', 'Sound Design', 'Kinetic Motion'],
    client: 'Featured Creator',
    metrics: { views: '480K+', retention: '72%' },
    description: 'High-retention YouTube storytelling featuring custom sound design, fluid kinetic cuts, and cinematic color grading.'
  },
  {
    id: 'vid-youtube-2',
    title: 'Cinematic Storytelling & Visual Flow',
    category: 'youtube',
    videoId: 'euuEzA8jfZc',
    youtubeUrl: 'https://youtu.be/euuEzA8jfZc?si=8OXVyoGIrrdg9HwM',
    thumbnailUrl: 'https://i.ytimg.com/vi/euuEzA8jfZc/hqdefault.jpg',
    duration: '06:55',
    resolution: '4K • 60FPS',
    tags: ['Cinematic B-Roll', 'Sound Design', 'Color Grade'],
    client: 'Studio Spotlight',
    metrics: { views: '390K+', retention: '69%' },
    description: 'Engaging narrative pacing, crisp visual transitions, and audio-reactive sound effects engineered for audience retention.'
  },
  {
    id: 'vid-youtube-3',
    title: 'Creator Micro 2 - Sound & Motion Master',
    category: 'youtube',
    videoId: 'DV3tNChkCvE',
    youtubeUrl: 'https://youtu.be/DV3tNChkCvE?si=UzXJ88Sy1on5cZxn',
    thumbnailUrl: 'https://i.ytimg.com/vi/DV3tNChkCvE/hqdefault.jpg',
    duration: '10:48',
    resolution: '4K • 60FPS',
    tags: ['Tech Showcase', 'Sound Design', 'Color Grading'],
    client: 'Studio Hardware Lab',
    metrics: { views: '520K+', retention: '74%' },
    description: 'Cinematic hardware showcase featuring macro lens zooms, precise spatial sound design, and custom 3D keyframe motion overlays.'
  },
  {
    id: 'vid-youtube-showcase-4',
    title: 'Skill Is a Key of Success by Nazmul Huda Sir | As Sunnah Skill Development Institute',
    category: 'youtube',
    videoId: 'RhtRS8fpfFw',
    youtubeUrl: 'https://youtu.be/RhtRS8fpfFw?si=q0GbKZEI10a9-XDN',
    thumbnailUrl: 'https://i.ytimg.com/vi/RhtRS8fpfFw/hqdefault.jpg',
    duration: '04:15',
    resolution: '4K • 60FPS',
    tags: ['Documentary Edit', 'Sound Design', 'Visual Storytelling'],
    client: 'As-Sunnah Skill Development Institute',
    metrics: { views: '150K+', retention: '78%' },
    description: 'Cinematic documentary storytelling, speech audio mastering, and engaging visual pacing.'
  },
  {
    id: 'vid-short-starbucks',
    title: 'Starbucks Motion Design',
    category: 'shorts',
    videoId: 'QDxOSWig1D8',
    youtubeUrl: 'https://youtube.com/shorts/QDxOSWig1D8?si=0-EDiN4qUS6q-fpH',
    thumbnailUrl: 'https://i.ytimg.com/vi/QDxOSWig1D8/maxresdefault.jpg',
    duration: '00:30',
    resolution: '1080x1920 • 9:16',
    isShort: true,
    tags: ['Motion Design', 'Product Reel', '3D Fluids'],
    client: 'Starbucks Concept Reel',
    metrics: { views: '180K+', retention: '112%' },
    description: 'Commercial product motion design reel featuring liquid dynamics, kinetic typography, and punchy sound design.'
  },
  {
    id: 'vid-short-branding-secret',
    title: 'The Branding Secret No One Tells',
    category: 'shorts',
    videoId: 'eFxaLZLx_Ow',
    youtubeUrl: 'https://youtube.com/shorts/eFxaLZLx_Ow?si=kbFKHIcUEIF-oHav',
    thumbnailUrl: 'https://i.ytimg.com/vi/eFxaLZLx_Ow/maxresdefault.jpg',
    duration: '00:45',
    resolution: '1080x1920 • 9:16',
    isShort: true,
    tags: ['Branding Secret', 'Kinetic Typography', 'High Retention'],
    client: 'Eehtisham Brand Talks',
    metrics: { views: '240K+', retention: '124%' },
    description: 'Psychological hook storytelling, rapid pattern interrupts, dynamic text animation, and engaging voiceover pacing.'
  },
  {
    id: 'vid-short-ideas-into-visual',
    title: 'Turning Ideas Into Visual',
    category: 'shorts',
    videoId: 'iRxi6U4z-IQ',
    youtubeUrl: 'https://youtube.com/shorts/iRxi6U4z-IQ?si=aW-0hGF76hCgaXEq',
    thumbnailUrl: 'https://i.ytimg.com/vi/iRxi6U4z-IQ/maxresdefault.jpg',
    duration: '00:40',
    resolution: '1080x1920 • 9:16',
    isShort: true,
    tags: ['Creative Process', 'Visual Story', 'Sound Design'],
    client: 'Eehtisham Ahmed',
    metrics: { views: '310K+', retention: '119%' },
    description: 'Creative visual transformation edit with seamless masking transitions, sound effects, and fast-paced motion graphics.'
  },
  {
    id: 'vid-viral-short',
    title: 'As Sunnah Admission Ad',
    category: 'shorts',
    videoId: 'dd0b5r9lxHE',
    youtubeUrl: 'https://youtube.com/shorts/dd0b5r9lxHE?si=Sb9pPF7kR3uAbv2G',
    thumbnailUrl: 'https://i.ytimg.com/vi/dd0b5r9lxHE/maxresdefault.jpg',
    duration: '00:48',
    resolution: '1080x1920 • 9:16',
    isShort: true,
    tags: ['Shorts / Reels', 'Kinetic Typography', 'Sound FX'],
    client: 'As-Sunnah Skill Development Institute',
    metrics: { views: '1.2M', retention: '114%' },
    description: 'Ultra-fast pacing, dynamic kinetic subtitles, sound effects every 2.4 seconds, and smooth masking transitions designed for vertical feeds.'
  },
  {
    id: 'vid-coming-soon-1',
    title: 'Next-Gen 3D Motion Showreel',
    category: 'ads',
    videoId: 'DV3tNChkCvE',
    youtubeUrl: 'https://youtu.be/DV3tNChkCvE?si=c2fytxXZSGVBVXtI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    duration: '02:00',
    resolution: '8K Master',
    tags: ['Cinema 4D', 'Raytracing', 'Commercial VSL'],
    client: 'Global Tech Brand',
    metrics: { views: '890K', retention: '72%' },
    description: 'Commercial 3D VSL with photorealistic ray-tracing, kinetic camera pans, and spatial Dolby sound.'
  },
  {
    id: 'vid-minimal-design',
    title: 'Minimalist Desk Setup & Creator Workflow',
    category: 'youtube',
    videoId: 'DV3tNChkCvE',
    youtubeUrl: 'https://youtu.be/DV3tNChkCvE?si=c2fytxXZSGVBVXtI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1200&auto=format&fit=crop',
    duration: '08:14',
    resolution: '4K • 60FPS',
    tags: ['Desk Setup', 'Cinematic B-Roll', 'Color Grade'],
    client: 'Studio Minimal',
    metrics: { views: '420K', retention: '74%' },
    description: 'Clean aesthetic studio tour emphasizing soft lighting, precise foley sound effects, and color grading.'
  },
  {
    id: 'vid-cyber-motion',
    title: 'Futuristic Cyber Interface & HUD Pack',
    category: 'saas',
    videoId: 'DV3tNChkCvE',
    youtubeUrl: 'https://youtu.be/DV3tNChkCvE?si=c2fytxXZSGVBVXtI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    duration: '03:45',
    resolution: '4K UHD',
    tags: ['HUD Elements', 'UI Animations', 'Tech Promo'],
    client: 'CyberGrid Labs',
    metrics: { views: '280K', retention: '66%' },
    description: 'Neon HUD overlays, holographic data visualizations, and fast-paced tech demo reel.'
  },
  {
    id: 'vid-ecommerce-vsl',
    title: 'E-Commerce Luxury Product Launch VSL',
    category: 'ads',
    videoId: 'DV3tNChkCvE',
    youtubeUrl: 'https://youtu.be/DV3tNChkCvE?si=c2fytxXZSGVBVXtI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    duration: '01:30',
    resolution: '4K DCI',
    tags: ['Direct Response', 'Macro Lens', 'VSL'],
    client: 'Aura Watches',
    metrics: { views: '1.8M', retention: '88%' },
    description: 'High-conversion visual sales letter engineered for paid meta ads with macro product lighting.'
  }
];

export const GRAPHIC_DESIGN_PROJECTS: GraphicDesignProject[] = [
  {
    id: 'gd-1',
    title: 'High CTR YouTube Thumbnail Design',
    category: 'thumbnail',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    description: 'Custom 3D typography, facial expression color pop, and cinematic depth-of-field designed for 14.5%+ click-through rate.',
    tools: ['Photoshop', 'Blender', 'Colorist Pro'],
    aspectRatio: '16:9'
  },
  {
    id: 'gd-2',
    title: 'Cyberpunk Sound & Motion Key Visuals',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    description: 'Complete brand identity kit, channel art, Lower Thirds vector system, and Twitch/YouTube live broadcast overlays.',
    tools: ['Illustrator', 'After Effects', 'Figma'],
    aspectRatio: '16:9'
  },
  {
    id: 'gd-3',
    title: 'Abstract Geometric Typographic Posters',
    category: 'poster',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    description: 'Minimalist editorial poster compositions experimenting with brutalist grid systems and high-contrast monochrome layouts.',
    tools: ['InDesign', 'Photoshop'],
    aspectRatio: '4:5'
  },
  {
    id: 'gd-4',
    title: 'Performance Paid Social Ad Creatives',
    category: 'social',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    description: 'High-conversion carousel graphic suite crafted for Instagram, TikTok ads, and meta performance campaigns.',
    tools: ['Figma', 'Photoshop'],
    aspectRatio: '1:1'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote: 'Unforgettable video experience! Each edit was a masterpiece, and the seamless transitions made the final product even more special. Every frame told a story, creating a lasting impression',
    author: 'Muzamal Hussain',
    role: 'YouTube Creator',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    stats: {
      viewsBadge: '100x views',
      subsBadge: '1M+ subscriber'
    }
  },
  {
    id: 't2',
    quote: 'Turned our raw recording footage into our highest-performing YouTube video of the quarter. The motion graphics and hook pacing are world-class.',
    author: 'Sarah Jenkins',
    role: 'Head of Growth at Apex Tech',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    stats: {
      viewsBadge: '3.4M total reach',
      subsBadge: '+45k followers'
    }
  },
  {
    id: 't3',
    quote: 'Communication is prompt, creative suggestions elevate the script, and delivery is consistently ahead of deadline. A true creative partner.',
    author: 'David Vance',
    role: 'Host, The Financial Pulse',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    stats: {
      viewsBadge: '+187% watch time',
      subsBadge: '120k active subs'
    }
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    tag: 'CLIENT SUCCESS',
    title: 'Scaling a finance channel with performance edits',
    description: 'A personal finance creator partnered with us to sharpen pacing, tighten structure, and optimise content for long-form YouTube and short-form distribution.',
    growthStat: '+187%',
    growthLabel: 'Subscriber Growth',
    viewsStat: '244k',
    viewsLabel: 'New Views',
    previewUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop',
    reversed: false
  },
  {
    id: 'cs-2',
    tag: 'CLIENT SUCCESS',
    title: 'Turning a podcast into a growth channel',
    description: 'A weekly podcast partnered with us to transform long-form episodes into short-form clips for TikTok, Reels, and YouTube Shorts—focused on discoverability and consistent output.',
    growthStat: '+147%',
    growthLabel: 'Audience Growth',
    viewsStat: '414k',
    viewsLabel: 'New Views',
    previewUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    reversed: true
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Strategy Call',
    description: 'We define your content goals, audience, and deliverable style direction.',
    iconName: 'Compass'
  },
  {
    step: '02',
    title: 'Editing & Motion',
    description: 'Our editors craft a high-retention cut with captions, motion, polish, & pacing.',
    iconName: 'Wand2'
  },
  {
    step: '03',
    title: 'Publish & Scale',
    description: 'Final exports are organized by platform so your team can post without friction.',
    iconName: 'Rocket'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '$599',
    period: '/month',
    description: 'Perfect for creators needing weekly shorts.',
    isPopular: false,
    features: [
      'One active editing request',
      'Brand-consistent editing style',
      'Motion graphics & basic animations',
      '24-72 hour average turnaround'
    ],
    buttonText: 'Start your project',
    ctaAction: 'starter'
  },
  {
    id: 'growth',
    name: 'GROWTH',
    price: '$899',
    period: '/month',
    description: 'Best for brands scaling short + ad creatives',
    isPopular: true,
    features: [
      'Three active editing requests',
      'Customizable editing styles',
      'Advanced motion graphics & animations',
      '12-48 hour average turnaround'
    ],
    buttonText: 'Upgrade now',
    ctaAction: 'growth'
  },
  {
    id: 'agency',
    name: 'AGENCY',
    price: 'CUSTOM',
    period: '',
    description: 'High-volume editing with dedicated team',
    isPopular: false,
    features: [
      'Unlimited active editing requests',
      'Tailored brand editing style',
      'Complex animations & graphics',
      '6-24 hour average turnaround'
    ],
    buttonText: 'Join the premium tier',
    ctaAction: 'custom'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What types of videos do you edit?',
    answer: 'We edit short videos, YouTube content, ads, and podcast videos for creators and brands.'
  },
  {
    id: 'faq-2',
    question: 'How fast can you deliver my video?',
    answer: 'Turnaround depends on your plan: short-form clips and reels are usually delivered in 12–24 hours, while complex long-form cuts or heavy 3D motion graphics take 24–48 hours.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer revisions if needed?',
    answer: 'Yes! We believe in 100% client satisfaction and provide iterative revisions until the cut meets your standard of perfection and brand guidelines.'
  },
  {
    id: 'faq-4',
    question: 'Can you improve my content flow?',
    answer: 'Absolutely. We analyze viewer retention curves, hook drop-offs, and pacing to introduce sound effects, punch-ins, graphics, and B-roll that keep audience retention high.'
  },
  {
    id: 'faq-5',
    question: 'How do we start working together?',
    answer: 'Click "Book a call" or pick a pricing plan. We will hop on a brief strategy sync, set up your shared folder/dashboard, and begin receiving your raw footage right away.'
  },
  {
    id: 'faq-6',
    question: 'Do you edit for social media?',
    answer: 'Yes, we are specialists in vertical short-form content tailored for YouTube Shorts, Instagram Reels, and TikTok algorithms, as well as high-performing Meta video ads.'
  }
];

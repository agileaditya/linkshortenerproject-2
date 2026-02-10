// Video URL configuration
// 🚀 BEST OPTION: Add local video files to public/videos/
// Check docs/video-setup.md for detailed instructions

export const VIDEO_URLS = {
  // Landing page: Tech workspace background
  // Add your video file: public/videos/tech-workspace.mp4
  landing: {
    primary: '/videos/tech-workspace.mp4',
    fallback: '/videos/tech-workspace-fallback.mp4',
  },

  // Dashboard: Analytics/Data visualization theme
  // Add your video file: public/videos/analytics-dashboard.mp4
  dashboard: {
    primary: '/videos/analytics-dashboard.mp4',
    fallback: '/videos/analytics-dashboard-fallback.mp4',
  },
};

export const VIDEO_SOURCES = {
  // Free video sources for tech-related content:
  // 1. Pexels Videos: https://www.pexels.com/search/videos/tech/
  // 2. Pixabay Videos: https://pixabay.com/videos/search/coding/
  // 3. Unsplash Videos: https://unsplash.com/napi/search/videos
  // 4. Coverr: https://coverr.co/search?q=tech

  // Popular free videos:
  recommended: [
    {
      name: 'Computer Code',
      url: 'https://videos.pexels.com/video-files/855370/855370-hd_1920_1080_30fps.mp4',
      source: 'Pexels',
      theme: 'workspace',
    },
    {
      name: 'Data Analysis',
      url: 'https://videos.pexels.com/video-files/3138827/3138827-hd_1920_1080_30fps.mp4',
      source: 'Pexels',
      theme: 'analytics',
    },
    {
      name: 'Typing on Keyboard',
      url: 'https://videos.pexels.com/video-files/1239291/1239291-hd_1920_1080_24fps.mp4',
      source: 'Pexels',
      theme: 'workspace',
    },
    {
      name: 'Technology Background',
      url: 'https://videos.pexels.com/video-files/8085/8085-hd_1920_1080_24fps.mp4',
      source: 'Pexels',
      theme: 'tech',
    },
    {
      name: 'Business Analytics',
      url: 'https://videos.pexels.com/video-files/3944645/3944645-hd_1920_1080_30fps.mp4',
      source: 'Pexels',
      theme: 'analytics',
    },
  ],
};

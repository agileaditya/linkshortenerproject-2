# Background Video Setup Guide

This guide explains how to add work-related tech background videos to your Link Shortener app.

## Video Configuration

The app is configured to use two background videos:

1. **Landing Page** (`/videos/tech-workspace.mp4`)
   - Theme: Tech workspace, coding environment
   - Duration: 10-30 seconds (will loop)
   - Recommended aspect ratio: 16:9

2. **Dashboard Page** (`/videos/analytics-dashboard.mp4`)
   - Theme: Analytics, data visualization, metrics
   - Duration: 10-30 seconds (will loop)
   - Recommended aspect ratio: 16:9

## How to Add Videos

### Option 1: Use Free Stock Videos (Recommended)

Download free, work-related tech videos from:

- **Pexels Videos**: https://www.pexels.com/search/videos/coding/
  - Search for: "coding", "tech", "data", "analytics"
  - Free, high quality, no attribution required

- **Pixabay Videos**: https://pixabay.com/videos/search/coding/
  - Search for: "coding", "technology", "data"
  - Free, HD quality available

- **Unsplash Videos**: https://unsplash.com/napi/search/videos
  - Search for: "tech workspace", "programming"

### Option 2: Create Custom Videos

If you prefer custom videos, you can:
- Record your own tech workspace video
- Use screen recording tools (OBS Studio, ScreenFlow)
- Export as MP4 format, optimized for web

### Option 3: Use CDN URLs

Replace `/videos/tech-workspace.mp4` in components with direct video URLs:

**Landing Page** - Tech workspace example:
```tsx
<BackgroundVideo videoSrc="https://cdn.pixabay.com/vimeo/[video-id].mp4">
```

**Dashboard** - Analytics example:
```tsx
<BackgroundVideo videoSrc="https://cdn.pexels.com/videos/[video-id]/[file].mp4">
```

## Steps to Add Local Videos

1. Download your chosen videos (convert to MP4 if needed)
2. Place them in `public/videos/` directory:
   - `public/videos/tech-workspace.mp4`
   - `public/videos/analytics-dashboard.mp4`
3. Ensure video file sizes are optimized (2-5MB each for fast loading)
4. Videos will automatically loop and autoplay (muted)

## Video Format Requirements

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (1080p) or higher
- **Frame Rate**: 30fps or 60fps
- **Bitrate**: 2-5 Mbps (for web optimization)
- **Aspect Ratio**: 16:9 (widescreen)

## Optimization Tips

Before deploying, optimize your videos:

```bash
# Using FFmpeg to compress video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
```

- `-crf 23`: Quality (0-51, lower = better, default 28)
- `-b:a 128k`: Audio bitrate
- Results in 2-5MB files suitable for streaming

## Current Implementation

The `BackgroundVideo` component in `components/BackgroundVideo.tsx` provides:

- ✅ Autoplay (muted for policy compliance)
- ✅ Looping playback
- ✅ Mobile-friendly (playsInline)
- ✅ Dark overlay for text readability
- ✅ Responsive sizing
- ✅ Fallback for browsers without video support

## Customization

You can customize the overlay darkness by modifying `BackgroundVideo.tsx`:

```tsx
// Current: 50% darkness
<div className="absolute inset-0 bg-black/50" />

// Lighter overlay:
<div className="absolute inset-0 bg-black/30" />

// Darker overlay:
<div className="absolute inset-0 bg-black/70" />
```

## Browser Compatibility

The video implementation works on:
- Chrome/Edge (full support)
- Firefox (full support)
- Safari (full support)
- Mobile browsers (iOS 9.3+, Android 5.0+)

## Notes

- Videos are muted (required for autoplay on most browsers)
- Overlay prevents text from being too bright/unreadable
- Videos loop seamlessly
- Component respects responsive design

---

Once you've added the video files, the backgrounds will automatically display! 🎬

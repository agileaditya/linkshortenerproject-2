# Quick Video Setup Guide

## What's Happening Now?
Your app now has an **animated gradient background with pulsing blobs** that looks great! If you add video files, they'll automatically replace this background.

## How to Add Videos (3 Easy Steps)

### Step 1: Download Videos
Get free tech-related videos from:
- **Pexels**: https://www.pexels.com/search/videos/coding/
- **Pixabay**: https://pixabay.com/videos/search/tech/
- **Unsplash**: https://unsplash.com/napi/search/videos

**For Landing Page**: Search for "coding", "tech workspace", "programming"  
**For Dashboard**: Search for "analytics", "data", "metrics"

### Step 2: Place Videos in Your Project
Create the folder structure and add your videos:

```
public/
  videos/
    tech-workspace.mp4          (Landing page video)
    tech-workspace-fallback.mp4 (Landing page fallback)
    analytics-dashboard.mp4     (Dashboard video)
    analytics-dashboard-fallback.mp4 (Dashboard fallback)
```

### Step 3: Refresh Your Browser
Once files are in the `public/videos/` folder, refresh and your videos will play!

## Video Requirements
- **Format**: MP4 (H.264 codec)
- **Size**: 2-5 MB each (optimize with FFmpeg)
- **Resolution**: 1080p or higher
- **Duration**: 10-30 seconds (loops automatically)

## Optimize Your Videos
If your video is too large, compress it:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
```

## How It Works
1. App tries to load your local video from `public/videos/`
2. If video plays → you'll see it with the dark overlay
3. If video fails → animated gradient background displays
4. Either way, your page looks professional! ✨

## Recommended Videos
Save these links for later:
- Computer Code: https://www.pexels.com/video/computer-code-855370/
- Typing: https://www.pexels.com/video/person-typing-on-keyboard-1239291/
- Technology: https://www.pexels.com/video/technology-956981/
- Data/Analytics: https://www.pexels.com/video/data-analysis-3138827/

---

Your app looks great with the current animated background. Add videos whenever you're ready! 🎬

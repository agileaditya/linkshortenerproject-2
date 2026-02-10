'use client';

import { useState } from 'react';
import { TechVideoBackground } from './TechVideoBackground';

interface BackgroundVideoProps {
  videoSrc: string;
  fallbackSrc?: string;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: 'light' | 'medium' | 'dark';
  gradientFallback?: string;
  useTechAnimation?: boolean;
}

const overlayMap = {
  light: 'bg-black/30',
  medium: 'bg-black/50',
  dark: 'bg-black/70',
};

export function BackgroundVideo({
  videoSrc,
  children,
  className = '',
  overlayOpacity = 'medium',
  gradientFallback = 'bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950',
  useTechAnimation = true,
}: BackgroundVideoProps) {
  const [showVideo, setShowVideo] = useState(true);

  const handleVideoCanPlay = () => {
    console.log('✅ Video loaded successfully');
  };

  const handleVideoError = () => {
    console.log('⚠️ Video failed to load, using animated tech background');
    setShowVideo(false);
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${!showVideo ? gradientFallback : 'bg-black'} ${className}`}>
      {/* Video Background (if available) */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          crossOrigin="anonymous"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Tech Animation Background (if video fails and useTechAnimation is true) */}
      {!showVideo && useTechAnimation && <TechVideoBackground />}

      {/* Animated Background (visible if video fails and useTechAnimation is false) */}
      {!showVideo && !useTechAnimation && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient blobs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite' }} />
          <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite' }} />
        </div>
      )}

      {/* Dark Overlay for better text readability */}
      <div className={`absolute inset-0 ${overlayMap[overlayOpacity]}`} />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { VIDEO_URLS } from "@/lib/videoConfig";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn) return null;

  return (
    <SignedOut>
      <BackgroundVideo 
        videoSrc={VIDEO_URLS.landing.primary}
        fallbackSrc={VIDEO_URLS.landing.fallback}
        gradientFallback="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950"
        useTechAnimation={true}
      >
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          {/* Tech grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

          {/* Content */}
          <main className="relative flex flex-col items-center justify-center gap-8 px-4 z-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Link Shortener
            </h1>
          </div>
          <p className="text-center text-lg text-slate-300 max-w-md">
            Create shortened URLs and track analytics with enterprise-grade precision
          </p>
          <div className="flex gap-4 mt-2">
            <SignInButton mode="modal">
              <Button className="rounded-full">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outline" className="rounded-full">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </main>
        </div>
      </BackgroundVideo>
    </SignedOut>
  );
}

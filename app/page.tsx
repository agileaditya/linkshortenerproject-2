'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { VIDEO_URLS } from "@/lib/videoConfig";
import { useEffect } from "react";
import { 
  Link2, 
  BarChart3, 
  Zap, 
  Lock, 
  Share2, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Globe,
  Users,
  Rocket,
  Shield,
  Sparkles,
  Activity
} from "lucide-react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn) return null;

  const features = [
    {
      icon: Link2,
      title: "Instant URL Shortening",
      description: "Transform long URLs into clean, shareable links in seconds",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track clicks, geographic data, and user behavior with detailed insights",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Enterprise-grade infrastructure ensures instant redirects and minimal latency",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Lock,
      title: "Secure & Reliable",
      description: "Military-grade encryption keeps your data safe and protected",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Copy and share shortened URLs with one click to any platform",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "Understand your audience with comprehensive analytics dashboards",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const stats = [
    { label: "Links Created", value: "100K+", icon: Link2 },
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Clicks Tracked", value: "10M+", icon: Activity },
    { label: "Uptime", value: "99.9%", icon: Shield },
  ];

  return (
    <SignedOut>
      {/* Hero Section */}
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/30">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Powered by advanced technology</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Shorten. Track. Analyze.
              </h1>
              <p className="text-center text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
                Create beautiful shortened URLs and unlock powerful analytics to understand your audience. All with enterprise-grade reliability and security.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <SignUpButton mode="modal">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="outline" className="rounded-full border-cyan-500/50 text-white hover:bg-cyan-500/10">
                  Sign In
                </Button>
              </SignInButton>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <Icon className="w-6 h-6 text-cyan-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400 text-center">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </BackgroundVideo>

      {/* Features Section */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Every Need
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Everything you need to shorten, track, and optimize your links with professional analytics and seamless integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white text-lg mt-1">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative bg-gradient-to-b from-slate-950 to-blue-950 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple Three-Step Process
            </h2>
            <p className="text-lg text-slate-400">
              Get started in minutes and start tracking your links today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: 1,
                title: "Paste Your URL",
                description: "Enter any long URL into our simple, intuitive interface",
                icon: Globe,
              },
              {
                step: 2,
                title: "Get Short Link",
                description: "Instantly receive a clean, memorable shortened link",
                icon: Link2,
              },
              {
                step: 3,
                title: "Track & Analyze",
                description: "Monitor clicks, traffic sources, and user behavior in real-time",
                icon: TrendingUp,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30 group hover:shadow-xl hover:shadow-cyan-500/50 transition-shadow">
                        <span className="text-3xl font-bold text-white">{item.step}</span>
                      </div>
                      {index < 2 && (
                        <div className="absolute left-[calc(100%+24px)] top-8 w-12 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent hidden md:block" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative bg-gradient-to-b from-blue-950 to-slate-950 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Link Shortener?
            </h2>
            <p className="text-lg text-slate-400">
              Built for professionals who demand reliability and insight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Zap, text: "Unlimited URL shortening at no cost" },
              { icon: Globe, text: "Works everywhere - any platform, any link" },
              { icon: BarChart3, text: "Advanced analytics dashboard included" },
              { icon: Shield, text: "Bank-level security and encryption" },
              { icon: Rocket, text: "Sub-millisecond redirect speeds" },
              { icon: Users, text: "Join 50K+ users worldwide" },
            ].map((benefit, index) => {
              const BIcon = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                    <BIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-white">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-7000" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who are already shortening links and gaining valuable insights. Start for free today and take your link management to the next level.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="rounded-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                Start for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10 font-semibold">
                Sign In
              </Button>
            </SignInButton>
          </div>

          <div className="mt-12 inline-flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-5 h-5 text-blue-100" />
            <span className="text-sm">No credit card required • Free forever plans available</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3">
                Link Shortener
              </h3>
              <p className="text-slate-400 text-sm">
                Create shortened URLs and track analytics with enterprise-grade precision
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">URL Shortening</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-center text-sm">
              © 2026 Link Shortener. All rights reserved. Built with ❤️ for creators and professionals.
            </p>
          </div>
        </div>
      </footer>
    </SignedOut>
  );
}

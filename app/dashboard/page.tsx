import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { BackgroundVideo } from '@/components/BackgroundVideo';
import { VIDEO_URLS } from '@/lib/videoConfig';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.userId) redirect('/');

  return (
    <BackgroundVideo 
      videoSrc={VIDEO_URLS.dashboard.primary}
      fallbackSrc={VIDEO_URLS.dashboard.fallback}
      useTechAnimation={true}
    >
      <div className="min-h-screen">
        <h1>Dashboard</h1>
      </div>
    </BackgroundVideo>
  );
}

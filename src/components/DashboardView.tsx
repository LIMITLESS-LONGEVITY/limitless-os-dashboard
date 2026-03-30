import Link from 'next/link'
import AppLauncherWidget from '@/components/widgets/AppLauncherWidget'
import MembershipStatusWidget from '@/components/widgets/MembershipStatusWidget'
import HealthWidget from '@/components/widgets/HealthWidget'
import UpcomingEventsWidget from '@/components/widgets/UpcomingEventsWidget'
import LearningProgressWidget from '@/components/widgets/LearningProgressWidget'
import DailyProtocolWidget from '@/components/widgets/DailyProtocolWidget'
import BiomarkerTrendsWidget from '@/components/widgets/BiomarkerTrendsWidget'
import ActivityFeedWidget from '@/components/widgets/ActivityFeedWidget'
import WearableConnectWidget from '@/components/widgets/WearableConnectWidget'
import GreetingBanner from '@/components/GreetingBanner'

interface UserData {
  sub: string
  email: string
  tier: string
  role: string
  firstName?: string
}

export default function DashboardView({ user }: { user: UserData }) {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="border-b border-brand-glass-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-semibold tracking-[0.12em] text-brand-gold hover:text-brand-gold/80 transition-colors">
            LIMITLESS
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-brand-silver hidden sm:inline">{user.email}</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-gold-dim text-brand-gold capitalize">
              {user.tier}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Greeting */}
        <GreetingBanner
          firstName={user.firstName}
          email={user.email}
          userId={user.sub}
          tier={user.tier}
        />

        {/* App Launcher — full width */}
        <AppLauncherWidget userId={user.sub} />

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthWidget userId={user.sub} />
          <MembershipStatusWidget />
          <UpcomingEventsWidget />
          <LearningProgressWidget />
          <DailyProtocolWidget />
          <ActivityFeedWidget userId={user.sub} />
          <WearableConnectWidget userId={user.sub} />
        </div>

        {/* Biomarker Trends — full width */}
        <BiomarkerTrendsWidget userId={user.sub} />
      </main>
    </div>
  )
}

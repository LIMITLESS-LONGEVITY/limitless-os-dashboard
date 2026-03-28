import HealthWidget from '@/components/widgets/HealthWidget'
import UpcomingEventsWidget from '@/components/widgets/UpcomingEventsWidget'
import LearningProgressWidget from '@/components/widgets/LearningProgressWidget'
import DailyProtocolWidget from '@/components/widgets/DailyProtocolWidget'

interface UserData {
  sub: string
  email: string
  tier: string
  role: string
}

const quickActions = [
  {
    label: 'Book Consultation',
    href: '/book',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    label: 'Ask AI Tutor',
    href: '/learn/discover',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    label: 'View Health',
    href: '/health',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    label: 'Manage Subscription',
    href: '/learn/account',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
]

export default function DashboardView({ user }: { user: UserData }) {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="border-b border-brand-glass-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold tracking-[0.12em] text-brand-gold">
            LIMITLESS
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-brand-silver hidden sm:inline">{user.email}</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-gold-dim text-brand-gold capitalize">
              {user.tier}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-semibold text-brand-light">
            Welcome back
          </h2>
          <p className="text-brand-silver/70 mt-1">
            Your longevity dashboard at a glance.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-brand-glass-border bg-brand-glass-bg p-4 transition-colors hover:bg-brand-glass-bg-hover hover:border-brand-gold/20"
              style={{ WebkitBackdropFilter: 'blur(12px)' }}
            >
              <div className="text-brand-gold">{action.icon}</div>
              <span className="text-sm font-medium text-brand-light">{action.label}</span>
            </a>
          ))}
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthWidget userId={user.sub} />
          <UpcomingEventsWidget />
          <LearningProgressWidget />
          <DailyProtocolWidget />
        </div>
      </main>
    </div>
  )
}

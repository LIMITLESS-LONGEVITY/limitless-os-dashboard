'use client'

import { useEffect, useState } from 'react'

interface GreetingProps {
  firstName?: string
  email: string
  userId: string
  tier: string
}

interface HealthSummary {
  biologicalAge?: number
  chronologicalAge?: number
  topBiomarkers?: { name: string; value: string; status: string }[]
}

interface Enrollment {
  course: { title: string }
  completionPercentage: number
  totalLessons: number
  completedLessons: number
}

function getTimeGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 4 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function getDisplayName(firstName?: string, email?: string): string {
  if (firstName) return firstName
  // Extract name from email as fallback
  const local = email?.split('@')[0] || ''
  return local.charAt(0).toUpperCase() + local.slice(1)
}

function getContextLine(
  health: HealthSummary | null,
  enrollments: Enrollment[] | null,
  streak: number,
): string | null {
  // Priority 1: Bio age improvement (if available)
  if (health?.biologicalAge && health?.chronologicalAge) {
    const diff = health.chronologicalAge - health.biologicalAge
    if (diff > 0) {
      return `Your biological age is ${health.biologicalAge.toFixed(1)} — ${diff.toFixed(1)} years younger than chronological.`
    }
  }

  // Priority 2: Course near completion
  if (enrollments?.length) {
    const nearComplete = enrollments.find(
      (e) => e.completionPercentage >= 60 && e.completionPercentage < 100,
    )
    if (nearComplete) {
      const remaining = nearComplete.totalLessons - nearComplete.completedLessons
      return `You're ${remaining} lesson${remaining !== 1 ? 's' : ''} away from completing ${nearComplete.course.title}.`
    }
  }

  // Priority 3: Active streak
  if (streak >= 3) {
    return `${streak}-day learning streak — keep it going.`
  }

  // Priority 4: Has enrollments in progress
  if (enrollments?.length) {
    const active = enrollments.find((e) => e.completionPercentage > 0 && e.completionPercentage < 100)
    if (active) {
      return `${Math.round(active.completionPercentage)}% through ${active.course.title}.`
    }
  }

  // Fallback
  return 'Your longevity dashboard awaits.'
}

export default function GreetingBanner({ firstName, email, userId, tier }: GreetingProps) {
  const [health, setHealth] = useState<HealthSummary | null>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[] | null>(null)
  const [streak, setStreak] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const [healthRes, enrollRes] = await Promise.allSettled([
          fetch(`/api/twin/${userId}/summary`, { credentials: 'include' }),
          fetch('/learn/api/me/enrollments', { credentials: 'include' }),
        ])

        if (healthRes.status === 'fulfilled' && healthRes.value.ok) {
          setHealth(await healthRes.value.json())
        }

        if (enrollRes.status === 'fulfilled' && enrollRes.value.ok) {
          const data = await enrollRes.value.json()
          setEnrollments(data.enrollments || data.docs || [])
        }
      } catch {
        // Graceful degradation — greeting still works without context
      } finally {
        setLoaded(true)
      }
    }

    // Fetch streak from user data
    fetch('/learn/api/users/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user?.currentStreak) setStreak(data.user.currentStreak)
      })
      .catch(() => {})

    fetchContext()
  }, [userId])

  const displayName = getDisplayName(firstName, email)
  const greeting = getTimeGreeting()
  const contextLine = loaded ? getContextLine(health, enrollments, streak) : null

  return (
    <div className="space-y-1">
      <h2
        className="text-2xl font-display font-semibold text-brand-light greeting-line"
        style={{ animationDelay: '200ms' }}
      >
        {greeting}, {displayName}.
      </h2>
      <p
        className={`text-brand-silver/70 greeting-line ${!loaded ? 'opacity-0' : ''}`}
        style={{ animationDelay: '500ms' }}
      >
        {contextLine || 'Your longevity dashboard awaits.'}
      </p>
    </div>
  )
}

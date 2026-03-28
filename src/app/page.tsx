'use client'

import { useEffect, useState } from 'react'
import LandingView from '@/components/LandingView'
import DashboardView from '@/components/DashboardView'
import LoadingSkeleton from '@/components/LoadingSkeleton'

interface UserData {
  sub: string
  email: string
  tier: string
  role: string
}

export default function HomePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/learn/api/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSkeleton />
  if (!user) return <LandingView />
  return <DashboardView user={user} />
}

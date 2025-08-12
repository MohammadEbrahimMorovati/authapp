'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div style={{minHeight:'100dvh',display:'grid',placeItems:'center'}}>
        Loading…
      </div>
    )
  }

  // در حال ریدایرکت، چیزی نشون نده تا فلیکر نداشته باشیم
  if (!user) return null

  return <>{children}</>
}

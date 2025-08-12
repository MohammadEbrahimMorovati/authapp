'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import styles from './page.module.scss'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth')
    }
  }, [loading, user, router])

  if (loading) return null
  if (!user) return null

  return (
    <div className={styles.wrap}>
      <div className={styles.panel}>
        <div className={styles.panel__row}>
          <div>
            <h1 className={styles.panel__title}>Welcome to the Dashboard</h1>
            <p className={styles.panel__muted}>
              Hello, {user.name.first} {user.name.last} — {user.email}
            </p>
          </div>
          <Button onClick={() => { logout(); router.replace('/auth') }}>Logout</Button>
        </div>
      </div>
    </div>
  )
}
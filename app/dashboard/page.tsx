'use client'

import RequireAuth from '@/components/auth/RequireAuth'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import styles from './page.module.scss'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <RequireAuth>
      <div className={styles.wrap}>
        <div className={styles.panel}>
          <div className={styles.panel__row}>
            <div>
              <h1 className={styles.panel__title}>Welcome to the Dashboard</h1>
              {user && (
                <p className={styles.panel__muted}>
                  Hello, {user.name.first} {user.name.last} — {user.email}
                </p>
              )}
            </div>
            <Button onClick={() => { logout(); location.replace('/auth') }}>Logout</Button>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}

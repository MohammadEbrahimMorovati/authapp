'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { RandomUser, RandomUserAPIResponse } from '@/lib/types/randomuser'
import { getUser, saveUser, clearUser } from '@/utils/storage'

export interface AuthState {
  user: RandomUser | null
  loading: boolean
  login: (phone: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<RandomUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const existing = getUser<RandomUser>()
    setUser(existing)
    setLoading(false)
  }, [])
  const getUserData = async (): Promise<RandomUserAPIResponse> => {
  const res = await fetch('https://randomuser.me/api/?results=1&nat=us', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch user')
  return await res.json() as RandomUserAPIResponse
}



const login = useCallback(async (_phone: string) => {
  const data = await getUserData()
  const picked = data.results?.[0]
  const u: RandomUser = picked
    ? { name: picked.name, email: picked.email }
    : { name: { title: 'Mr', first: 'Guest', last: 'User' }, email: 'guest@example.com' }
  saveUser(u)
  setUser(u)
}, [])



  const logout = useCallback(() => {
    clearUser()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
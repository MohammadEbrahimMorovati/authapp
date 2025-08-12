'use client'

import { useAuth } from '@/context/AuthContext'
import styles from './page.module.scss'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState } from 'react'
import { loginSchema } from '@/lib/validation/auth'

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()

  const inputRef = useRef<HTMLInputElement>(null)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)

  const isValid = useMemo(() => !loginSchema.safeParse({ phone }).error, [phone])

  const onSubmit = useCallback(async () => {
    setError(undefined)
    const parsed = loginSchema.safeParse({ phone })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid input')
      inputRef.current?.focus()
      return
    }
    try {
      setSubmitting(true)
      await login(parsed.data.phone)
      router.replace('/dashboard')
    } catch (e) {
      setError('خطا در ورود. لطفاً دوباره تلاش کنید.')
    } finally {
      setSubmitting(false)
    }
  }, [phone, login, router])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.card__title}>Login</h1>
        <p className={styles.card__desc}>برای ورود، شماره موبایل ایرانی خود را وارد کنید.</p>
        <div className={styles.card__form}>
          <Input
            ref={inputRef}
            label="شماره موبایل"
            type="tel"
            inputMode="numeric"
            placeholder="مثلاً 09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error}
            dir="ltr"
          />
          <Button onClick={onSubmit} disabled={submitting || !isValid}>
            {submitting ? 'در حال ورود…' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  )
}
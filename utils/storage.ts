const KEY = 'auth:user'

export function saveUser<T>(user: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function getUser<T>(): T | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function clearUser() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
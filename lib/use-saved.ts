'use client'

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'kah:saved-restaurants'
const EMPTY: string[] = []
const listeners = new Set<() => void>()
let cache: string[] | null = null

function read(): string[] {
  if (cache) return cache
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    cache = []
  }
  return cache
}

function write(ids: string[]) {
  cache = ids
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {}
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function useSaved() {
  const saved = useSyncExternalStore(subscribe, read, () => EMPTY)

  const isSaved = useCallback((id: string) => saved.includes(id), [saved])

  const toggle = useCallback((id: string) => {
    const current = read()
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    write(next)
    return next.includes(id)
  }, [])

  return { saved, isSaved, toggle }
}

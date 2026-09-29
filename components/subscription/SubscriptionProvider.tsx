'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { localStore } from '@/lib/local-store'
import type { Subscriber } from '@/lib/types'
import { SubscribeDialog } from './SubscribeDialog'

interface SubscriptionContextValue {
  subscriber: Subscriber | null
  isSubscribed: boolean
  ready: boolean
  subscribe: (subscriber: Subscriber) => void
  unsubscribe: () => void
  openDialog: (source?: string) => void
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null)

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) throw new Error('useSubscription debe usarse dentro de SubscriptionProvider')
  return context
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)
  const [ready, setReady] = useState(false)
  const [dialogSource, setDialogSource] = useState<string | null>(null)

  useEffect(() => {
    setSubscriber(localStore.getSubscriber())
    setReady(true)
  }, [])

  const subscribe = useCallback((next: Subscriber) => {
    localStore.setSubscriber(next)
    setSubscriber(next)
  }, [])

  const unsubscribe = useCallback(() => {
    localStore.setSubscriber(null)
    setSubscriber(null)
  }, [])

  const openDialog = useCallback((source = 'web') => setDialogSource(source), [])

  const value = useMemo(
    () => ({ subscriber, isSubscribed: Boolean(subscriber), ready, subscribe, unsubscribe, openDialog }),
    [subscriber, ready, subscribe, unsubscribe, openDialog],
  )

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
      <SubscribeDialog source={dialogSource} onClose={() => setDialogSource(null)} />
    </SubscriptionContext.Provider>
  )
}

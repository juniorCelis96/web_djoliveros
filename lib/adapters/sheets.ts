import type { Subscriber } from '@/lib/types'

/**
 * Google Sheets adapter through a Google Apps Script web app (doPost) that appends rows.
 * Without SHEETS_WEBHOOK_URL it runs in simulation mode. Server-only.
 */

export function isSheetsConfigured() {
  return Boolean(process.env.SHEETS_WEBHOOK_URL)
}

export async function appendSubscriber(subscriber: Subscriber & { source: string }): Promise<{ simulated: boolean }> {
  if (!isSheetsConfigured()) {
    console.info('[sheets:simulado]', subscriber)
    return { simulated: true }
  }

  const response = await fetch(process.env.SHEETS_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.SHEETS_WEBHOOK_SECRET,
      date: new Date().toISOString(),
      ...subscriber,
    }),
  })

  if (!response.ok) throw new Error(`Google Sheets ${response.status}`)
  return { simulated: false }
}

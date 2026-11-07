import type { Answers, Report } from '@shared/types'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message)
  }
}

async function parse<T>(res: Response): Promise<T> {
  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON response (e.g. functions not running locally) */
  }
  if (!res.ok) {
    const d = data as { error?: string; code?: string } | null
    throw new ApiError(
      d?.error ?? 'Something went wrong. Please check your connection and try again.',
      res.status,
      d?.code,
    )
  }
  return data as T
}

export async function createCheckout(answers: Answers, consent: boolean): Promise<string> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ answers, consent }),
  })
  const data = await parse<{ url: string }>(res)
  if (!data?.url) throw new ApiError('Checkout is unavailable right now.', 502)
  return data.url
}

export type ReportResponse = { status: 'paid'; report: Report } | { status: 'pending' }

export async function fetchReport(sessionId: string): Promise<ReportResponse> {
  const res = await fetch(`/api/report?session_id=${encodeURIComponent(sessionId)}`, {
    headers: { accept: 'application/json' },
  })
  return parse<ReportResponse>(res)
}

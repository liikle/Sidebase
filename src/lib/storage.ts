import { validateAnswers } from '@shared/questions'
import type { Answers } from '@shared/types'

const ANSWERS_KEY = 'sidebase.answers.v1'
const SESSION_KEY = 'sidebase.session.v1'
const DRAFT_KEY = 'sidebase.draft.v1'

function read(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key)
  } catch {
    return null
  }
}
function write(storage: () => Storage, key: string, value: string | null) {
  try {
    if (value === null) storage().removeItem(key)
    else storage().setItem(key, value)
  } catch {
    /* storage unavailable (private mode) — the app still works for this visit */
  }
}

const local = () => window.localStorage
const session = () => window.sessionStorage

export function loadAnswers(): Answers | null {
  const raw = read(local, ANSWERS_KEY)
  if (!raw) return null
  try {
    return validateAnswers(JSON.parse(raw))
  } catch {
    return null
  }
}
export function saveAnswers(a: Answers) {
  write(local, ANSWERS_KEY, JSON.stringify(a))
}

export type Draft = { step: number; answers: Partial<Answers> }
export function loadDraft(): Draft | null {
  const raw = read(session, DRAFT_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Draft
  } catch {
    return null
  }
}
export function saveDraft(d: Draft | null) {
  write(session, DRAFT_KEY, d ? JSON.stringify(d) : null)
}

/** The Checkout Session id acts as the purchase reference for this browser. */
export function loadPurchaseRef(): string | null {
  return read(local, SESSION_KEY)
}
export function savePurchaseRef(id: string | null) {
  write(local, SESSION_KEY, id)
}

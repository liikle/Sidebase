import { useEffect } from 'react'
import { SITE } from './site'

interface SeoOptions {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
}

const DEFAULT_TITLE = 'Sidebase — Find Your Next Online Income Opportunity'
const DEFAULT_DESCRIPTION =
  'Discover online business ideas and side hustles matched to your skills, budget, interests, and available time.'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export function useSeo({ title, description, path, noindex }: SeoOptions = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Sidebase` : DEFAULT_TITLE
    const desc = description ?? DEFAULT_DESCRIPTION
    const url = `${SITE.url}${path ?? window.location.pathname}`
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setCanonical(url)
  }, [title, description, path, noindex])
}

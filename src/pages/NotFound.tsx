import { EmptyState } from '../components/ui/EmptyState'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo({ title: 'Page not found', noindex: true })
  return (
    <EmptyState
      title="This page doesn’t exist"
      text="The link may be broken or the page may have moved."
      action={{ to: '/', label: 'Back to home' }}
      secondary={{ to: '/explore', label: 'Explore ideas' }}
    />
  )
}

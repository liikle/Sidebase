import { MotionConfig } from 'framer-motion'
import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollManager } from './components/layout/ScrollManager'
import { SiteLayout } from './components/layout/SiteLayout'
import { Spinner } from './components/ui/Spinner'
import Home from './pages/Home'

const Finder = lazy(() => import('./pages/Finder'))
const Results = lazy(() => import('./pages/Results'))
const Report = lazy(() => import('./pages/Report'))
const Explore = lazy(() => import('./pages/Explore'))
const IdeaPage = lazy(() => import('./pages/IdeaPage'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Terms = lazy(() => import('./pages/legal/Terms'))
const Privacy = lazy(() => import('./pages/legal/Privacy'))
const Refunds = lazy(() => import('./pages/legal/Refunds'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="h-6 w-6" />
    </div>
  )
}

const lazyPage = (node: ReactNode) => <Suspense fallback={<PageFallback />}>{node}</Suspense>

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/find" element={lazyPage(<Finder />)} />
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="/results" element={lazyPage(<Results />)} />
            <Route path="/report" element={lazyPage(<Report />)} />
            <Route path="/explore" element={lazyPage(<Explore />)} />
            <Route path="/explore/:id" element={lazyPage(<IdeaPage />)} />
            <Route path="/about" element={lazyPage(<About />)} />
            <Route path="/contact" element={lazyPage(<Contact />)} />
            <Route path="/terms" element={lazyPage(<Terms />)} />
            <Route path="/privacy" element={lazyPage(<Privacy />)} />
            <Route path="/refunds" element={lazyPage(<Refunds />)} />
            <Route path="*" element={lazyPage(<NotFound />)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

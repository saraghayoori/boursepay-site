import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'

export default function RootLayout() {
  const location = useLocation()

  // Scroll to top on route change — but ONLY when there's no hash. If
  // the URL has a hash (e.g. /products#chabok arriving from a Network
  // product chip click on the home page), the destination page handles
  // its own scroll-to-anchor so the user lands on the relevant content
  // rather than the page hero.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.hash])

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition pageKey={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

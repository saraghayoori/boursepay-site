import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Unique key per page — drives enter/exit. */
  pageKey?: string
}

/**
 * Wraps each routed page in a fade + slight Y motion.
 * Combined with AnimatePresence in RootLayout, this gives the "everything
 * loads together smoothly" feel without unmounting the header/footer.
 */
export default function PageTransition({ children, pageKey }: Props) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

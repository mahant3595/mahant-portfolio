import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/** Floating back-to-top control that appears after the first viewport. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          key="back-to-top"
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={{ duration: 0.22 }}
          className="fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full border border-line/80 bg-card/90 text-fg-muted shadow-lg backdrop-blur transition-colors hover:border-accent/60 hover:text-accent-soft sm:right-6 sm:bottom-6"
        >
          <ArrowUp size={16} />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

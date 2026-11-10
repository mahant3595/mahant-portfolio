import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems, personal } from '../data/personal.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useScrollLock } from '../hooks/useScrollLock.js';
import { cn } from '../utils/cn.js';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => navItems.map((item) => item.id), []);
  const active = useActiveSection(ids);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-line/70 bg-base/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-accent-soft to-transparent"
      />

      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]"
      >
        <a
          href="#home"
          className="group flex items-center gap-2.5"
          aria-label={`${personal.name} — back to top`}
        >
          <span className="grid size-9 place-items-center rounded-lg border border-line/80 bg-elevated/80 font-display text-[0.8rem] font-bold tracking-wide text-fg transition-colors group-hover:border-accent/60 group-hover:text-accent-soft">
            {personal.initials}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[0.9rem] font-semibold text-fg">{personal.name}</span>
            <span className="font-mono text-[0.62rem] tracking-[0.16em] text-fg-subtle uppercase">
              {personal.title}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-md px-3 py-2 text-[0.83rem] font-medium transition-colors duration-200',
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-x-2.5 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent-soft to-transparent"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-lg border border-line/80 bg-elevated/60 px-4 py-2 text-[0.82rem] font-medium text-fg transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft sm:inline-flex"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-lg border border-line/80 bg-elevated/60 text-fg-muted transition-colors hover:text-fg lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/60 bg-base/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.25 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                      active === item.id
                        ? 'bg-accent/10 text-accent-soft'
                        : 'text-fg-muted hover:bg-elevated/60 hover:text-fg',
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-[0.65rem] text-fg-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

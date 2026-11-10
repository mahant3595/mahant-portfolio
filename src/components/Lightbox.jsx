import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock.js';
import { asset } from '../utils/cn.js';

/**
 * Accessible certificate lightbox.
 * - Escape closes, arrow keys navigate, Tab stays inside the dialog.
 * - Focus returns to the trigger when it closes.
 */
export function Lightbox({ items, index, onClose, onNavigate }) {
  const open = typeof index === 'number' && index >= 0 && items[index];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);

  useScrollLock(Boolean(open));

  useEffect(() => {
    if (!open) return undefined;
    restoreRef.current = document.activeElement;
    const timer = setTimeout(() => closeRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate((index + 1) % items.length);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate((index - 1 + items.length) % items.length);
        return;
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, index, items.length, onClose, onNavigate]);

  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  );
  const goNext = useCallback(() => onNavigate((index + 1) % items.length), [index, items.length, onNavigate]);

  const certificate = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-base/85 backdrop-blur-md"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-line/80 bg-card shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line/70 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h3 id="lightbox-title" className="truncate font-display text-sm font-semibold text-fg">
                  {certificate.title}
                </h3>
                <p className="mt-0.5 truncate text-[0.72rem] text-fg-subtle">
                  {[certificate.organization, certificate.displayDate, certificate.credentialId ? `ID ${certificate.credentialId}` : null]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-line/70 bg-elevated/70 text-fg-muted transition-colors hover:text-fg"
                aria-label="Close certificate preview"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative bg-[#0a0e13] p-2 sm:p-4">
              <img
                src={asset(certificate.image)}
                alt={certificate.imageAlt || `Certificate: ${certificate.title} issued by ${certificate.organization} to Mahant T`}
                className="mx-auto max-h-[70vh] w-full rounded-lg object-contain"
              />

              {items.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous certificate"
                    className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line/80 bg-base/80 text-fg backdrop-blur transition-colors hover:border-accent/60 hover:text-accent-soft"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next certificate"
                    className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line/80 bg-base/80 text-fg backdrop-blur transition-colors hover:border-accent/60 hover:text-accent-soft"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 px-4 py-3 sm:px-5">
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[0.65rem] text-fg-subtle">
                {index + 1} / {items.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

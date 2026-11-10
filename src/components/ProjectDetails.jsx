import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, FileText, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { useScrollLock } from '../hooks/useScrollLock.js';
import { asset } from '../utils/cn.js';

function DetailBlock({ title, children }) {
  return (
    <section className="space-y-2">
      <h4 className="font-mono text-[0.62rem] tracking-[0.18em] text-accent-soft uppercase">{title}</h4>
      <div className="text-[0.9rem] leading-relaxed text-fg-muted">{children}</div>
    </section>
  );
}

export function ProjectDetails({ project, onClose }) {
  const open = Boolean(project);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);
  const [activeShot, setActiveShot] = useState(0);

  useScrollLock(open);

  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement;
      setActiveShot(0);
      const timer = setTimeout(() => closeRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
    if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
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
  }, [open, onClose]);

  const shots = project?.screenshots ?? [];
  const current = shots[activeShot] ?? shots[0];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="project-details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-3 sm:p-6"
        >
          <div aria-hidden="true" onClick={onClose} className="fixed inset-0 bg-base/85 backdrop-blur-md" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 my-4 w-full max-w-4xl overflow-hidden rounded-2xl border border-line/80 bg-surface shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] sm:my-8"
          >
            <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-line/70 bg-surface/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="font-mono text-[0.58rem] tracking-[0.16em] text-accent-soft uppercase">
                  {project.category}
                  {project.year ? ` · ${project.year}` : ''}
                </p>
                <h3 id="project-details-title" className="mt-1 font-display text-lg font-semibold text-fg">
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-line/70 bg-elevated/70 text-fg-muted transition-colors hover:text-fg"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Gallery */}
              <div className="border-b border-line/60 bg-[#0a0e13] p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="mx-auto w-full max-w-[13rem] shrink-0 overflow-hidden rounded-2xl border border-line/70 bg-[#0b1017] p-1.5">
                    <img
                      src={asset(current?.src)}
                      alt={current?.alt ?? project.title}
                      className="w-full rounded-xl"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <div className="grid flex-1 grid-cols-4 gap-2">
                    {shots.map((shot, index) => (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() => setActiveShot(index)}
                        aria-label={`Show screenshot ${index + 1}`}
                        aria-pressed={activeShot === index}
                        className={`overflow-hidden rounded-lg border transition-colors ${
                          activeShot === index
                            ? 'border-accent/70 ring-1 ring-accent/40'
                            : 'border-line/60 hover:border-line'
                        }`}
                      >
                        <img
                          src={asset(shot.src)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="aspect-[9/16] w-full object-cover object-top opacity-80 transition-opacity hover:opacity-100"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-7 p-5 sm:p-7">
                <DetailBlock title="Project overview">
                  <p>{project.overview}</p>
                </DetailBlock>

                <div className="grid gap-6 sm:grid-cols-2">
                  <DetailBlock title="Problem statement">
                    <p>{project.problem}</p>
                  </DetailBlock>
                  <DetailBlock title="Proposed solution">
                    <p>{project.solution}</p>
                  </DetailBlock>
                </div>

                <DetailBlock title="Key features">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-soft" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock title="Technology stack">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </DetailBlock>

                <DetailBlock title="Architecture & workflow">
                  <ol className="space-y-3">
                    {project.architecture.map((step) => (
                      <li key={step.step} className="flex gap-3">
                        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-line/70 bg-elevated/60 font-mono text-[0.6rem] text-accent-soft">
                          {step.step}
                        </span>
                        <div>
                          <p className="text-[0.86rem] font-medium text-fg">{step.title}</p>
                          <p className="mt-0.5 text-[0.85rem] text-fg-muted">{step.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </DetailBlock>

                <DetailBlock title="My contribution">
                  <p>{project.contribution}</p>
                </DetailBlock>

                <div className="grid gap-6 sm:grid-cols-2">
                  <DetailBlock title="Challenges">
                    <ul className="space-y-2">
                      {project.challenges.map((challenge) => (
                        <li key={challenge} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-line" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </DetailBlock>

                  <DetailBlock title="Learning outcomes">
                    <ul className="space-y-2">
                      {project.learnings.map((learning) => (
                        <li key={learning} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-line" />
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </DetailBlock>
                </div>

                <DetailBlock title="Links">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {project.deployment ? (
                      <a
                        href={project.deployment.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-lg bg-success/15 px-3.5 py-2 text-[0.8rem] font-medium text-success ring-1 ring-success/30 transition-colors hover:bg-success/25"
                      >
                        Live demo <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line/70 bg-elevated/50 px-3.5 py-2 font-mono text-[0.7rem] text-fg-subtle">
                        NOT PUBLICLY DEPLOYED
                      </span>
                    )}

                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-lg border border-line/70 px-3.5 py-2 text-[0.8rem] text-fg-muted transition-colors hover:text-fg"
                      >
                        <GithubIcon size={14} /> GitHub repository
                      </a>
                    ) : null}

                    {project.reportFile ? (
                      <a
                        href={asset(project.reportFile)}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-lg border border-line/70 px-3.5 py-2 text-[0.8rem] text-fg-muted transition-colors hover:text-fg"
                      >
                        <FileText size={14} /> Full project report (PDF)
                      </a>
                    ) : null}
                  </div>
                </DetailBlock>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

import { Reveal } from './Reveal.jsx';
import { cn } from '../utils/cn.js';

/**
 * Shared section header: numbered eyebrow, title, supporting copy.
 */
export function SectionHeading({ index, eyebrow, title, description, align = 'left', className }) {
  const centered = align === 'center';

  return (
    <div className={cn('flex flex-col gap-4', centered && 'items-center text-center', className)}>
      <Reveal className="flex items-center gap-3">
        <span className="font-mono text-[0.7rem] tracking-[0.28em] text-accent-soft uppercase">
          {index ? `${index} · ` : ''}
          {eyebrow}
        </span>
        <span aria-hidden="true" className="h-px w-10 bg-line sm:w-16" />
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-3xl leading-[1.1] font-semibold text-fg sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p className={cn('max-w-2xl text-[0.98rem] leading-relaxed text-fg-muted', centered && 'mx-auto')}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

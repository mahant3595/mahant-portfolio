import { Award, CalendarDays, Expand } from 'lucide-react';
import { asset, cn } from '../utils/cn.js';
import { Reveal } from './Reveal.jsx';

/**
 * Certificate card. `wide` renders the hero layout used for the
 * highest-ranked certificate.
 */
export function CertificateCard({ certificate, index, onView, delay = 0, wide = false }) {
  return (
    <Reveal delay={delay} className={cn('h-full', wide && 'lg:col-span-2')}>
      <article
        className={cn(
          'panel panel-hover group flex h-full flex-col overflow-hidden',
          wide && 'lg:flex-row',
        )}
      >
        <div className={cn('relative shrink-0 overflow-hidden', wide ? 'lg:w-[58%]' : '')}>
          <button
            type="button"
            onClick={() => onView(index)}
            aria-label={`View the ${certificate.title} certificate`}
            className="block w-full cursor-zoom-in text-left"
          >
            <div className={cn('relative overflow-hidden bg-[#0a0e13]', wide ? 'lg:h-full' : '')}>
              <img
                src={asset(certificate.image)}
                alt={`${certificate.title} certificate issued to Mahant T`}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className={cn(
                  'w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]',
                  wide ? 'aspect-[1.414/1] lg:h-full lg:aspect-auto' : 'aspect-[1.414/1]',
                )}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
              <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-line/70 bg-base/85 px-2.5 py-1.5 font-mono text-[0.6rem] tracking-[0.1em] text-fg-muted uppercase opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <Expand size={11} />
                View
              </span>
            </div>
          </button>

          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-base/80 px-2 py-1 font-mono text-[0.6rem] font-medium tracking-[0.08em] text-accent-soft backdrop-blur">
            <Award size={11} />
            #{String(certificate.rank).padStart(2, '0')}
          </span>
        </div>

        <div className={cn('flex flex-1 flex-col p-5', wide && 'lg:justify-center lg:p-7')}>
          <p className="font-mono text-[0.6rem] tracking-[0.16em] text-accent-soft uppercase">
            {certificate.category}
          </p>
          <h3
            className={cn(
              'mt-2 leading-snug font-semibold text-fg',
              wide ? 'text-lg sm:text-xl' : 'text-[0.98rem]',
            )}
          >
            {certificate.title}
          </h3>
          <p className="mt-1.5 text-[0.82rem] text-fg-muted">{certificate.organization}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.65rem] text-fg-subtle">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={11} />
              {certificate.displayDate}
            </span>
            <span className="truncate">ID {certificate.credentialId}</span>
          </div>

          {wide ? (
            <p className="mt-4 max-w-md text-[0.84rem] leading-relaxed text-fg-muted">{certificate.note}</p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {certificate.skills.slice(0, wide ? 5 : 3).map((skill) => (
              <span key={skill} className="pill">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/50 pt-4">
            <button
              type="button"
              onClick={() => onView(index)}
              className="text-[0.8rem] font-medium text-accent-soft transition-colors hover:text-fg"
            >
              View certificate
            </button>
            {certificate.verifyUrl ? (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[0.75rem] text-fg-subtle transition-colors hover:text-fg"
              >
                Verify
              </a>
            ) : (
              <span className="font-mono text-[0.62rem] tracking-[0.06em] text-fg-subtle">VERIFIED PDF</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

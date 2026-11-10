import { Briefcase, GraduationCap } from 'lucide-react';
import { education } from '../data/education.js';
import { Reveal } from './Reveal.jsx';
import { SectionHeading } from './SectionHeading.jsx';
import { cn } from '../utils/cn.js';

export function Education() {
  return (
    <section id="education" className="relative pb-20 md:pb-28">
      <div className="container-page">
        <SectionHeading
          index="06"
          eyebrow="Education & learning"
          title="Formal study, followed by deliberate practice."
          description="Academic background together with the structured training that produced the certifications and projects above."
        />

        <ol className="relative mt-12 space-y-4 border-l border-line/60 pl-6 sm:pl-8">
          {education.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.07} as="li" className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-6 -left-[1.72rem] grid size-4 place-items-center rounded-full border sm:-left-[2.22rem]',
                  entry.pendingConfirmation
                    ? 'border-dashed border-line bg-base'
                    : 'border-accent/50 bg-base',
                )}
              >
                <span
                  className={cn(
                    'size-1.5 rounded-full',
                    entry.pendingConfirmation ? 'bg-fg-subtle' : 'bg-accent-soft',
                  )}
                />
              </span>

              <div
                className={cn(
                  'panel p-5 sm:p-6',
                  entry.pendingConfirmation && 'border-dashed bg-card/40',
                )}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.16em] text-accent-soft uppercase">
                    {entry.kind === 'education' ? <GraduationCap size={12} /> : <Briefcase size={12} />}
                    {entry.kind === 'education' ? 'Education' : 'Training'}
                  </span>
                  <span className="font-mono text-[0.62rem] text-fg-subtle">{entry.period}</span>
                </div>

                <h3 className="mt-2 font-display text-[1.02rem] font-semibold text-fg">{entry.degree}</h3>
                <p className="mt-1 text-[0.84rem] text-fg-muted">{entry.institution}</p>

                {entry.highlight ? (
                  <p className="mt-3 text-[0.83rem] leading-relaxed text-fg-subtle">{entry.highlight}</p>
                ) : null}

                {entry.pendingConfirmation ? (
                  <p className="mt-3 inline-flex rounded-md border border-line/60 bg-elevated/40 px-2.5 py-1.5 font-mono text-[0.62rem] tracking-[0.06em] text-fg-subtle uppercase">
                    Awaiting confirmation
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

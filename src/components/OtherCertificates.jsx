import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Trophy } from 'lucide-react';
import { achievements } from '../data/achievements.js';
import { certificateCategories, certificates, remainingCertificates } from '../data/certificates.js';
import { CertificateCard } from './CertificateCard.jsx';
import { Lightbox } from './Lightbox.jsx';
import { Reveal } from './Reveal.jsx';
import { SectionHeading } from './SectionHeading.jsx';
import { asset, cn } from '../utils/cn.js';

const INITIAL_VISIBLE = 4;

/**
 * Competition awards, then the remaining certifications with category filters
 * and show more / show less. Both groups share one lightbox.
 */
export function OtherCertificates() {
  const [category, setCategory] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Awards come first in the viewer so a single index space covers both groups.
  const lightboxItems = useMemo(() => [...achievements, ...certificates], []);

  const categories = useMemo(
    () => certificateCategories.filter((item) => item === 'All' || remainingCertificates.some((c) => c.category === item)),
    [],
  );

  const filtered = useMemo(
    () =>
      category === 'All'
        ? remainingCertificates
        : remainingCertificates.filter((certificate) => certificate.category === category),
    [category],
  );

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const canExpand = filtered.length > INITIAL_VISIBLE;

  return (
    <section id="achievements" className="relative pb-20 md:pb-28">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Other certifications & achievements"
          title="The rest of the record."
          description="Competition results on file, plus additional traineeships and supporting credentials — useful breadth across analytics, design and communication, kept separate from the engineering-critical list above."
        />

        <div className="mt-10">
          <p className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] text-accent-soft uppercase">
            <Trophy size={13} />
            Competition awards
          </p>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {achievements.map((achievement, index) => (
              <Reveal key={achievement.id} delay={index * 0.08} className="h-full">
                <article className="panel panel-hover group flex h-full flex-col overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View the ${achievement.title} certificate`}
                    className="relative block w-full cursor-zoom-in overflow-hidden bg-[#0a0e13] text-left"
                  >
                    <img
                      src={asset(achievement.image)}
                      alt={achievement.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[1.414/1] w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-base/80 px-2 py-1 font-mono text-[0.6rem] font-medium tracking-[0.08em] text-accent-soft backdrop-blur">
                      <Trophy size={11} />
                      {achievement.badge}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[0.6rem] tracking-[0.16em] text-accent-soft uppercase">
                      {achievement.category}
                    </p>
                    <h3 className="mt-2 text-[0.98rem] leading-snug font-semibold text-fg">{achievement.title}</h3>
                    <p className="mt-1.5 text-[0.82rem] text-fg-muted">{achievement.organization}</p>

                    <div className="mt-3 font-mono text-[0.65rem] text-fg-subtle">{achievement.displayDate}</div>

                    <p className="mt-3 text-[0.83rem] leading-relaxed text-fg-muted">{achievement.detail}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {achievement.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="pill">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-line/50 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className="text-[0.8rem] font-medium text-accent-soft transition-colors hover:text-fg"
                      >
                        View certificate
                      </button>
                      <span className="font-mono text-[0.62rem] tracking-[0.06em] text-fg-subtle">VERIFIED PDF</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 flex flex-wrap gap-2" delay={0.05}>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setExpanded(false);
              }}
              aria-pressed={category === item}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-[0.75rem] font-medium transition-colors duration-200',
                category === item
                  ? 'border-accent/50 bg-accent/15 text-accent-soft'
                  : 'border-line/70 bg-elevated/40 text-fg-muted hover:border-line hover:text-fg',
              )}
            >
              {item}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <CertificateCard
                  certificate={certificate}
                  index={achievements.length + certificates.indexOf(certificate)}
                  onView={setActiveIndex}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {canExpand ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-lg border border-line/80 bg-elevated/50 px-4 py-2.5 text-[0.8rem] font-medium text-fg-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              {expanded ? 'Show less' : `Show all ${filtered.length} credentials`}
              <ChevronDown
                size={15}
                className={cn('transition-transform duration-300', expanded && 'rotate-180')}
              />
            </button>
          </div>
        ) : null}
      </div>

      <Lightbox
        items={lightboxItems}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, BadgeCheck, Download, Sparkles } from 'lucide-react';
import { personal } from '../data/personal.js';
import { certificates } from '../data/certificates.js';
import { projects } from '../data/projects.js';
import { asset, cn } from '../utils/cn.js';
import { TypingRoles } from './TypingRoles.jsx';

const EASE = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };

  const item = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-backdrop opacity-60" />
        <div className="glow-accent absolute top-[-12rem] left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-success uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="font-mono text-[0.8rem] tracking-[0.24em] text-fg-subtle uppercase"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-3 text-[2.6rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl md:text-[4.1rem]"
            >
              <span className="text-gradient">{personal.name}</span>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-4 flex min-h-[2rem] items-center gap-3 text-lg font-medium text-fg-muted sm:text-xl"
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent/70" />
              <TypingRoles roles={personal.roles} className="text-fg" />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-fg-muted sm:text-[1.02rem]"
            >
              {personal.intro}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(59,130,246,0.9)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent/90 active:translate-y-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Explore my projects
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#certifications"
                className="inline-flex items-center gap-2 rounded-xl border border-line/90 bg-elevated/50 px-5 py-3 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent-soft"
              >
                <BadgeCheck size={16} />
                View certifications
              </a>

              {personal.resume ? (
                <a
                  href={asset(personal.resume)}
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-line/60 px-5 py-3 text-sm font-medium text-fg-muted transition-colors duration-200 hover:border-line hover:text-fg"
                >
                  <Download size={16} />
                  Download resume
                </a>
              ) : null}
            </motion.div>

            <motion.dl
              variants={item}
              className="mt-11 grid max-w-lg grid-cols-3 gap-4 border-t border-line/60 pt-6"
            >
              {[
                { value: `${certificates.length}`, label: 'Certifications' },
                { value: `${projects.length}`, label: 'Projects showcased' },
                { value: '< 15ms', label: 'ML inference' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-xl font-semibold text-fg sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block font-mono text-[0.62rem] tracking-[0.14em] text-fg-subtle uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-b from-accent/25 via-accent-soft/10 to-transparent blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-line/80 bg-gradient-to-b from-elevated/80 via-card/60 to-base p-2.5 shadow-[0_40px_80px_-40px_rgba(2,6,23,1)]">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-line/60 bg-[radial-gradient(120%_90%_at_50%_0%,#1e2b3c_0%,#141d28_45%,#0d131b_100%)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/12 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.18),transparent_58%)]"
                />
                <img
                  src={asset('images/profile-cutout.png')}
                  alt={`${personal.name}, software developer`}
                  width="560"
                  height="1119"
                  fetchPriority="high"
                  decoding="async"
                  className="relative mx-auto h-[26rem] w-auto object-contain object-bottom drop-shadow-[0_24px_40px_rgba(2,6,23,0.65)] sm:h-[30rem] lg:h-[33rem]"
                />

                {/* Ring accent */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[1.55rem] ring-1 ring-inset ring-white/5"
                />
              </div>
            </div>

            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
              className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-line/80 bg-card/90 px-4 py-3 backdrop-blur-md sm:-left-4 sm:translate-x-0"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent-soft">
                  <Sparkles size={16} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[0.78rem] font-semibold text-fg">
                    Flagship build — SkyPredict AI
                  </p>
                  <p className="truncate font-mono text-[0.62rem] tracking-[0.1em] text-fg-subtle uppercase">
                    Java · Android · on-device k-NN
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20 hidden justify-center md:flex">
          <a
            href="#about"
            className={cn(
              'group inline-flex flex-col items-center gap-2 text-[0.65rem] font-medium tracking-[0.22em] text-fg-subtle uppercase transition-colors hover:text-fg-muted',
            )}
          >
            Scroll to explore
            <span className="grid size-8 place-items-center rounded-full border border-line/80 transition-colors group-hover:border-accent/60">
              <ArrowDown size={13} className="animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

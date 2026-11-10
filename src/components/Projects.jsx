import { useState } from 'react';
import { ArrowUpRight, FileText, Images, Layers } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { featuredProject, projects } from '../data/projects.js';
import { asset } from '../utils/cn.js';
import { ProjectCard } from './ProjectCard.jsx';
import { ProjectDetails } from './ProjectDetails.jsx';
import { Reveal } from './Reveal.jsx';
import { SectionHeading } from './SectionHeading.jsx';

export function Projects() {
  const [openProject, setOpenProject] = useState(null);
  const project = featuredProject;
  const additional = projects.filter((item) => item.slug !== project.slug);
  const screens = project.screenshots.slice(0, 3);

  return (
    <section id="projects" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(59,130,246,0.10),transparent_70%)]"
      />

      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Featured projects"
          title="Real applications, with the screenshots and reports to prove it."
          description="Built end to end — interface, data layer, algorithm and tests. Each project opens into the engineering behind it: architecture, source code, and a full technical report where one exists."
        />

        <Reveal className="mt-12" delay={0.05}>
          <article className="panel overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              {/* Screenshot composition */}
              <div className="relative overflow-hidden border-b border-line/60 bg-[linear-gradient(160deg,#0f1a26_0%,#121c27_45%,#0b1119_100%)] p-6 sm:p-9 lg:border-r lg:border-b-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.16),transparent_45%)]"
                />
                <div className="relative mx-auto flex max-w-md items-end justify-center gap-3">
                  {screens[1] ? (
                    <img
                      src={asset(screens[1].src)}
                      alt={screens[1].alt}
                      loading="lazy"
                      decoding="async"
                      className="hidden w-[27%] translate-y-4 -rotate-6 rounded-xl border border-line/60 opacity-80 shadow-2xl sm:block"
                    />
                  ) : null}

                  <div className="relative w-[54%] min-w-[9.5rem] sm:w-[46%]">
                    <div className="overflow-hidden rounded-[1.35rem] border border-line/80 bg-[#0b1017] p-1.5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.95)]">
                      <img
                        src={asset(screens[0].src)}
                        alt={screens[0].alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-[1rem]"
                      />
                    </div>
                    <span className="absolute -top-2.5 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-[#22303f]" />
                  </div>

                  {screens[2] ? (
                    <img
                      src={asset(screens[2].src)}
                      alt={screens[2].alt}
                      loading="lazy"
                      decoding="async"
                      className="hidden w-[27%] translate-y-4 rotate-6 rounded-xl border border-line/60 opacity-80 shadow-2xl sm:block"
                    />
                  ) : null}
                </div>

                <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="pill">
                    <Layers size={11} /> {project.stack.length} technologies
                  </span>
                  <span className="pill">
                    <Images size={11} /> {project.screenshots.length} screens
                  </span>
                </div>
              </div>

              {/* Details summary */}
              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill border-accent/30 bg-accent/10 text-accent-soft">{project.category}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-elevated/50 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-fg-muted uppercase">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-fg-subtle" />
                    {project.status} · Not publicly deployed
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-fg sm:text-[1.7rem]">
                  {project.title}
                </h3>
                <p className="mt-1 text-[0.9rem] text-accent-soft">{project.subtitle}</p>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-fg-muted">{project.summary}</p>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {project.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[0.8rem] text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-soft"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 6).map((tech) => (
                    <span key={tech} className="pill">
                      {tech}
                    </span>
                  ))}
                  <span className="pill border-accent/30 text-accent-soft">+{project.stack.length - 6}</span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOpenProject(project)}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-accent/90"
                  >
                    View full details <ArrowUpRight size={15} />
                  </button>

                  <a
                    href={asset(project.reportFile)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl border border-line/80 bg-elevated/50 px-4 py-2.5 text-[0.82rem] font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent-soft"
                  >
                    <FileText size={15} /> Project report
                  </a>

                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-xl border border-line/60 px-4 py-2.5 text-[0.82rem] font-medium text-fg-muted transition-colors hover:text-fg"
                    >
                      <GithubIcon size={15} /> GitHub
                    </a>
                  ) : null}
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-line/50 pt-5 sm:grid-cols-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="font-mono text-[0.56rem] tracking-[0.12em] text-fg-subtle uppercase">
                        {metric.label}
                      </dt>
                      <dd className="mt-1 font-display text-[0.86rem] font-semibold text-fg">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        </Reveal>

        {additional.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {additional.map((item, index) => (
              <ProjectCard key={item.slug} project={item} onView={setOpenProject} delay={index * 0.08} />
            ))}
          </div>
        ) : null}

        <Reveal className="mt-8" delay={0.1}>
          <p className="text-center font-mono text-[0.68rem] tracking-[0.06em] text-fg-subtle">
            Deployment status is accurate — no demo links are shown for applications that are not publicly hosted.
          </p>
        </Reveal>
      </div>

      <ProjectDetails project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}

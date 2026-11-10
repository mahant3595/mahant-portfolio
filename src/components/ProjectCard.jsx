import { ArrowUpRight, Images } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { asset } from '../utils/cn.js';
import { Reveal } from './Reveal.jsx';

export function ProjectCard({ project, onView, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="panel panel-hover group flex h-full flex-col overflow-hidden">
        <button
          type="button"
          onClick={() => onView(project)}
          className="relative block overflow-hidden text-left"
          aria-label={`View details for ${project.title}`}
        >
          <img
            src={asset(project.cover)}
            alt={`${project.title} — ${project.subtitle}`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/85 via-base/10 to-transparent" />
        </button>

        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[0.6rem] tracking-[0.16em] text-accent-soft uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold text-fg">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-[0.85rem] leading-relaxed text-fg-muted">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line/50 pt-4">
            <button
              type="button"
              onClick={() => onView(project)}
              className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-accent-soft transition-colors hover:text-fg"
            >
              View details <ArrowUpRight size={14} />
            </button>
            <div className="flex items-center gap-2 text-fg-subtle">
              <Images size={13} aria-hidden="true" />
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.title} on GitHub`}
                  className="transition-colors hover:text-fg"
                >
                  <GithubIcon size={14} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

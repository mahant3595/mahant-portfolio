import { ArrowUp, Mail } from 'lucide-react';
import { navItems, personal } from '../data/personal.js';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    personal.github && { icon: GithubIcon, href: personal.github, label: 'GitHub' },
    personal.linkedin && { icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn' },
    personal.email && { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  ].filter(Boolean);

  return (
    <footer className="relative border-t border-line/60 bg-surface/60">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg border border-line/80 bg-elevated/80 font-display text-[0.8rem] font-bold text-fg">
                {personal.initials}
              </span>
              <span className="font-display text-[0.95rem] font-semibold text-fg">{personal.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed text-fg-muted">
              Full stack and Android developer building offline-first, tested applications with real
              engineering depth.
            </p>

            {socials.length ? (
              <div className="mt-5 flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === 'Email' ? undefined : '_blank'}
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-lg border border-line/70 bg-elevated/50 text-fg-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-[0.6rem] tracking-[0.18em] text-fg-subtle uppercase">Navigate</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[0.82rem] text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.6rem] tracking-[0.18em] text-fg-subtle uppercase">Highlight</h2>
            <ul className="mt-4 space-y-2 text-[0.82rem] text-fg-muted">
              <li>
                <a href="#projects" className="transition-colors hover:text-fg">
                  SkyPredict AI — Android + ML
                </a>
              </li>
              <li>
                <a href="#certifications" className="transition-colors hover:text-fg">
                  Verified certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-fg">
                  Work with me
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line/50 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.68rem] text-fg-subtle">
            © {year} {personal.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.68rem] text-fg-subtle">
            Designed & built with React, Vite and Tailwind CSS
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-fg-muted uppercase transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

import {
  BrainCircuit,
  Code2,
  Database,
  LayoutDashboard,
  PenTool,
  Server,
  Wrench,
} from 'lucide-react';
import { skillGroups, skillLevelLabels } from '../data/skills.js';
import { Reveal } from './Reveal.jsx';
import { SectionHeading } from './SectionHeading.jsx';
import { cn } from '../utils/cn.js';

const icons = { Code2, LayoutDashboard, Server, Database, BrainCircuit, Wrench, PenTool };

const levelStyles = {
  used: 'border-accent/35 bg-accent/12 text-accent-soft',
  working: 'border-line/80 bg-elevated/60 text-fg-muted',
  familiar: 'border-line/60 bg-elevated/40 text-fg-subtle',
  learning: 'border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#fbbf24]',
};

export function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="container-page">
        <SectionHeading
          index="05"
          eyebrow="Technical skills"
          title="Skills, labelled honestly."
          description="No percentage bars. Each group states where the skill actually stands — used in a shipped project, working knowledge from training, familiar through coursework, or actively learning."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const Icon = icons[group.icon] ?? Code2;
            return (
              <Reveal key={group.title} delay={groupIndex * 0.06} className="h-full">
                <div className="panel panel-hover h-full p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line/70 bg-elevated/70 text-accent-soft">
                      <Icon size={16} />
                    </span>
                    <div>
                      <h3 className="font-display text-[0.95rem] font-semibold text-fg">{group.title}</h3>
                      <p className="mt-1 text-[0.75rem] text-fg-subtle">{group.blurb}</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="group/skill">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[0.86rem] font-medium text-fg">{skill.name}</span>
                          <span
                            className={cn(
                              'shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.55rem] tracking-[0.06em] uppercase',
                              levelStyles[skill.level] ?? levelStyles.familiar,
                            )}
                          >
                            {skillLevelLabels[skill.level]}
                          </span>
                        </div>
                        <p className="mt-1 text-[0.74rem] leading-relaxed text-fg-subtle">{skill.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

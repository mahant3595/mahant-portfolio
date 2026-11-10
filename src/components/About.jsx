import { Braces, GraduationCap, Layers, Rocket, ShieldCheck } from 'lucide-react';
import { personal } from '../data/personal.js';
import { certificates } from '../data/certificates.js';
import { Reveal } from './Reveal.jsx';
import { SectionHeading } from './SectionHeading.jsx';

const facts = [
  { icon: Layers, label: 'Focus', value: 'Full stack web & Android' },
  { icon: ShieldCheck, label: 'Verified credentials', value: `${certificates.length} certificates` },
  { icon: Rocket, label: 'Flagship build', value: 'SkyPredict AI (Java + ML)' },
  { icon: Braces, label: 'Working style', value: 'Offline-first, tested before shipped' },
];

const interests = [
  'On-device machine learning',
  'Android engineering with Java',
  'MERN stack applications',
  'Interface & interaction design',
  'Data-driven product decisions',
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="A developer who finishes what he starts — and proves it with deployed work."
          description="I build applications end to end: data layer, logic, interface and tests. My strongest work combines Android engineering with a machine-learning engine running entirely on the device."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="space-y-5 text-[0.97rem] leading-relaxed text-fg-muted">
            <Reveal>
              <p>
                I am <span className="font-medium text-fg">{personal.name}</span>, a software developer
                working across full stack web development and Android. My foundation came from structured
                training — a MERN full stack track, an Android App Development course, and traineeships in
                artificial intelligence, data analytics and UI/UX design — followed by a verified one-month
                full stack development internship at Thiranex.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p>
                The project I am proudest of is{' '}
                <span className="font-medium text-fg">SkyPredict AI</span>: an Android application written in
                Java that predicts temperature, humidity and rain probability from a bundled historical
                dataset using a local k-NN regression engine. It works fully offline, stores every prediction
                in a Room database, visualises trends with MPAndroidChart, and passes its JUnit suite with
                inference under 15&nbsp;ms per prediction.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p>
                What I care about is engineering judgement: normalising features so a model stays sane,
                keeping database writes off the UI thread, sharing files through content URIs instead of raw
                paths, and documenting limitations instead of hiding them. I am now looking for a software
                development internship or junior role where I can keep shipping real features with a team
                that reviews code seriously.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2 pt-2">
                {interests.map((interest) => (
                  <span key={interest} className="pill">
                    {interest}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            <Reveal className="panel p-6" delay={0.08}>
              <h3 className="font-display text-sm font-semibold tracking-wide text-fg">At a glance</h3>
              <dl className="mt-5 space-y-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 bg-elevated/70 text-accent-soft">
                      <Icon size={15} />
                    </span>
                    <div>
                      <dt className="font-mono text-[0.6rem] tracking-[0.16em] text-fg-subtle uppercase">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-[0.86rem] font-medium text-fg">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="panel panel-hover p-6" delay={0.16}>
              <div className="flex items-center gap-2 text-accent-soft">
                <GraduationCap size={16} />
                <h3 className="font-display text-sm font-semibold text-fg">Continuous learning</h3>
              </div>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-fg-muted">
                Eight verified credentials between Oct 2025 and Jun 2026, spanning full stack development,
                Android, AI, data analytics and interface design — each one tied to work I can show.
              </p>
              <a
                href="#certifications"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-accent-soft transition-colors hover:text-fg"
              >
                See the certification record
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { certificates, featuredCertificates } from '../data/certificates.js';
import { CertificateCard } from './CertificateCard.jsx';
import { Lightbox } from './Lightbox.jsx';
import { SectionHeading } from './SectionHeading.jsx';

/**
 * Important certifications — ranked, and revealed progressively as the
 * visitor scrolls. Cards animate in one by one on first view.
 */
export function Certificates() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="certifications" className="section-pad relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />

      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow="Important certifications"
          title="Verified credentials, ranked by engineering relevance."
          description="These are my strongest certificates — industry internship first, then the credentials that directly back the work in my projects. Every certificate below is the original document."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {featuredCertificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={certificates.indexOf(certificate)}
              onView={setActiveIndex}
              delay={index * 0.1}
              wide={index === 0}
            />
          ))}
        </div>

        <p className="mt-8 font-mono text-[0.68rem] tracking-[0.06em] text-fg-subtle">
          Ranked by technical relevance · credibility of issuer · hands-on development value
        </p>
      </div>

      <Lightbox
        items={certificates}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}

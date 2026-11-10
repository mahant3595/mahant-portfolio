import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently dominating the viewport.
 * Uses IntersectionObserver so it stays cheap while scrolling.
 */
export function useActiveSection(ids) {
  const key = ids.join('|');
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

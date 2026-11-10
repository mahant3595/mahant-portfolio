import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Typewriter effect for the hero role line.
 * Falls back to a static role when the user prefers reduced motion.
 */
export function TypingRoles({ roles, className }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const current = roles[index % roles.length];
    let timer;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((value) => (value + 1) % roles.length);
    } else {
      timer = setTimeout(
        () => setText(current.slice(0, deleting ? text.length - 1 : text.length + 1)),
        deleting ? 32 : 62,
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, roles, reduceMotion]);

  const visible = reduceMotion ? roles[index % roles.length] : text;

  return (
    <span className={className}>
      <span aria-hidden="true">
        {visible}
        <span className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent-soft" />
      </span>
      <span className="sr-only">{roles.join(', ')}</span>
    </span>
  );
}

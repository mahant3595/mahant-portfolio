import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered reveal. Content stays hidden until it enters the
 * viewport, then fades and slides up. Reduced-motion users get the
 * final state immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  duration = 0.65,
  amount = 0.25,
  once = true,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

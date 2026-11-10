/** Tiny class-name joiner. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Resolve a path inside /public against Vite's base URL so images keep
 * working on Vercel, Netlify and GitHub Pages project sites.
 */
export function asset(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const normalisedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalisedBase}${path.replace(/^\.?\//, '')}`;
}

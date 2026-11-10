# Mahant T — Developer Portfolio

A production-ready personal portfolio built around verified evidence: real certificate
scans, real project screenshots, and a real project report. Dark graphite theme with
electric-blue and silver accents.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion · Lucide React

---

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

Requires Node.js 20.19+ (Node 22 LTS recommended — Vite 8 minimum).

---

## Where the content lives

All portfolio content is separated from the UI. You can add certificates, projects,
skills and education entries without touching a component.

| File | Contains |
| --- | --- |
| `src/data/personal.js` | Name, roles, intro, email, GitHub, LinkedIn, resume, nav items |
| `src/data/certificates.js` | All certificates, their rank, category, skills, credential IDs |
| `src/data/achievements.js` | Competition awards (Code Relay III place, Young Innovators Ideathon) shown above the certificate grid |
| `src/data/projects.js` | Project details, screenshots, stack, architecture, metrics |
| `src/data/skills.js` | Skill groups and honest proficiency labels |
| `src/data/education.js` | Education and training timeline |

### Add a certificate

1. Export the certificate as an image and drop it in `public/images/certificates/`.
2. Add an object to `src/data/certificates.js`:

```js
{
  id: 'unique-id',
  rank: 3,                 // controls display order — not upload order
  featured: true,          // true → "Important certifications" section
  title: 'Certificate title',
  organization: 'Issuing organization',
  date: '2026-06-05',      // ISO — used for ordering/metadata
  displayDate: 'Jun 2026', // what visitors see
  category: 'Software Development',
  skills: ['Java', 'Android'],
  credentialId: 'ABC123',
  image: 'images/certificates/your-file.jpg',
  note: 'One line of context.',
  verifyUrl: '',           // optional public verification link
}
```

### Add a project

Add an object to `src/data/projects.js`. Set `deployment: null` when the app is not
publicly hosted — the UI shows a "Not publicly deployed" badge instead of a fake demo
link. Set `repo` to a GitHub URL to reveal the GitHub button.

---

## Deployment

The Vite config uses `base: './'`, so the built site works on any static host, including
sub-path deployments.

### Vercel
1. Push the repository to GitHub.
2. Import it at vercel.com → framework preset **Vite**.
3. Build command `npm run build`, output directory `dist`.

### Netlify
1. New site from Git → build command `npm run build`, publish directory `dist`.
2. `netlify.toml` is not required; the defaults above are enough.

### GitHub Pages
1. `npm run build`.
2. Publish the `dist/` folder (for example with `gh-pages -d dist`).
3. Works at `https://<user>.github.io/<repo>/` because assets use a relative base.

### After deploying
- Add your real URL to `<link rel="canonical">` in `index.html` (there is a comment marking the spot).
- Update the `og:image` / `twitter:image` values to absolute URLs on your domain for
  reliable social previews.

---

## Contact form

The form validates input and reports real outcomes only — it never shows a fake success.

1. **With a form backend (recommended):** create a form on Formspree / Formspark / Basin
   (or point it at your own API), then:
   ```bash
   cp .env.example .env
   # set VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
   ```
   The form `POST`s JSON and shows a success state only when the endpoint returns 2xx.

2. **Without a backend:** set `email` in `src/data/personal.js`. Submitting then opens the
   visitor's mail client with the message pre-filled.

3. **Neither configured:** the form states plainly that delivery is not configured.

> Environment variables are baked into the client bundle at build time. Never put a secret
> key in `VITE_*` variables — only public form endpoints belong there.

---

## Accessibility & performance

- Semantic landmarks, skip link, labelled form fields, `aria-invalid` + error messaging.
- Modals use `role="dialog"`, `aria-modal`, focus trapping, `Escape` to close and focus
  restoration to the trigger.
- All animation is disabled or reduced under `prefers-reduced-motion`.
- Images are lazy-loaded (`loading="lazy"`) except the hero portrait and first certificates.
- Certificates are optimised JPEGs (~1200px wide); screenshots are 720px wide.
- Content reveals use IntersectionObserver-backed Framer Motion `whileInView` with `once`.

---

## Project structure

```
public/
  favicon.svg  robots.txt
  docs/        sky-predict-ai-report.pdf
  images/      profile-cutout.png, profile-photo.jpg
               certificates/*.jpg, projects/*.jpg
src/
  components/  Navbar, Hero, About, Certificates, CertificateCard, Projects,
               ProjectCard, ProjectDetails, OtherCertificates, Skills, Education,
               Contact, Footer, BackToTop, Lightbox, Reveal, SectionHeading,
               TypingRoles
  data/        personal.js, certificates.js, projects.js, skills.js, education.js
  hooks/       useActiveSection.js, useScrollLock.js
  styles/      index.css (design tokens + primitives)
  utils/       cn.js (class merge + asset URL resolver)
  App.jsx  main.jsx
assets/        original uploads (PDF certificates, photo, project report)
plan.md        build tracking
```

`assets/` holds the original uploaded source material. The site only ever reads from
`public/`, so the originals stay out of the production bundle.

---

## Content still to confirm

These values were not present in the uploaded material and are intentionally left blank
or marked rather than invented:

- `personal.resume` — point it at the PDF after placing the file in `public/docs/`
- The GitHub repository URL for CrystalWall is configured; SkyPredict uses
  https://github.com/mahant3595/SkyPredict-AI

Traineeship certificates are credited to Maiyyam (Maiyyam Knowledge & Careers Pvt. Ltd.);
the documents themselves only print an "mw" logo, credential IDs and MSME / ISO 9001:2015 marks.

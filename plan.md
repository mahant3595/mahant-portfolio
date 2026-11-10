# Development plan — Mahant T portfolio

Tracking file for the build. Checked items are complete and verified.

## Stage 1 — Asset inspection and content extraction
- [x] Inventory all uploaded files in `assets/`
- [x] Extract text from the 6 traineeship certificates and the internship certificate
- [x] Extract text and structure from the SkyPredict AI project report
- [x] Extract the 8 embedded project screenshots from the report PDF
- [x] Render every certificate PDF to a high-resolution image
- [x] Prepare the uploaded portrait (background removed for the dark hero)
- [x] Build the content inventory (names, dates, credential IDs, technologies)

## Stage 2 — Certificate categorization and ranking
- [x] Categorise all 8 certificates
- [x] Rank by technical relevance, issuer credibility and hands-on development value
- [x] Split into 4 featured (important) + 4 remaining credentials

## Stage 3 — Project analysis and ranking
- [x] Extract overview, problem, solution, features, stack, architecture, testing results
- [x] Record contribution, challenges, learning outcomes and limitations
- [x] Document deployment status honestly (not publicly deployed — no live URL exists)
- [x] Publish the full report PDF as a downloadable asset

## Stage 4 — Design system and component architecture
- [x] Dark graphite palette (`#0B0F14` base → `#202B39` elevated) as Tailwind v4 tokens
- [x] Typography scale (Sora display / Inter body / JetBrains Mono accents)
- [x] Shared primitives: `panel`, `pill`, `text-gradient`, `grid-backdrop`
- [x] Data layer separated from UI components

## Stage 5 — Navigation and hero section
- [x] Sticky navbar with scroll progress, active-section indicator, mobile menu
- [x] Hero with portrait, typing roles, availability badge, CTAs, stat row
- [x] Resume button renders only when a resume file is configured

## Stage 6 — About section
- [x] Recruiter-friendly narrative based only on verified facts
- [x] "At a glance" fact panel and continuous-learning panel

## Stage 7 — Important certificates gallery
- [x] Ranked featured grid with the internship certificate in the hero slot
- [x] Staggered, scroll-triggered reveals per card (IntersectionObserver via Framer Motion)
- [x] Accessible lightbox with keyboard navigation and focus handling

## Stage 8 — Featured projects showcase
- [x] Flagship project layout with screenshot composition
- [x] Full details modal (overview → links) with screenshot gallery
- [x] Deployment status badge instead of a fake demo link
- [x] Downloadable project report

## Stage 9 — Remaining certificates and achievements
- [x] Category filters
- [x] Show more / show less
- [x] Reuses the shared certificate card and lightbox

## Stage 10 — Skills and education
- [x] 7 skill groups with honest proficiency labels (no percentage bars)
- [x] Vertical education + training timeline

## Stage 11 — Contact and footer
- [x] Validated contact form with real success/error states
- [x] Mailto fallback when no endpoint is configured (no fake submission)
- [x] Footer with navigation, highlights, copyright, back-to-top

## Stage 12 — Animations and interactions
- [x] Hero entrance, typing effect, scroll reveals, card stagger, hover transitions
- [x] Modal and lightbox transitions
- [x] `prefers-reduced-motion` respected across all motion

## Stage 13 — Responsive optimization
- [x] Mobile-first layouts from 320px up
- [x] Mobile navigation panel with scroll lock
- [x] Responsive certificate grid, project layout and gallery
- [x] No horizontal overflow at any breakpoint

## Stage 14 — SEO and accessibility
- [x] Title, meta description, keywords, Open Graph and Twitter metadata
- [x] Favicon, `theme-color`, Person structured data
- [x] Semantic landmarks, skip link, labelled inputs, modal semantics
- [x] Contrast and reduced-motion support

## Stage 15 — Testing and production build
- [x] `npm run build` succeeds with no errors
- [x] Navigation links and section anchors verified in the browser
- [x] Certificate lightbox, project modal, filters verified
- [x] Responsive layouts verified at desktop, tablet and mobile widths
- [x] Console free of errors in the running app

## Stage 16 — Deployment
- [ ] Deploy to a hosting provider
- [ ] Verify the live URL, assets and contact form on the deployed origin

> Stage 16 is intentionally unchecked: nothing has been deployed, and no live URL exists yet.

/**
 * Certificate inventory, ranked by relevance to software development.
 *
 * Ranking criteria (highest weight first):
 *   1. Technical relevance to software engineering
 *   2. Credibility / recognition of the issuer
 *   3. Hands-on development value (does it map to shipped work?)
 *   4. Currency of the certification
 *
 * Every entry below is taken from an uploaded certificate file in /assets.
 * `rank` is intentional and is NOT the upload order.
 */
export const certificates = [
  {
    id: 'thiranex-full-stack-internship',
    rank: 1,
    featured: true,
    title: 'Full Stack Development Internship',
    organization: 'Thiranex — Skill Development & Future Tech',
    date: '2026-06-01',
    displayDate: 'May – Jun 2026',
    category: 'Full Stack Development',
    skills: ['Full Stack Development', 'Web Application Delivery', 'Team Workflow'],
    credentialId: 'THX-MAY226-1827',
    image: 'images/certificates/full-stack-internship.jpg',
    note: 'Completed a one-month verified internship in full stack development (02 May 2026 – 01 Jun 2026).',
    verifyUrl: '',
  },
  {
    id: 'full-stack-mern',
    rank: 2,
    featured: true,
    title: 'Full-Stack (MERN) App / Web Development',
    organization: 'Maiyyam · EdTech traineeship platform',
    date: '2025-11-04',
    displayDate: '04 Nov 2025',
    category: 'Full Stack Development',
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs'],
    credentialId: 'MYMFSM2477',
    image: 'images/certificates/full-stack-mern.jpg',
    note: 'Credential ID myMFSM2477 — MERN application and web development training.',
    verifyUrl: '',
  },
  {
    id: 'android-app-development',
    rank: 3,
    featured: true,
    title: 'Android App Development',
    organization: 'Tech Vedhu',
    date: '2026-06-05',
    displayDate: 'May – Jun 2026',
    category: 'Software Development',
    skills: ['Android', 'Java', 'XML Layouts', 'Material Components'],
    credentialId: 'TV8765879082',
    image: 'images/certificates/android-app-development.jpg',
    note: 'Course completed 05-05-2026 to 05-06-2026 — the stack used to build SkyPredict AI.',
    verifyUrl: '',
  },
  {
    id: 'artificial-intelligence',
    rank: 4,
    featured: true,
    title: 'Artificial Intelligence Traineeship',
    organization: 'Maiyyam · EdTech traineeship platform',
    date: '2026-02-07',
    displayDate: '07 Feb 2026',
    category: 'AI & Machine Learning',
    skills: ['Machine Learning Concepts', 'Model Evaluation', 'Applied AI'],
    credentialId: 'MYMAI1483',
    image: 'images/certificates/artificial-intelligence.jpg',
    note: 'Traineeship covering applied artificial intelligence fundamentals.',
    verifyUrl: '',
  },
  {
    id: 'data-analytics',
    rank: 5,
    featured: false,
    title: 'Data Analytics Traineeship',
    organization: 'Maiyyam · EdTech traineeship platform',
    date: '2026-04-08',
    displayDate: '08 Apr 2026',
    category: 'Data Analytics',
    skills: ['Data Analysis', 'Data Interpretation', 'Reporting'],
    credentialId: 'MYMDATA3389',
    image: 'images/certificates/data-analytics.jpg',
    note: 'Traineeship covering data analysis and interpretation workflows.',
    verifyUrl: '',
  },
  {
    id: 'ui-ux-design',
    rank: 6,
    featured: false,
    title: 'UI/UX Design Traineeship',
    organization: 'Maiyyam · EdTech traineeship platform',
    date: '2025-10-07',
    displayDate: '07 Oct 2025',
    category: 'UI/UX Design',
    skills: ['Interface Design', 'User Experience', 'Design Thinking'],
    credentialId: 'MYMUIUXDS1846',
    image: 'images/certificates/ui-ux-design.jpg',
    note: 'Traineeship covering interface and user-experience design fundamentals.',
    verifyUrl: '',
  },
  {
    id: 'video-editing-motion-graphics',
    rank: 7,
    featured: false,
    title: 'Video Editing and Motion Graphics',
    organization: 'Maiyyam · EdTech traineeship platform',
    date: '2026-01-06',
    displayDate: '06 Jan 2026',
    category: 'Creative & Media',
    skills: ['Video Editing', 'Motion Graphics', 'Visual Storytelling'],
    credentialId: 'MYMVEMG1512',
    image: 'images/certificates/video-editing-motion-graphics.jpg',
    note: 'Traineeship covering editing and motion-graphics production.',
    verifyUrl: '',
  },
  {
    id: 'psychology',
    rank: 8,
    featured: false,
    title: 'Psychology Traineeship',
    organization: 'Maiyyam · EdTech traineeship platform',
    date: '2026-03-06',
    displayDate: '06 Mar 2026',
    category: 'Professional Skills',
    skills: ['Behavioural Analysis', 'Communication', 'Research Methods'],
    credentialId: 'MYMPSY1226',
    image: 'images/certificates/psychology.jpg',
    note: 'Traineeship covering behavioural science and research fundamentals.',
    verifyUrl: '',
  },
];

export const featuredCertificates = certificates
  .filter((certificate) => certificate.featured)
  .sort((a, b) => a.rank - b.rank);

export const remainingCertificates = certificates
  .filter((certificate) => !certificate.featured)
  .sort((a, b) => a.rank - b.rank);

export const certificateCategories = [
  'All',
  ...Array.from(new Set(certificates.map((certificate) => certificate.category))),
];

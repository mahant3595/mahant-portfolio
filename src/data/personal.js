/**
 * Personal / identity content.
 * Everything the site says about you lives in the `src/data` folder.
 *
 * Fields marked TODO need your confirmation — nothing here is invented.
 */
export const personal = {
  name: 'Mahant T',
  firstName: 'Mahant',
  initials: 'MT',
  title: 'Full Stack Developer',

  /** Typing animation in the hero. Only titles backed by real work. */
  roles: [
    'Full Stack Developer',
    'Java & Android Developer',
    'MERN Stack Developer',
    'Applied Machine Learning Enthusiast',
  ],

  /** Short, recruiter-facing positioning line. */
  headline: 'I build full stack, Android and machine-learning applications that run end to end.',

  intro:
    'I am a developer focused on full stack web development and Android engineering. My work so far spans a MERN full stack internship, a Java Android application with an on-device machine-learning engine, and structured training in AI, data analytics and interface design. I care about software that works offline, loads fast, and is tested before it ships.',

  availability: 'Open to software development internships and junior developer roles',
  location: 'Coimbatore, Tamil Nadu',


  /* ---------------------------------------------------------------------
   * Contact + links — fill these in and the UI updates automatically.
   * Empty values simply hide the corresponding button/link.
   * ------------------------------------------------------------------- */
  email: 'mahantvibisha@gmail.com',
  github: 'https://github.com/mahant3595',
  linkedin: 'https://www.linkedin.com/in/mahant-t-842034389',
  resume: '', // TODO: path to a PDF placed in /public, e.g. './docs/Mahant-T-Resume.pdf'

  /**
   * Optional form backend (Formspree, Getform, Basin, your own API...).
   * When empty the contact form composes an email in the visitor's mail app
   * instead of pretending to submit.
   */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

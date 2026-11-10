/**
 * Competition awards and recognitions — distinct from certifications.
 *
 * Each entry is backed by an uploaded certificate document in /assets:
 *   - CodeRelay_Gateway'26.pdf   → III place, Code Relay, GATEWAY '26 (PSG)
 *   - hackathon_rvs_college.pdf  → Young Innovators Ideathon, YII '2026 (RVS)
 *
 * These are deliberately NOT part of `certificates.js`, so the certification
 * count on the site stays accurate. They share the certificate lightbox shape
 * (title / organization / displayDate / image / skills) so one viewer serves both.
 */
export const achievements = [
  {
    id: 'code-relay-gateway-26',
    kind: 'award',
    badge: 'III PLACE',
    title: 'III Place — Code Relay, GATEWAY ’26',
    organization: 'PSG College of Arts & Science · National Level Inter Collegiate Technical Symposium',
    displayDate: '25 Feb 2026',
    date: '2026-02-25',
    category: 'Competitive Programming',
    detail:
      'Won third place in the Code Relay event at GATEWAY ’26, the national level inter-collegiate technical symposium organised by the School of Computational Sciences, PSG College of Arts & Science.',
    skills: ['Problem Solving', 'Team Relay', 'Programming'],
    credentialId: '',
    image: 'images/certificates/code-relay-gateway-26.jpg',
    imageAlt: 'GATEWAY 26 certificate of achievement from PSG College of Arts and Science for third place in Code Relay',
  },
  {
    id: 'young-innovators-ideathon',
    kind: 'recognition',
    badge: 'PRESENTED',
    title: 'Young Innovators Ideathon — YII ’2026',
    organization: 'RVS College of Arts and Science, Sulur · with Sanskriti University',
    displayDate: '7–9 Jan 2026',
    date: '2026-01-09',
    category: 'Innovation & Pitching',
    detail:
      'Presented an innovation at the Young Innovators Ideathon, an intercollegiate innovation competition organised by the School of Computer Studies, RVS College of Arts and Science, in collaboration with Sanskriti University, Uttar Pradesh.',
    skills: ['Ideation', 'Presentation', 'Innovation'],
    credentialId: '',
    image: 'images/certificates/young-innovators-ideathon.jpg',
    imageAlt: 'RVS College of Arts and Science certificate of participation for the Young Innovators Ideathon 2026',
  },
];

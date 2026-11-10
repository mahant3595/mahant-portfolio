/**
 * Skills extracted from the uploaded certificates and the SkyPredict AI
 * project report. No percentage bars — only honest proficiency labels.
 *
 * level values: 'used' | 'working' | 'familiar' | 'learning'
 */
export const skillLevelLabels = {
  used: 'Used in projects',
  working: 'Working knowledge',
  familiar: 'Familiar with',
  learning: 'Currently learning',
};

export const skillGroups = [
  {
    title: 'Programming Languages',
    icon: 'Code2',
    blurb: 'Languages I write application logic in.',
    skills: [
      { name: 'Java', level: 'used', detail: 'Java 17 — SkyPredict AI application and prediction engine' },
      { name: 'JavaScript', level: 'working', detail: 'MERN full stack traineeship and internship' },
      { name: 'SQL', level: 'working', detail: 'Room / SQLite schema, queries and DAO operations' },
      { name: 'HTML & CSS', level: 'working', detail: 'Web application development training' },
    ],
  },
  {
    title: 'Frontend Development',
    icon: 'LayoutDashboard',
    blurb: 'Interfaces and client-side application structure.',
    skills: [
      { name: 'React', level: 'working', detail: 'Component-based UI as part of the MERN stack' },
      { name: 'Responsive Layouts', level: 'working', detail: 'Interface design training and application screens' },
      { name: 'Android XML Views', level: 'used', detail: 'All six SkyPredict AI screens are built with XML layouts' },
      { name: 'Material Components', level: 'used', detail: 'Cards, inputs, chips and navigation in the Android app' },
    ],
  },
  {
    title: 'Backend Development',
    icon: 'Server',
    blurb: 'Server-side and application-layer logic.',
    skills: [
      { name: 'Node.js', level: 'working', detail: 'MERN stack training' },
      { name: 'Express', level: 'working', detail: 'REST endpoints and routing in MERN training' },
      { name: 'REST APIs', level: 'familiar', detail: 'Consumed and designed during full stack training' },
      { name: 'Java Application Logic', level: 'used', detail: 'Prediction, persistence and sharing layers in SkyPredict AI' },
    ],
  },
  {
    title: 'Databases',
    icon: 'Database',
    blurb: 'Where the data actually lives.',
    skills: [
      { name: 'SQLite / Room', level: 'used', detail: 'Entity, DAO and database layer with background-thread writes' },
      { name: 'MongoDB', level: 'working', detail: 'Document database work in MERN training' },
      { name: 'Data Modelling', level: 'working', detail: 'Weather record schema and CSV dataset structuring' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: 'BrainCircuit',
    blurb: 'Applied, on-device ML rather than buzzwords.',
    skills: [
      { name: 'k-NN Regression', level: 'used', detail: 'Multivariate k-NN with inverse-distance weighting, k = 4' },
      { name: 'Feature Normalisation', level: 'used', detail: 'Day-of-year and city modifier scaled to a 0–1 feature space' },
      { name: 'Model Evaluation & Testing', level: 'working', detail: 'JUnit tests validating prediction bounds and dataset loading' },
      { name: 'Applied AI Fundamentals', level: 'familiar', detail: 'Artificial Intelligence traineeship' },
    ],
  },
  {
    title: 'Development Tools',
    icon: 'Wrench',
    blurb: 'The everyday workflow.',
    skills: [
      { name: 'Android Studio', level: 'used', detail: 'Primary IDE for the SkyPredict AI project' },
      { name: 'Git & GitHub', level: 'working', detail: 'Version control for training and personal projects' },
      { name: 'JUnit', level: 'working', detail: 'Five unit tests covering the prediction engine' },
      { name: 'Gradle Builds', level: 'familiar', detail: 'Android dependency and build configuration' },
      { name: 'Chrome Extensions (MV3)', level: 'used', detail: 'CrystalWall new-tab extension — permissions, storage and new-tab override' },
    ],
  },
  {
    title: 'Design & Product',
    icon: 'PenTool',
    blurb: 'Making the thing usable, not just functional.',
    skills: [
      { name: 'UI/UX Design', level: 'familiar', detail: 'UI/UX Design traineeship' },
      { name: 'Data Analytics', level: 'familiar', detail: 'Data Analytics traineeship' },
      { name: 'Motion & Media', level: 'familiar', detail: 'Video Editing and Motion Graphics traineeship' },
    ],
  },
];

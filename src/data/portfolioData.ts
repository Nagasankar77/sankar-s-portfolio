import { AchievementItem, EducationData, JourneyMilestone, ProjectItem, SkillItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Naga Sankar',
  brandName: 'NAGA SANKAR',
  roles: [
    '2nd-Year B.Tech AI & ML Student',
    'Python & Machine Learning Learner',
    'Practical AI Builder',
    'Generative AI Explorer',
  ],
  primaryRole: 'AI & MACHINE LEARNING STUDENT',
  statusLabel: '2nd-Year B.Tech AI & ML Student',
  tagline: 'Turning curiosity into code, ideas into projects, and learning into something real.',
  shortBio:
    'I am a 2nd-year B.Tech student specializing in Artificial Intelligence and Machine Learning. I am currently building my foundation in Python, Data Structures and Algorithms, databases, Artificial Intelligence and Machine Learning. I enjoy building practical projects and exploring how AI can solve real-world problems.',
  detailedBio:
    'I am a 2nd-year B.Tech student specializing in Artificial Intelligence and Machine Learning. I am currently building my foundation in Python, Data Structures and Algorithms, databases, Artificial Intelligence and Machine Learning. I enjoy building practical projects and exploring how AI can solve real-world problems.',
  status: '2nd-Year B.Tech AI & ML Student',
  college: 'Chalapathi Institute of Technology (CIT)',
  collegeCode: 'CITY',
  location: 'Mothadaka, Guntur, Andhra Pradesh – 522016',
  campusAddress: 'Abburi Raghavaiah Nagar, Mothadaka, Guntur, Andhra Pradesh – 522016',
  email: 'vankamallanagasankar33@gmail.com',
  github: 'https://github.com/Nagasankar77',
  linkedin: 'https://linkedin.com/in/nagasankar-aiml',
  twitter: 'https://x.com/nagasankar_ai',
  resumeUrl: '/resume.pdf',
  resumeDownloadFileName: 'NagaSankar-Resume.pdf',
};

export const STATS = [
  {
    value: '2nd Year',
    suffix: '',
    label: 'ACADEMIC YEAR',
    sublabel: 'B.Tech AI & ML',
    isNumber: false,
  },
  {
    value: 'CIT',
    suffix: ' (CITY)',
    label: 'COLLEGE CODE',
    sublabel: 'Chalapathi Inst. of Tech',
    isNumber: false,
  },
  {
    value: 'Core Track',
    suffix: '',
    label: 'LEARNING FOCUS',
    sublabel: 'Python, DSA & AI/ML',
    isNumber: false,
  },
  {
    value: '4',
    suffix: ' Projects',
    label: 'PRACTICAL BUILDS',
    sublabel: 'Hands-on Learning',
    isNumber: false,
  },
];

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Skills' },
  { id: 'programming', label: 'Programming' },
  { id: 'core', label: 'Core CS' },
  { id: 'aiml', label: 'AI & ML' },
  { id: 'web', label: 'Development' },
] as const;

export const SKILLS: SkillItem[] = [
  // Programming
  {
    name: 'Python',
    category: 'programming',
    description: 'Core programming syntax, algorithm implementation, scripting, data handling.',
    icon: 'Code2',
    level: 'Core Language',
    highlight: true,
  },
  {
    name: 'C',
    category: 'programming',
    description: 'Foundational programming concepts, memory pointers, logic and syntax basics.',
    icon: 'Terminal',
    level: 'Foundational',
  },
  {
    name: 'Java',
    category: 'programming',
    description: 'Object-oriented programming principles, classes and basic data structures.',
    icon: 'FileCode',
    level: 'Foundational',
  },

  // Core
  {
    name: 'Data Structures & Algorithms',
    category: 'core',
    description: 'Arrays, linked lists, stacks, queues, searching and sorting complexities.',
    icon: 'Cpu',
    level: 'Active Learning',
    highlight: true,
  },

  // AI & ML
  {
    name: 'Artificial Intelligence',
    category: 'aiml',
    description: 'Fundamental principles of intelligent systems, problem solving and search.',
    icon: 'Brain',
    level: 'Academic Focus',
    highlight: true,
  },
  {
    name: 'Machine Learning',
    category: 'aiml',
    description: 'Supervised and unsupervised learning concepts, statistical models and evaluation.',
    icon: 'Layers',
    level: 'Academic Focus',
    highlight: true,
  },
  {
    name: 'Generative AI',
    category: 'aiml',
    description: 'Large language models, generative interfaces, prompt engineering pipelines.',
    icon: 'Sparkles',
    level: 'Hands-on Exploration',
    highlight: true,
  },

  // Development
  {
    name: 'HTML',
    category: 'web',
    description: 'Semantic markup, accessible page structure and standard web elements.',
    icon: 'Globe',
    level: 'Foundational',
  },
  {
    name: 'JavaScript',
    category: 'web',
    description: 'DOM interaction, asynchronous requests, modern ES6+ syntax.',
    icon: 'FileJson',
    level: 'Foundational',
  },
  {
    name: 'React',
    category: 'web',
    description: 'Component architecture, state management, hooks and responsive SPAs.',
    icon: 'Atom',
    level: 'Active Learning',
    highlight: true,
  },
  {
    name: 'GitHub',
    category: 'web',
    description: 'Repository hosting, open-source projects, version tracking.',
    icon: 'Github',
    level: 'Daily Tool',
    highlight: true,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proximus',
    number: '01',
    title: 'PROXIMUS',
    subtitle: 'AI-Powered Learning & Exam Preparation Platform',
    category: 'AI • Education',
    description:
      'An AI-powered learning platform designed to help students prepare for exams using their own notes, PDFs and topics.',
    tags: ['Python', 'Generative AI', 'React', 'PDF Parsing'],
    badge: 'Featured Project',
    features: [
      'Document and note ingestion',
      'AI syllabus and topic breakdown',
      'Exam preparation blueprints',
      'Interactive concept mind maps',
    ],
    caseStudy: {
      problem:
        'Students often struggle during university exam preparation because of unorganized lecture notes, scattered syllabi, and difficulty breaking down heavy academic material into clear revision plans.',
      solution:
        'PROXIMUS ingests student notes and course materials, applies AI analysis to extract core topics, and produces structured study blueprints and visual maps to guide revision efficiently.',
      features: [
        'Upload lecture notes and PDF study material',
        'Automated syllabus breakdown and key topic identification',
        'Structured exam blueprints with priority topics',
        'Interactive conceptual summaries',
      ],
      techStack: [
        'Python',
        'Generative AI / LLM APIs',
        'React & TypeScript',
        'Document Processing Tools',
      ],
      architecture:
        'Client React App → Document Ingestion Service → AI Parsing Pipeline → Structured Study Guide & Topic Trees',
      architecturePoints: [
        'Ingestion: Student uploads PDFs or notes for specific coursework.',
        'Processing: Semantic analysis extracts important topics and themes.',
        'Output: Clear revision checklists and visual study outlines.',
      ],
      challenges: [
        'Handling diverse student PDF formats and handwritten scans.',
        'Presenting technical summaries without losing core academic accuracy.',
      ],
      outcome:
        'A practical learning tool that helps students organize exam revision systematically.',
      demoUrl: '#',
      githubUrl: 'https://github.com/Nagasankar77/proximus-',
    },
  },
  {
    id: 'careerpath-ai',
    number: '02',
    title: 'CareerPath AI',
    subtitle: 'AI Career Guidance Platform',
    category: 'AI • Career Planning',
    description:
      'An AI-powered career guidance platform that analyzes a student’s resume and target career, identifies skill gaps and creates a personalized learning roadmap.',
    tags: ['Python', 'Machine Learning', 'React', 'Roadmaps'],
    badge: 'Career AI',
    features: [
      'Resume and skill analysis',
      'Target role benchmark comparison',
      'Skill gap identification',
      'Personalized milestone learning trajectory',
    ],
    caseStudy: {
      problem:
        'Early-stage computer science students often do not know which specific skills are required for target roles, leading to misdirected effort and unguided self-study.',
      solution:
        'CareerPath AI compares a student’s verified coursework and profile against common industry requirements for software and AI roles, pinpointing concrete skill gaps and building an actionable roadmap.',
      features: [
        'Student profile and skill intake',
        'Role requirement mapping (AI Engineer, Data Scientist, SDE)',
        'Clear visual breakdown of missing prerequisites',
        'Step-by-step milestone timeline',
      ],
      techStack: [
        'Python / ML Concepts',
        'React & TypeScript',
        'Data Analysis Libraries',
        'REST API Integration',
      ],
      architecture:
        'Student Profile → Skill Matching Module → Gap Analysis Engine → Milestone Roadmap Display',
      architecturePoints: [
        'Analysis: Compares user skill inputs with target competency benchmarks.',
        'Synthesis: Generates structured chronological milestones.',
      ],
      challenges: [
        'Balancing theoretical prerequisites with hands-on project recommendations.',
      ],
      outcome:
        'Gives learners clarity on what to learn next to prepare for upcoming roles.',
      demoUrl: '#',
      githubUrl: 'https://github.com/Nagasankar77/Career-path-',
    },
  },
  {
    id: 'house-of-devil',
    number: '03',
    title: 'THE HOUSE OF DEVIL',
    subtitle: 'Interactive Psychological Horror Web Game',
    category: 'Interactive Web Experience',
    description:
      'An interactive first-person psychological horror web game focused on exploration, storytelling and atmospheric gameplay.',
    tags: ['JavaScript', 'React', 'Interactive Web', 'Game Logic'],
    badge: 'Web Game',
    features: [
      'First-person web exploration mechanics',
      'Dynamic psychological audio cues',
      'Storyline-driven clue investigation',
      'Real-time atmospheric lighting and states',
    ],
    caseStudy: {
      problem:
        'Creating an engaging, atmospheric 3D-feeling narrative game entirely within standard browser technologies without heavy external engine downloads.',
      solution:
        'Built using modern browser rendering, responsive canvas/DOM techniques, procedural audio triggers, and an interactive state engine.',
      features: [
        'Immersive ambient environment',
        'Inventory and clue collection mechanics',
        'Branching puzzle interactions',
      ],
      techStack: ['JavaScript / TypeScript', 'React', 'HTML5 Canvas & Audio API', 'Tailwind CSS'],
      architecture:
        'Browser Game Loop → Player State Manager → Audio & Visual Event Trigger → Interactive Canvas',
      architecturePoints: [
        'State Management: Tracks player discoveries, health, and room progression.',
        'Audio Design: Context-aware sound effects enhance tension.',
      ],
      challenges: [
        'Optimizing browser performance and audio synchronicity across mobile and desktop.',
      ],
      outcome:
        'A complete playable web game demonstrating creative interactive programming.',
      demoUrl: '#',
      githubUrl: 'https://github.com/Nagasankar77/The-House-OF-Devil-',
    },
  },
];

export const JOURNEY: JourneyMilestone[] = [
  {
    year: '2026',
    title: 'Foundation',
    description:
      'Mastering software programming, computational thinking, and core database management.',
    highlights: ['Python', 'C', 'DSA', 'DBMS', 'Web fundamentals'],
    status: 'current',
  },
  {
    year: '2027',
    title: 'AI/ML Foundation',
    description:
      'Deepening mathematical foundations and applying classical machine learning to real-world datasets.',
    highlights: ['Machine Learning', 'Statistics', 'Data Processing', 'Deep Learning'],
    status: 'upcoming',
  },
  {
    year: '2028',
    title: 'Advanced AI',
    description:
      'Exploring generative architectures, large language models, retrieval pipelines and agentic systems.',
    highlights: ['Generative AI', 'LLMs', 'RAG', 'AI Agents'],
    status: 'upcoming',
  },
  {
    year: '2029',
    title: 'Career',
    description:
      'Gaining hands-on industry experience, building production AI systems, and preparing for engineering roles.',
    highlights: ['Internships', 'Advanced Projects', 'AI Engineering', 'Job Preparation'],
    status: 'upcoming',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'building-skills',
    title: 'Currently building my skills through academic learning, practical projects and continuous development.',
    category: 'Projects',
    issuer: 'Chalapathi Institute of Technology (CIT)',
    date: '2026',
    description:
      'Dedicated to foundational coursework at Chalapathi Institute of Technology (CIT), active programming practice, and developing practical student applications.',
    badgeText: 'Active Student',
  },
];

export const EDUCATION: EducationData = {
  institution: 'Chalapathi Institute of Technology (CIT)',
  degree: 'B.Tech – Artificial Intelligence & Machine Learning',
  branch: 'Artificial Intelligence & Machine Learning',
  cgpa: 'Expected Graduation: 2027',
  timeline: '2023 – 2027',
  location: 'Mothadaka, Guntur, Andhra Pradesh – 522016',
  highlights: [
    'College Code: CITY',
    'Campus: Abburi Raghavaiah Nagar, Mothadaka, Guntur, AP – 522016',
    'Expected Graduation: 2027',
    'Active focus on Python, Data Structures & Algorithms, and AI/ML',
  ],
  relevantCoursework: [
    'Python Programming',
    'Data Structures & Algorithms',
    'Artificial Intelligence',
    'Machine Learning',
    'Object-Oriented Programming (Java)',
    'C Programming',
  ],
};

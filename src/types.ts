export interface SkillItem {
  name: string;
  category: 'programming' | 'core' | 'aiml' | 'web' | 'tools' | 'databases';
  description: string;
  icon: string;
  level?: string;
  highlight?: boolean;
}

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  architecture: string;
  architecturePoints: string[];
  challenges: string[];
  outcome: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  features: string[];
  caseStudy: ProjectCaseStudy;
  badge?: string;
  isPlaceholder?: boolean;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  highlights: string[];
  status: 'completed' | 'current' | 'upcoming';
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathons' | 'Projects' | 'Certifications' | 'Academic' | 'Competitions';
  issuer: string;
  date: string;
  description: string;
  badgeText: string;
  credentialUrl?: string;
}

export interface EducationData {
  institution: string;
  degree: string;
  branch: string;
  cgpa: string;
  timeline: string;
  location: string;
  highlights: string[];
  relevantCoursework: string[];
}

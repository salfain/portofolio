export type SkillLevel = "Fundamental" | "Intermediate" | "Advanced";

export type ProjectCategory =
  | "Web Development"
  | "IT Support"
  | "Network"
  | "Server"
  | "Database"
  | "Documentation"
  | "Cybersecurity Basic";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  shortDescription: string;
  problem: string;
  solution: string;
  content: string;
  features: string[];
  thumbnailUrl: string;
  images: { url: string; caption: string }[];
  technologies: string[];
  year: number;
  demoUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
}

export interface Skill {
  name: string;
  level: SkillLevel;
  description: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  type: "work" | "freelance" | "internship" | "organization" | "project";
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  schoolName: string;
  major: string;
  startYear: number;
  endYear: number | null;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  description: string;
}

export interface Capability {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

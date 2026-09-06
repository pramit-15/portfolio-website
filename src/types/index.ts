export interface ProjectStage {
  id: string;
  name: string;
  shortDesc: string;
  details: string;
  badge: string;
  metrics?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  repoUrl: string;
  liveUrl?: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  stages?: ProjectStage[];
  highlights: string[];
  techStack: string[];
  testSuite: {
    unitTests: number;
    integrationTests: number;
    coverageOrFramework: string;
  };
}

export interface SkillCategory {
  title: string;
  role: string;
  skills: {
    name: string;
    level?: string;
    productionProof: string;
    projectAssociation: string;
  }[];
}

export interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
}

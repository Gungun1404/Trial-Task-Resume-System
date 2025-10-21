export interface Activity {
  id: string;
  type: 'internship' | 'hackathon' | 'course' | 'project';
  title: string;
  organization: string;
  date: string;
  status: 'completed' | 'in-progress' | 'verified';
  skills: string[];
  description: string;
}

export interface Skill {
  name: string;
  level: number;
  verified: boolean;
  category: 'technical' | 'soft' | 'language';
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  activities: Activity[];
  skills: Skill[];
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }[];
}

export interface ThemeConfig {
  primaryColor: string;
  layout: 'modern' | 'classic' | 'minimal';
  fontSize: 'small' | 'medium' | 'large';
}

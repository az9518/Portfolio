import { Github, Linkedin, Codepen, Mail, Wind, Database, Server, FileCode2, RectangleHorizontal, Code, Code2, CodeSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  liveDemoUrl: string;
  repoUrl: string;
};

type Skill = {
  name: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/az9518', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aman-srivastava-822678196/', icon: Linkedin },
  { name: 'Gmail', url: 'mailto:srivastavaaman4you@gmail.com', icon: Mail }
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'TMF Horizon',
    description: 'Enterprise application for creating payslips for multiple clients and conducting audits. Designed dynamic UIs and built robust APIs, optimizing backend logic and stored procedures for efficient data handling and performance.',
    image: 'project-1',
    liveDemoUrl: '#',
    repoUrl: 'https://github.com/amansrivastava',
  },
  {
    id: 'project-2',
    title: 'Ascend Learning',
    description: 'Developed a BI solution integrating real-time Jira data with Snowflake enterprise data, delivering actionable insights via Power BI dashboards.',
    image: 'project-2',
    liveDemoUrl: '#',
    repoUrl: 'https://github.com/amansrivastava',
  },
];

export const skills: Skill[] = [
  { name: 'C#', icon: Code2 },
  { name: 'Python', icon: FileCode2 },
  { name: 'JavaScript', icon: Code2 },
  { name: 'SQL', icon: Database },
  { name: 'TypeScript', icon: Code2 },
  { name: 'Angular', icon: Codepen },
  { name: '.NET Core', icon: Server },
  { name: 'ASP.NET MVC', icon: Server },
  { name: 'Entity Framework', icon: Server },
  { name: 'Web API', icon: Server },
  { name: 'MySQL', icon: Database },
  { name: 'MongoDB', icon: Database },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Snowflake', icon: Database },
  { name: 'SQL Server', icon: Database },
  { name: 'Power BI', icon: Wind },
  { name: 'Azure DevOps', icon: Server },
  { name: 'Docker', icon: Server },
  { name: 'Postman', icon: Code },
  { name: 'Git', icon: Github },
  { name: 'Jira', icon: Wind },
  { name: 'ServiceNow', icon: Wind },
];

export const name: string = "Aman Srivastava";
export const bio: string = "Full Stack Web Developer at Vinci Highways, specializing in building scalable enterprise applications using .NET Core, ASP.NET MVC, Angular, and TypeScript. Expert in full-stack development, API design, and database optimization with 2+ years of experience. Currently leading development of learning platforms and highway infrastructure management tools. Proven track record of implementing ETL pipelines, optimizing performance, and delivering robust solutions for international teams. Passionate about creating high-performance applications that drive business value.";

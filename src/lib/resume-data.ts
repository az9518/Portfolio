import type { LucideIcon } from 'lucide-react';

export type SkillCategory = {
    category: string;
    items: string;
};

export type ProjectLink = {
    name: string;
    url: string;
};

export type Project = {
    name: string;
    description: string;
    links: ProjectLink[];
};

export type Experience = {
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
};

export type Education = {
    degree: string;
    institution: string;
    location: string;
    period: string;
    score: string;
};

export type Achievement = {
    title: string;
    description: string;
    link?: string;
};

export type ContactInfo = {
    name: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
};

export const contactInfo: ContactInfo = {
    name: 'Aman Srivastava',
    phone: '+91 9314891942',
    email: 'srivastavaaman4you@gmail.com',
    github: 'github.com/az9518',
    linkedin: 'linkedin.com/in/aman-srivastava-822678196',
    location: 'Bangalore, Karnataka, India',
};

export const education: Education[] = [
    {
        degree: 'B.Tech in Electronics And Communication',
        institution: 'SRM Institute of Science And Technology',
        location: 'Chennai, Tamil Nadu',
        period: 'May 2018 - May 2022',
        score: 'CGPA: 8.91/10',
    },
    {
        degree: '12th Grade',
        institution: 'Lucknow Public School',
        location: 'Lucknow, UP',
        period: '2018',
        score: 'Score: 75%',
    },
];

export const skills: SkillCategory[] = [
    {
        category: 'Programming Languages',
        items: 'C#, Python, JavaScript, SQL, TypeScript',
    },
    {
        category: 'Frameworks and Libraries',
        items: 'Angular, .NET Core, ASP.NET MVC, Entity Framework, Web API',
    },
    {
        category: 'Databases',
        items: 'MySQL, MongoDB, PostgreSQL, Snowflake, SQL Server',
    },
    {
        category: 'Environments and Tools',
        items: 'Azure DevOps, Docker, Git, Postman, Power BI, Jira, ServiceNow',
    },
];

export const experience: Experience[] = [
    {
        title: 'Full Stack Web Developer',
        company: 'Vinci Highways',
        period: 'Present',
        responsibilities: [
            'Project Upskill: Leading the development of a specialized learning and skill-tracking platform, focusing on enhancing employee performance through targeted training modules and programs.',
            'Project M50: Contributing to the M50 highway infrastructure project by developing robust web-based management tools for real-time monitoring and reporting.',
            'Designing and maintaining scalable full-stack architectures using modern web technologies to ensure high availability and performance.',
            'Collaborating with international teams to align software solutions with global highway management standards.',
        ],
    },
    {
        title: 'Senior Software Engineer',
        company: 'Happiest Minds Technologies',
        period: 'Aug 2022 – Dec 2024',
        responsibilities: [
            'Led end-to-end development of Web applications, overseeing the entire lifecycle from initial concept and design through development, testing, and deployment.',
            'Designed and developed core features, integrating Web APIs and Angular; managed angular upgrades, unit testing (QA), and Azure DevOps pipeline basics.',
            'Implemented ETL data pipelines using Power Query to extract data from Jira REST API, loading processed data into Snowflake for Power BI analytics.',
            'Focused on application stability by resolving critical bugs and performing stored procedure performance tuning.',
        ],
    },
];

export const projects: Project[] = [
    {
        name: 'TMF Horizon',
        description: 'Enterprise application for creating payslips for multiple clients and conducting audits. Designed dynamic UIs and built robust APIs, optimizing backend logic and stored procedures.',
        links: [
            { name: 'Company Project', url: '#' },
        ],
    },
    {
        name: 'Ascend Learning',
        description: 'Developed a BI solution integrating real-time Jira data with Snowflake enterprise data, delivering actionable insights via Power BI dashboards.',
        links: [
            { name: 'Company Project', url: '#' },
        ],
    },
];

export const achievements: Achievement[] = [
    {
        title: 'Chess Nationals Award',
        description: 'Won Chess Nationals award for representing LPS at the national level.',
    },
    {
        title: 'Team Excellence Award',
        description: 'Won Team Excellence award for outstanding collaborative efforts and achieving exceptional results at Happiest Minds Technologies.',
    },
    {
        title: 'Community Service',
        description: 'Active member of NGO BHUMI and regular blood donor.',
    },
];
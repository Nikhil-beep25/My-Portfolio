export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  impact: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
  link?: string;
  github?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  field: string;
}

export interface Certification {
  title: string;
  issuer: string;
  topics: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export const PERSONAL_INFO = {
  name: "Nikhil Bhadauriya",
  title: "Full Stack Developer",
  headline: "Building Modern Full-Stack Applications, AI-Driven Architectures & Immersive 3D Interfaces",
  location: "Noida, Uttar Pradesh, India",
  coordinates: "28.5355° N, 77.3910° E",
  phone: "+91 9259329680",
  email: "nikhilbhadauriya2500@gmail.com",
  status: "Available for Full-Stack Roles & High-Impact Projects",
  systemVersion: "v2026.4.2",
  socials: {
    github: "https://github.com/Nikhil-beep25",
    linkedin: "https://linkedin.com/in/nikhil-bhadauriya-308414321",
  },
  resumePdfUrl: "/assets/Nikhil_Bhadauriya_Resume.pdf",
  bio: "Full Stack Developer with hands-on experience building robust web applications using Python, JavaScript, TypeScript, React.js, Next.js, Node.js, Express.js, and REST APIs. Experienced in full-stack architecture, API integration, database-driven applications, and responsive UI development across e-commerce, automotive telemetry, and institutional management systems. Proficient in agile methodologies, version control with Git, and deploying production-ready applications.",
};

export const EDUCATION_LIST: Education[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Dr. Bhimrao Ambedkar University (DBRAU)",
    period: "2024 – 2027",
    location: "Agra, India",
    field: "Computer Science"
  }
];

export const CERTIFICATIONS_LIST: Certification[] = [
  {
    title: "The Complete Web Developer Bootcamp",
    issuer: "Udemy",
    topics: "Full Stack Development with React, Node.js & MongoDB"
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    topics: "Problem Solving, ES6+, OOP & Functional Programming"
  },
  {
    title: "Python for Everybody Specialization",
    issuer: "Coursera (University of Michigan)",
    topics: "Python Programming & Web Services"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "carverse",
    title: "CarVerse – Car Management System",
    tagline: "Automotive Management Platform & Telemetry System",
    category: "Full Stack / MERN Architecture",
    year: "2025 - 2026",
    description: "Developed a comprehensive car management system using the MERN stack (MongoDB, Express.js, React.js, Node.js), implementing full CRUD operations, advanced search/filter, admin dashboard with real-time inventory tracking, image upload, paginated views, and role-based access control for desktop and mobile.",
    impact: "Streamlined automotive inventory management and inspection workflows with sub-second response times and real-time state synchronization.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    metrics: [
      { label: "Architecture", value: "MERN Stack" },
      { label: "Access Control", value: "Role-Based" },
      { label: "CRUD Operations", value: "Real-Time" }
    ],
    featured: true,
    github: "https://github.com/Nikhil-beep25"
  },
  {
    id: "ecommerce-ai",
    title: "AI-Powered E-commerce Website",
    tagline: "Full-Stack E-commerce with Generative AI Integrations",
    category: "Python Full Stack & AI Services",
    year: "2025 - 2026",
    description: "Built a full-stack e-commerce application with AI-powered functionality, featuring product catalogue management, responsive UI, RESTful API integration, dynamic search, secure checkout, AI-driven recommendations, user authentication, order tracking, and an admin dashboard for inventory and analytics.",
    impact: "Integrated generative recommendations and intelligent query parsing that boosted product discovery and automated inventory analytics.",
    technologies: ["Python", "Flask", "React.js", "PostgreSQL", "Generative AI", "REST APIs"],
    metrics: [
      { label: "Search & Recs", value: "AI-Powered" },
      { label: "Checkout Pipeline", value: "Secure & Encrypted" },
      { label: "Dashboard", value: "Analytics & Orders" }
    ],
    featured: true,
    github: "https://github.com/Nikhil-beep25"
  },
  {
    id: "vidyasanchar",
    title: "VidyaSanchar – Student Management System",
    tagline: "Institutional ERP & Academic Management Fabric",
    category: "Database-Driven Systems / Relational Architecture",
    year: "2025",
    description: "Built a student management system using React, Node.js, and PostgreSQL, featuring enrollment, attendance tracking, grade management, role-based access control for administrators and faculty, data export, and interactive analytics dashboards with RESTful API architecture.",
    impact: "Unified student academic lifecycles into a synchronized relational database schema with automated grade computation and attendance audits.",
    technologies: ["React.js", "Node.js", "PostgreSQL", "Express.js", "Prisma ORM", "REST APIs"],
    metrics: [
      { label: "Relational Engine", value: "PostgreSQL" },
      { label: "Role Hierarchy", value: "Admin & Faculty" },
      { label: "Analytics", value: "Interactive" }
    ],
    featured: true,
    github: "https://github.com/Nikhil-beep25"
  },
  {
    id: "mysignsetu",
    title: "MYSignSetu & NagrikSetu",
    tagline: "Cryptographic Trust Layer & Civic Infrastructure",
    category: "Security & Civic Technology",
    year: "2025",
    description: "Cryptographic digital document verification and public civic assistance platform. Built with modular TypeScript architecture, asymmetric hash validation, and high-accessibility cross-device UI.",
    impact: "Eliminated paper-intensive signing workflows while establishing verifiable non-repudiation audit trails for sensitive agreements.",
    technologies: ["TypeScript", "Next.js", "Node.js", "WebCrypto API", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Verification", value: "Instant" },
      { label: "Audit Integrity", value: "SHA-256" },
      { label: "Compliance", value: "Enterprise" }
    ],
    featured: true,
    github: "https://github.com/Nikhil-beep25"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"]
  },
  {
    category: "Frontend Development",
    items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Responsive UI/UX", "Three.js"]
  },
  {
    category: "Backend Development",
    items: ["Node.js", "Express.js", "Python", "Flask", "REST APIs"]
  },
  {
    category: "Databases & ORM",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM", "Redis"]
  },
  {
    category: "Tools & Deployment",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Apprenticeship – MERN Full Stack",
    company: "DUCAT India",
    period: "Mar 2026 – Aug 2026",
    location: "Remote",
    highlights: [
      "Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js, building reusable components, REST APIs, responsive interfaces, debugging workflows, and Git-based version control.",
      "Implemented authentication flows, form validations, and state management using React hooks and context API, ensuring secure and maintainable application architecture across multiple project modules."
    ]
  },
  {
    role: "Full Stack Developer Trainee – Python",
    company: "S O Infotech (P) Ltd.",
    period: "Dec 2025 – Jul 2026",
    location: "Noida, India",
    highlights: [
      "Engineered an E-commerce Website using Python Full Stack architecture with Generative AI features, connecting frontend functionality with AI-driven backend services in a cross-functional team environment.",
      "Collaborated with senior developers to design RESTful APIs, integrate third-party payment gateways, and optimize database queries, reducing page load times and improving overall application performance."
    ]
  }
];

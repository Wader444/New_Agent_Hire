export interface Freelancer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  experience: string;
  bio: string;
  location: string;
  availability: "available" | "busy" | "part-time";
  isAiRecommended?: boolean;
  matchPercentage?: number;
}

export const freelancers: Freelancer[] = [
  {
    id: "fl_1",
    name: "Marcus Chen",
    role: "Senior Full-Stack Engineer",
    avatar: "MC",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 95,
    experience: "8 years",
    bio: "Specializes in scalable SaaS architecture and complex React applications. Previously led engineering at two Y Combinator startups.",
    location: "San Francisco, US",
    availability: "available",
    isAiRecommended: true,
    matchPercentage: 92,
  },
  {
    id: "fl_2",
    name: "Priya Patel",
    role: "Senior Product Designer",
    avatar: "PP",
    skills: [
      "Figma",
      "UX Research",
      "Design Systems",
      "Prototyping",
      "Webflow",
    ],
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 85,
    experience: "6 years",
    bio: "Specializes in complex UX/UI systems & SaaS products. Delivered design systems for Fortune 500 companies.",
    location: "London, UK",
    availability: "available",
  },
  {
    id: "fl_3",
    name: "James Okafor",
    role: "Backend Engineer",
    avatar: "JO",
    skills: ["Python", "FastAPI", "Kubernetes", "Redis", "Blockchain"],
    rating: 4.7,
    reviewCount: 82,
    hourlyRate: 80,
    experience: "5 years",
    bio: "Builds high-performance APIs and distributed systems. Expert in Web3 integrations and smart contract development.",
    location: "Lagos, Nigeria",
    availability: "part-time",
  },
  {
    id: "fl_4",
    name: "Sofia Ramirez",
    role: "iOS & Android Developer",
    avatar: "SR",
    skills: [
      "Swift",
      "Kotlin",
      "React Native",
      "Firebase",
      "App Store Optimization",
    ],
    rating: 4.9,
    reviewCount: 151,
    hourlyRate: 90,
    experience: "7 years",
    bio: "Published 15+ apps with combined 2M+ downloads. Expert in performance optimization and App Store launch strategies.",
    location: "Barcelona, Spain",
    availability: "available",
  },
  {
    id: "fl_5",
    name: "Kenji Tanaka",
    role: "DevOps & Cloud Architect",
    avatar: "KT",
    skills: ["AWS", "Terraform", "Docker", "CI/CD", "Security"],
    rating: 4.6,
    reviewCount: 68,
    hourlyRate: 110,
    experience: "9 years",
    bio: "Reduces infrastructure costs by 40% on average. Certified AWS Solutions Architect with enterprise security expertise.",
    location: "Tokyo, Japan",
    availability: "busy",
  },
  {
    id: "fl_6",
    name: "Aisha Thompson",
    role: "AI/ML Engineer",
    avatar: "AT",
    skills: [
      "Python",
      "TensorFlow",
      "LangChain",
      "OpenAI API",
      "Data Pipelines",
    ],
    rating: 4.8,
    reviewCount: 43,
    hourlyRate: 120,
    experience: "4 years",
    bio: "Builds production-grade AI features and LLM integrations. Previously at Anthropic, specializing in RAG architectures.",
    location: "New York, US",
    availability: "available",
  },
];

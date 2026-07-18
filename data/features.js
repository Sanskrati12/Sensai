import {
  BrainCircuit,
  Briefcase,
  LineChart,
  ScrollText,
  FileSearch,
} from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "AI Career Coach",
    description:
      "Get personalized career advice and insights powered by advanced AI.",
    badge: "Popular",
    link: "/dashboard",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "AI Resume Builder",
    description:
      "Generate ATS-optimized resumes with AI assistance.",
    badge: "AI",
    link: "/resume",
  },
  {
    icon: <FileSearch className="w-10 h-10 mb-4 text-primary" />,
    title: "Resume Analyzer",
    description:
      "Upload your resume and receive ATS score, strengths, weaknesses and suggestions.",
    badge: "New",
    link: "/resume-analyzer",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific interview questions.",
    badge: "Hot",
    link: "/interview",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: "Industry Insights",
    description:
      "Stay updated with market trends and salary insights.",
    badge: "Trending",
    link: "/industry-insights",
  },
];
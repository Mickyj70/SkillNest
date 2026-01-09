"use client";

import { useState } from "react";
import {
  Search,
  Code2,
  Terminal,
  Database,
  Smartphone,
  Palette,
  Box,
  Wind,
  Zap,
  Globe,
  Blocks,
  FileCode,
  Layout,
  Cpu,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCard } from "@/components/SkillCard";

// Mock data for UI development
const CATEGORIES = [
  "All",
  "Web Dev",
  "Mobile",
  "Data Science",
  "Design",
  "DevOps",
];

const MOCK_SKILLS = [
  {
    name: "React",
    slug: "react",
    category: "Web Dev",
    icon: <Blocks />,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    slug: "nextjs",
    category: "Web Dev",
    icon: <Zap />,
    color: "#FFFFFF",
  },
  {
    name: "TypeScript",
    slug: "typescript",
    category: "Web Dev",
    icon: <FileCode />,
    color: "#3178C6",
  },
  {
    name: "Node.js",
    slug: "node-js",
    category: "Web Dev",
    icon: <Terminal />,
    color: "#339933",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwind-css",
    category: "Web Dev",
    icon: <Wind />,
    color: "#38B2AC",
  },
  {
    name: "SwiftUI",
    slug: "swiftui",
    category: "Mobile",
    icon: <Smartphone />,
    color: "#F05138",
  },
  {
    name: "Flutter",
    slug: "flutter",
    category: "Mobile",
    icon: <Smartphone />,
    color: "#02569B",
  },
  {
    name: "React Native",
    slug: "react-native",
    category: "Mobile",
    icon: <Smartphone />,
    color: "#61DAFB",
  },
  {
    name: "Python",
    slug: "python",
    category: "Data Science",
    icon: <Code2 />,
    color: "#3776AB",
  },
  {
    name: "TensorFlow",
    slug: "tensorflow",
    category: "Data Science",
    icon: <Cpu />,
    color: "#FF6F00",
  },
  {
    name: "Pandas",
    slug: "pandas",
    category: "Data Science",
    icon: <Database />,
    color: "#150458",
  },
  {
    name: "Figma",
    slug: "figma",
    category: "Design",
    icon: <Palette />,
    color: "#F24E1E",
  },
  {
    name: "UI Design",
    slug: "ui-design",
    category: "Design",
    icon: <Layout />,
    color: "#FF3366",
  },
  {
    name: "Docker",
    slug: "docker",
    category: "DevOps",
    icon: <Box />,
    color: "#2496ED",
  },
  {
    name: "Kubernetes",
    slug: "kubernetes",
    category: "DevOps",
    icon: <Globe />,
    color: "#326CE5",
  },
];

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = MOCK_SKILLS.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Browse <span className="text-primary">Skills</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-secondary">
          Discover curated learning paths for the most in-demand technologies.
        </p>
      </div>

      <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <Tabs
          defaultValue="All"
          className="w-full sm:w-auto"
          onValueChange={setActiveCategory}
        >
          <TabsList className="bg-surface border border-surface">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="px-6">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            placeholder="Search skills..."
            className="bg-surface border-surface pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.slug} {...skill} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xl text-text-secondary">
            No skills found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

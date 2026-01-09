"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/ResourceCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Star, TrendingUp, Filter } from "lucide-react";

// Mock data for UI development
const SKILL_DATA = {
  name: "React",
  slug: "react",
  category: "Web Dev",
  description:
    "A JavaScript library for building user interfaces. React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
  stats: {
    resources: 124,
    contributors: 56,
    avgRating: 4.8,
  },
};

const MOCK_RESOURCES = [
  {
    title: "React Official Documentation",
    description:
      "The official guide and reference for the React library. Learn about component architecture, hooks, and performance optimization.",
    type: "Article" as const,
    level: "Beginner" as const,
    url: "https://react.dev",
    author: "Meta Open Source",
    likes: 542,
  },
  {
    title: "The Ultimate React 18 Course",
    description:
      "Comprehensive course covering everything from basics to advanced patterns like server components and suspense.",
    type: "Course" as const,
    level: "Intermediate" as const,
    url: "https://example.com/course",
    author: "Jonas Schmedtmann",
    likes: 890,
  },
  {
    title: "Build a Modern Landing Page in React",
    description:
      "Follow along as we build a stunning, responsive landing page using React, Tailwind CSS, and Framer Motion.",
    type: "Video" as const,
    level: "Beginner" as const,
    url: "https://youtube.com/watch?v=...",
    author: "JS Mastery",
    likes: 1205,
  },
  {
    title: "React Design Patterns & Best Practices",
    description:
      "Deep dive into clean code, design patterns, and organizational strategies for large React applications.",
    type: "Article" as const,
    level: "Advanced" as const,
    url: "https://example.com/blog",
    author: "Dan Abramov",
    likes: 432,
  },
];

export default function SkillDetailPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Skill Header */}
      <div className="mb-12 rounded-3xl border border-surface bg-linear-to-br from-surface/50 to-background p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 mb-4 px-3 py-1 text-xs uppercase tracking-wider font-bold"
            >
              {SKILL_DATA.category}
            </Badge>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl">
              {SKILL_DATA.name}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              {SKILL_DATA.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-80">
            <div className="rounded-2xl border border-surface bg-background p-4 text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-2 text-primary" />
              <div className="text-lg font-bold">
                {SKILL_DATA.stats.resources}
              </div>
              <div className="text-xs text-text-secondary uppercase">
                Resources
              </div>
            </div>
            <div className="rounded-2xl border border-surface bg-background p-4 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-2 text-accent" />
              <div className="text-lg font-bold">
                {SKILL_DATA.stats.contributors}
              </div>
              <div className="text-xs text-text-secondary uppercase">
                Submitters
              </div>
            </div>
            <div className="rounded-2xl border border-surface bg-background p-4 text-center col-span-2 sm:col-span-1">
              <Star className="h-5 w-5 mx-auto mb-2 text-success" />
              <div className="text-lg font-bold">
                {SKILL_DATA.stats.avgRating}
              </div>
              <div className="text-xs text-text-secondary uppercase">
                Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Tabs
            defaultValue="all"
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-surface border border-surface">
              <TabsTrigger value="all" className="px-6 text-sm">
                All Resources
              </TabsTrigger>
              <TabsTrigger value="Video" className="px-6 text-sm">
                Videos
              </TabsTrigger>
              <TabsTrigger value="Article" className="px-6 text-sm">
                Articles
              </TabsTrigger>
              <TabsTrigger value="Course" className="px-6 text-sm">
                Courses
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <div className="flex h-10 items-center gap-2 rounded-lg border border-surface bg-surface px-4 text-sm font-medium text-text-secondary hover:text-primary transition-colors cursor-pointer">
              <Filter className="h-4 w-4" />
              Filter by Level
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_RESOURCES.filter(
            (r) => activeTab === "all" || r.type === activeTab
          ).map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

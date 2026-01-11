"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/ResourceCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, Star, Filter } from "lucide-react";

interface SkillData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  categories: { name: string } | null;
}

interface Resource {
  title: string;
  description: string | null;
  type: string;
  level: string;
  url: string | null;
  profiles: { full_name: string | null } | null;
  likes: number;
}

interface SkillDetailClientProps {
  skill: SkillData;
  resources: Resource[];
}

export default function SkillDetailClient({
  skill,
  resources,
}: SkillDetailClientProps) {
  const [activeTab, setActiveTab] = useState("all");

  const resourceStats = {
    resources: resources.length,
    contributors: new Set(resources.map((r) => r.profiles?.full_name)).size,
    avgRating: 0, // We'll implement ratings later
  };

  const filteredResources = resources.filter(
    (r) => activeTab === "all" || r.type === activeTab
  );

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
              {skill.categories?.name || "Skill"}
            </Badge>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl">
              {skill.name}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              {skill.description || `Learning resources for ${skill.name}.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-80">
            <div className="rounded-2xl border border-surface bg-background p-4 text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-2 text-primary" />
              <div className="text-lg font-bold">{resourceStats.resources}</div>
              <div className="text-xs text-text-secondary uppercase">
                Resources
              </div>
            </div>
            <div className="rounded-2xl border border-surface bg-background p-4 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-2 text-accent" />
              <div className="text-lg font-bold">
                {resourceStats.contributors}
              </div>
              <div className="text-xs text-text-secondary uppercase">
                Submitters
              </div>
            </div>
            <div className="rounded-2xl border border-surface bg-background p-4 text-center col-span-2 sm:col-span-1">
              <Star className="h-5 w-5 mx-auto mb-2 text-success" />
              <div className="text-lg font-bold">{resourceStats.avgRating}</div>
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

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description || ""}
                type={resource.type as any}
                level={resource.level as any}
                url={resource.url || ""}
                author={resource.profiles?.full_name || "Community Member"}
                likes={resource.likes}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-surface rounded-3xl">
            <p className="text-xl text-text-secondary">
              No resources found for this category.
            </p>
            <p className="text-sm text-text-secondary mt-2">
              Be the first to share one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

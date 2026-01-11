"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCard } from "@/components/SkillCard";

interface Category {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
  slug: string;
  color?: string;
  icon_name?: string;
  categories?: { name: string } | null;
}

interface SkillsBrowseProps {
  categories: Category[];
  initialSkills: Skill[];
}

export default function SkillsBrowse({
  categories,
  initialSkills,
}: SkillsBrowseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = initialSkills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || skill.categories?.name === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryNames = ["All", ...categories.map((c) => c.name)];

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
            {categoryNames.map((cat) => (
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
            <SkillCard
              key={skill.slug}
              name={skill.name}
              slug={skill.slug}
              category={skill.categories?.name || "Other"}
              color={skill.color}
              // We'll need to handle icons later if we want dynamic icons,
              // for now fallback to the one in SkillCard
            />
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

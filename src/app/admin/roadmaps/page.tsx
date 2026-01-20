import { getAdminStats } from "../actions";
import { Button } from "@/components/ui/button";
import { Map, Plus, ArrowRight, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function RoadmapsAdminPage() {
  const supabase = await createClient();

  // Fetch all skills to see which have roadmaps
  const { data: skills } = await supabase
    .from("skills")
    .select(
      `
      id,
      name,
      slug,
      roadmaps (id, title, updated_at)
    `
    )
    .order("name");

  // Group skills into Kanban-style columns
  const emptySkills = skills?.filter(
    (s) => !(s.roadmaps as any[])?.length
  ) ?? [];

  const publishedSkills = skills?.filter(
    (s) => (s.roadmaps as any[])?.length > 0
  ) ?? [];

  // Optional: you could add a draft status later if your DB supports it
  const draftSkills: typeof skills = []; // placeholder — populate if needed

  const Column = ({
    title,
    items,
    badgeVariant = "outline",
    badgeClass = "",
    emptyText = "No items",
  }: {
    title: string;
    items: NonNullable<typeof skills>;
    badgeVariant?: "outline" | "default" | "secondary";
    badgeClass?: string;
    emptyText?: string;
  }) => (
    <div className="flex-shrink-0 w-full min-w-[320px] sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <span className="text-xs text-text-secondary bg-surface/60 px-2.5 py-1 rounded-full">
          {items.length}
        </span>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {items.length === 0 ? (
          <div className="h-28 flex items-center justify-center text-text-secondary text-sm border border-dashed border-surface rounded-xl bg-surface/30">
            {emptyText}
          </div>
        ) : (
          items.map((skill) => {
            const hasRoadmap = (skill.roadmaps as any[])?.length > 0;
            const roadmap = hasRoadmap ? (skill.roadmaps as any[])[0] : null;

            return (
              <div
                key={skill.id}
                className="group rounded-xl border border-surface bg-canvas p-4 hover:border-surface/80 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-surface flex items-center justify-center border border-surface/80 flex-shrink-0">
                      <Map className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-text-primary truncate">
                        {skill.name}
                      </div>
                      {hasRoadmap && roadmap?.title && (
                        <div className="text-xs text-text-secondary mt-0.5 truncate">
                          {roadmap.title}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {hasRoadmap ? (
                      <Badge
                        variant="outline"
                        className="bg-success/10 text-success border-success/20 text-[10px] uppercase font-bold"
                      >
                        Published
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-surface text-text-secondary border-surface text-[10px] uppercase font-bold"
                      >
                        Empty
                      </Badge>
                    )}

                    <div className="text-xs text-text-secondary whitespace-nowrap">
                      {hasRoadmap
                        ? new Date(roadmap.updated_at).toLocaleDateString()
                        : "Never"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-surface/40">
                  <Link href={`/admin/roadmaps/${skill.slug}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 w-full justify-center gap-1.5 text-xs sm:text-sm"
                    >
                      {hasRoadmap ? "Edit Roadmap" : "Create Roadmap"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roadmap Management</h1>
          <p className="text-text-secondary mt-1.5">
            Assign structured learning paths to skills.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Global Roadmaps
        </Button>
      </div>

      {/* Kanban Columns */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          <Column
            title="Empty Roadmaps"
            items={emptySkills}
            badgeClass="bg-surface text-text-secondary border-surface"
            emptyText="All skills have roadmaps"
          />

          <Column
            title="Published Roadmaps"
            items={publishedSkills}
            badgeClass="bg-success/10 text-success border-success/20"
            emptyText="No published roadmaps yet"
          />

          {/* Optional third column — remove if not needed */}
          {/* <Column
            title="Drafts / In Progress"
            items={draftSkills}
            badgeClass="bg-warning/10 text-warning border-warning/20"
            emptyText="No drafts"
          /> */}
        </div>
      </div>
    </div>
  );
}
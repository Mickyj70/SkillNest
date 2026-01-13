import { getAdminStats } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Roadmap Management</h1>
          <p className="text-text-secondary">
            Assign structured learning paths to skills.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Global Roadmaps
        </Button>
      </div>

      <div className="rounded-2xl border border-surface bg-canvas overflow-hidden">
        <Table>
          <TableHeader className="bg-surface/50">
            <TableRow className="border-surface hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Skill
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Status
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Last Updated
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills?.map((skill) => {
              const hasRoadmap = (skill.roadmaps as any[])?.length > 0;
              const roadmap = hasRoadmap ? (skill.roadmaps as any[])[0] : null;

              return (
                <TableRow
                  key={skill.id}
                  className="border-surface hover:bg-surface/20 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center border border-surface">
                        <Map className="h-4 w-4 text-primary" />
                      </div>
                      <div className="font-bold">{skill.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">
                    {hasRoadmap
                      ? new Date(roadmap.updated_at).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/roadmaps/${skill.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        {hasRoadmap ? "Edit Roadmap" : "Create Roadmap"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

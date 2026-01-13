import { approveSkill, getAdminStats } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Check, Trash2, Folder, Tag, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";

export default async function SkillsAdminPage() {
  const supabase = await createClient();

  // Fetch pending skills
  const { data: pendingSkills } = await supabase
    .from("skills")
    .select("*, categories(name)")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Skills & Categories</h1>
          <p className="text-text-secondary">
            Manage the platform taxonomy and approve suggestions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-surface">
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Skill
          </Button>
        </div>
      </div>

      {/* Pending Approval Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Tag className="h-5 w-5 text-accent" />
          Pending Approvals
        </h3>
        {pendingSkills && pendingSkills.length > 0 ? (
          <div className="rounded-2xl border border-accent/20 bg-accent/5 overflow-hidden">
            <Table>
              <TableHeader className="bg-accent/10">
                <TableRow className="border-accent/10 hover:bg-transparent">
                  <TableHead className="text-xs uppercase tracking-wider font-bold text-accent">
                    Skill Name
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-bold text-accent">
                    Category
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-bold text-accent">
                    Date Suggested
                  </TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider font-bold text-accent">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingSkills.map((skill) => (
                  <TableRow
                    key={skill.id}
                    className="border-accent/10 hover:bg-accent/10 transition-colors"
                  >
                    <TableCell className="font-bold">{skill.name}</TableCell>
                    <TableCell>
                      {(skill.categories as any)?.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(skill.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <form
                          action={async () => {
                            "use server";
                            await approveSkill(skill.id);
                          }}
                        >
                          <Button
                            size="sm"
                            className="bg-success hover:bg-success/90 text-white"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </form>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-8 border border-dashed border-surface rounded-xl text-center text-text-secondary">
            No pending skill suggestions.
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Folder className="h-5 w-5 text-primary" />
          Active Categories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl border border-surface bg-canvas flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center border border-surface group-hover:border-primary/50 transition-colors">
                  <div className="text-xl">{cat.icon || "📁"}</div>
                </div>
                <div>
                  <div className="font-bold">{cat.name}</div>
                  <div className="text-xs text-text-secondary">{cat.slug}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-text-secondary hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

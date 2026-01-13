import { getFullRoadmap, createRoadmap, addRoadmapStep } from "../../actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Map,
  Plus,
  Save,
  Trash2,
  ChevronUp,
  ChevronDown,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RoadmapDetailBuilder({ params }: Props) {
  const { slug } = await params;
  const data = await getFullRoadmap(slug);

  if (!data) notFound();

  const { skill, roadmap } = data;

  async function handleCreateRoadmap(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    await createRoadmap(skill.id, title, description);
  }

  async function handleAddStep(formData: FormData) {
    "use server";
    if (!roadmap) return;
    const title = formData.get("title") as string;
    const orderIndex = roadmap.roadmap_steps.length;
    await addRoadmapStep(roadmap.id, title, orderIndex);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/roadmaps">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Roadmap Builder: {skill.name}</h1>
          <p className="text-text-secondary">
            Construct the learning path for this skill.
          </p>
        </div>
      </div>

      {!roadmap ? (
        <div className="rounded-2xl border border-dashed border-surface p-12 bg-surface/10 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Map className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold italic">No Roadmap Found</h3>
            <p className="text-text-secondary max-w-sm mx-auto">
              This skill doesn't have a roadmap yet. Initialize one to start
              adding learning steps.
            </p>
          </div>
          <form
            action={handleCreateRoadmap}
            className="max-w-md mx-auto space-y-4 text-left"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Roadmap Title</label>
              <Input
                name="title"
                placeholder="e.g., The Ultimate React Path"
                defaultValue={`Mastering ${skill.name}`}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                placeholder="Briefly describe what this roadmap covers..."
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Initialize Roadmap
            </Button>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Roadmap Info */}
          <div className="rounded-2xl border border-surface bg-surface/30 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">{roadmap.title}</div>
              <Button variant="outline" size="sm" className="border-surface">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
            <p className="text-sm text-text-secondary">
              {roadmap.description || "No description provided."}
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Learning Steps
            </h3>

            {roadmap.roadmap_steps.length === 0 ? (
              <div className="p-8 border border-dashed border-surface rounded-xl text-center text-text-secondary">
                No steps added yet. Add your first module below.
              </div>
            ) : (
              roadmap.roadmap_steps
                .sort((a: any, b: any) => a.order_index - b.order_index)
                .map((step: any, idx: number) => (
                  <div
                    key={step.id}
                    className="group rounded-xl border border-surface bg-canvas hover:border-primary/50 transition-all"
                  >
                    <div className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-surface-foreground/5 flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div className="font-bold">{step.title}</div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Step Items (Resources) */}
                    <div className="px-12 pb-4 space-y-2">
                      {step.roadmap_items?.length > 0 ? (
                        step.roadmap_items.map((item: any) => (
                          <div
                            key={item.id}
                            className="text-sm flex items-center justify-between p-2 rounded-lg bg-surface/20 border border-surface/50"
                          >
                            <span>{item.title || "Linked Resource"}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-text-secondary italic">
                          No resources linked to this step.
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[10px] uppercase font-bold text-primary hover:bg-primary/5"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Link Resource
                      </Button>
                    </div>
                  </div>
                ))
            )}

            <div className="mt-6 p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5">
              <form action={handleAddStep} className="flex gap-4">
                <Input
                  name="title"
                  placeholder="New Step Title (e.g., Intro to Components)"
                  className="bg-canvas border-surface h-10"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 bg-primary hover:bg-primary/90 text-white px-6"
                >
                  Add Step
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

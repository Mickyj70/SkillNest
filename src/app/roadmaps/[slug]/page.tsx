import {
  getPublicRoadmap,
  getPublishedRoadmapForSkill,
} from "../../admin/actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Map,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublicRoadmapPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPublicRoadmap(slug);

  if (!data || !data.roadmap) {
    notFound();
  }

  const { skill, roadmap } = data;
  const steps = roadmap.roadmap_steps
    ?.sort((a: any, b: any) => a.order_index - b.order_index)
    || [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <Link
            href={`/skills/${skill.slug}`}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to {skill.name}</span>
          </Link>

          <div className="rounded-3xl border border-surface bg-gradient-to-br from-surface/50 to-background p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Map className="h-6 w-6 text-primary" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success border-success/20 px-3 py-1 text-xs uppercase tracking-wider font-bold"
                  >
                    Learning Roadmap
                  </Badge>
                </div>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  {roadmap.title}
                </h1>
                {roadmap.description && (
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {roadmap.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4 lg:w-64">
                <div className="rounded-2xl border border-surface bg-background p-5 text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold">{steps.length}</div>
                  <div className="text-xs text-text-secondary uppercase tracking-wide">
                    Learning Steps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-primary" />
            </span>
            Your Learning Path
          </h2>

          {steps.length === 0 ? (
            <div className="p-12 border border-dashed border-surface rounded-3xl text-center">
              <p className="text-text-secondary text-lg">
                No learning steps have been added yet.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-surface" />

              <div className="space-y-6">
                {steps.map((step: any, idx: number) => (
                  <div key={step.id} className="relative flex gap-6">
                    {/* Timeline Node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Step Card */}
                    <div className="flex-1 rounded-2xl border border-surface bg-canvas hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                          {step.description && (
                            <Clock className="h-5 w-5 text-text-secondary flex-shrink-0" />
                          )}
                        </div>

                        {step.description && (
                          <p className="text-text-secondary mb-4 leading-relaxed">
                            {step.description}
                          </p>
                        )}

                        {/* Resources for this step */}
                        {step.roadmap_items && step.roadmap_items.length > 0 && (
                          <div className="space-y-3 mt-4 pt-4 border-t border-surface/50">
                            <div className="text-xs font-bold uppercase text-text-secondary tracking-wide">
                              Resources
                            </div>
                            {step.roadmap_items.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-surface/30 border border-surface/50 hover:border-primary/30 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <BookOpen className="h-4 w-4 text-primary" />
                                  <span className="font-medium text-sm">
                                    {item.title || "Resource"}
                                  </span>
                                </div>
                                {item.url && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Completion Node */}
                <div className="relative flex gap-6">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg shadow-success/20">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl border border-success/30 bg-success/5 p-6">
                    <h3 className="text-xl font-bold text-success">
                      🎉 Congratulations!
                    </h3>
                    <p className="text-text-secondary mt-2">
                      You've completed the roadmap for {skill.name}. Keep
                      practicing and building projects!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

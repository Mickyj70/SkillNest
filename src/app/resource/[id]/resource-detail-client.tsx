/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  ThumbsUp,
  Bookmark,
  MessageSquare,
  Share2,
  Calendar,
  User,
  Flag,
  ChevronLeft,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface ResourceDetailProps {
  resource: any; // Using any for brevity in this complex join, ideally typed
}

export default function ResourceDetailClient({
  resource,
}: ResourceDetailProps) {
  const publishedDate = new Date(resource.created_at).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href={`/skills/${resource.skills?.slug}`}
        className="mb-8 flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {resource.skills?.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {resource.type}
              </Badge>
              <Badge variant="outline" className="border-surface">
                {resource.level}
              </Badge>
              {resource.duration && (
                <Badge variant="ghost" className="text-text-secondary gap-1">
                  <Clock className="h-3 w-3" /> {resource.duration}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight">
              {resource.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {resource.profiles?.full_name || "Community Member"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {publishedDate}
              </div>
            </div>
          </div>

          {resource.thumbnail_url && (
            <div className="aspect-video w-full overflow-hidden rounded-3xl border border-surface shadow-2xl">
              <img
                src={resource.thumbnail_url}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Card className="border-surface bg-surface/20">
            <CardContent className="p-8 prose prose-invert max-w-none">
              <div className="text-lg text-text-secondary leading-relaxed whitespace-pre-wrap mb-8 italic">
                {resource.description}
              </div>

              {resource.learning_points?.length > 0 && (
                <div className="mb-10 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> What you'll learn
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                    {resource.learning_points.map(
                      (point: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {point}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <Separator className="bg-surface my-8" />

              <div className="markdown-content">
                <ReactMarkdown>{resource.content}</ReactMarkdown>
              </div>

              <div className="mt-12">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark font-bold text-lg px-8 py-6 rounded-2xl shadow-lg shadow-primary/20"
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Go to Resource <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Social Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              className="border-surface hover:bg-surface gap-2 rounded-xl"
            >
              <ThumbsUp className="h-4 w-4" />
              {resource.likes?.[0]?.count || 0} Likes
            </Button>
            <Button
              variant="outline"
              className="border-surface hover:bg-surface gap-2 rounded-xl"
            >
              <Bookmark className="h-4 w-4" />
              {resource.bookmarks?.[0]?.count || 0} Save
            </Button>
            <Button
              variant="outline"
              className="border-surface hover:bg-surface gap-2 rounded-xl"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="ghost"
              className="text-destructive hover:bg-destructive/10 ml-auto gap-2"
            >
              <Flag className="h-4 w-4" />
              Report
            </Button>
          </div>

          <Separator className="bg-surface" />

          {/* Comments Section */}
          <div className="space-y-6 pb-20">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Comments ({resource.comments?.length || 0})
            </h3>

            <div className="space-y-4">
              {resource.comments?.map((comment: any) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl border border-surface bg-surface/10 space-y-2"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <div className="font-bold">
                      {comment.profiles?.full_name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {comment.content}
                  </p>
                </div>
              ))}

              {(!resource.comments || resource.comments.length === 0) && (
                <div className="rounded-xl border border-dashed border-surface p-12 text-center text-text-secondary">
                  Be the first to share your thoughts on this resource.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-surface bg-surface/40 rounded-2xl overflow-hidden">
            <CardHeader className="bg-surface/20">
              <CardTitle className="text-lg">About the Submitter</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                {resource.profiles?.avatar_url ? (
                  <img
                    src={resource.profiles.avatar_url}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {resource.profiles?.full_name?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <div className="font-bold">
                    {resource.profiles?.full_name || "Anonymous User"}
                  </div>
                  <div className="text-xs text-text-secondary">Contributor</div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {resource.profiles?.bio ||
                  "A passionate learner and contributor at SkillNest."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-surface bg-surface/40 rounded-2xl overflow-hidden">
            <CardHeader className="bg-surface/20">
              <CardTitle className="text-lg">
                More from {resource.skills?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-center">
              <p className="text-xs text-text-secondary">
                Explore deeper into the roadmap of {resource.skills?.name}.
              </p>
              <Link href={`/skills/${resource.skills?.slug}`}>
                <Button
                  variant="outline"
                  className="w-full border-primary/20 text-primary"
                >
                  View {resource.skills?.name} Roadmap
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

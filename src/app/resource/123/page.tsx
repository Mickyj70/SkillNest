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
} from "lucide-react";
import Link from "next/link";

// Mock data
const RESOURCE_DATA = {
  title: "The Ultimate Guide to React Server Components",
  description: `React Server Components (RSC) are a new type of component that render on the server and are streamed to the client. Unlike traditional SSR, RSCs don't require hydration on the client, which significantly reduces the bundle size and improves performance.
  
  In this guide, we will explore:
  - What are Server Components?
  - The difference between Server and Client Components.
  - How to use the 'use client' and 'use server' directives.
  - Data fetching patterns with RSC.
  - Performance benefits and trade-offs.`,
  type: "Article",
  level: "Advanced",
  url: "https://example.com/rsc-guide",
  author: "Dan Abramov",
  publishedDate: "January 15, 2024",
  stats: {
    likes: 1240,
    bookmarks: 450,
    comments: 89,
  },
  skill: {
    name: "React",
    slug: "react",
  },
};

export default function ResourceDetailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href={`/skills/${RESOURCE_DATA.skill.slug}`}
        className="mb-8 flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {RESOURCE_DATA.skill.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {RESOURCE_DATA.type}
              </Badge>
              <Badge variant="outline" className="border-surface">
                {RESOURCE_DATA.level}
              </Badge>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight">
              {RESOURCE_DATA.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {RESOURCE_DATA.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {RESOURCE_DATA.publishedDate}
              </div>
            </div>
          </div>

          <Card className="border-surface bg-surface/20">
            <CardContent className="p-8 prose prose-invert max-w-none">
              <p className="text-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
                {RESOURCE_DATA.description}
              </p>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark"
                >
                  <a
                    href={RESOURCE_DATA.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Go to Resource <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Social Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              className="border-surface hover:bg-surface gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              {RESOURCE_DATA.stats.likes} Likes
            </Button>
            <Button
              variant="outline"
              className="border-surface hover:bg-surface gap-2"
            >
              <Bookmark className="h-4 w-4" />
              {RESOURCE_DATA.stats.bookmarks} Save
            </Button>
            <Button
              variant="outline"
              className="border-surface hover:bg-surface gap-2"
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

          {/* Comments Section (Placeholder) */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Comments ({RESOURCE_DATA.stats.comments})
            </h3>
            <div className="rounded-xl border border-dashed border-surface p-12 text-center text-text-secondary">
              Sign in to join the discussion and share your thoughts.
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-surface bg-surface/40">
            <CardHeader>
              <CardTitle className="text-lg">About the Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  DA
                </div>
                <div>
                  <div className="font-bold">{RESOURCE_DATA.author}</div>
                  <div className="text-xs text-text-secondary">
                    Official Meta Contributor
                  </div>
                </div>
              </div>
              <p className="text-text-secondary">
                Expert in React development and core library architecture.
              </p>
            </CardContent>
          </Card>

          <Card className="border-surface bg-surface/40">
            <CardHeader>
              <CardTitle className="text-lg">Related Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                    Understanding React Hooks Deeply
                  </h4>
                  <div className="mt-1 text-xs text-text-secondary flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] h-4 px-1 border-surface"
                    >
                      Article
                    </Badge>
                    <span>•</span>
                    <span>12k views</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { createPost, getUrlMetadata } from "../actions";
import { Rocket, Sparkles, Loader2, Info, Plus } from "lucide-react";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
}

interface CreatePostFormProps {
  categories: Category[];
  initialSkills: Skill[];
}

export default function CreatePostForm({
  categories,
  initialSkills,
}: CreatePostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [isNewSkill, setIsNewSkill] = useState(false);
  const router = useRouter();

  // Form State for auto-fill
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleUrlBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (!url || !url.startsWith("http") || (title && description)) return;

    setIsFetchingMetadata(true);
    try {
      const meta = await getUrlMetadata(url);
      if (meta) {
        if (!title) setTitle(meta.title);
        if (!description) setDescription(meta.description);
        if (meta.image) setThumbnailUrl(meta.image);
        toast.success("Info auto-filled from URL!", {
          icon: <Sparkles className="h-4 w-4 text-primary" />,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingMetadata(false);
    }
  };

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (isNewSkill) {
        formData.append("isNewSkill", "true");
      }

      // Ensure we append the controlled states if they were auto-filled or edited
      formData.set("title", title);
      formData.set("description", description);
      formData.set("thumbnail_url", thumbnailUrl);

      const result = await createPost(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Post created successfully!");
      }
    });
  }

  return (
    <Card className="border-surface bg-background shadow-xl">
      <CardHeader className="border-b border-surface/50 bg-surface/10">
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          Post Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form action={handleSubmit} className="space-y-8">
          {/* URL Section with Auto-fill Trigger */}
          <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-primary font-bold">
                Resource URL
              </Label>
              <div className="relative">
                <Input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://..."
                  required
                  onBlur={handleUrlBlur}
                  className="bg-background border-primary/20 pl-4 h-12"
                />
                {isFetchingMetadata && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-text-secondary flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3 text-primary" />
                Pro-tip: Paste a link and we&apos;ll try to auto-fill the title
                and description.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Understanding React Server Components"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-surface border-surface h-12 text-lg font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select name="type" required>
                <SelectTrigger className="bg-surface border-surface h-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Course">Course</SelectItem>
                  <SelectItem value="Book">Book</SelectItem>
                  <SelectItem value="Tool">Tool</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select name="level" required defaultValue="Beginner">
                <SelectTrigger className="bg-surface border-surface h-10">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (e.g., 15 mins)</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="10 mins"
                className="bg-surface border-surface h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="skillId">Target Skill</Label>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary"
                onClick={() => setIsNewSkill(!isNewSkill)}
              >
                {isNewSkill ? "Select existing skill" : "+ Suggest new skill"}
              </Button>
            </div>

            {!isNewSkill ? (
              <Select name="skillId" required={!isNewSkill}>
                <SelectTrigger className="bg-surface border-surface h-12">
                  <SelectValue placeholder="Search skills..." />
                </SelectTrigger>
                <SelectContent>
                  {initialSkills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-4 rounded-xl bg-surface/30 p-4 border border-surface/50 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label htmlFor="newSkillName" className="text-xs">
                    New Skill Name
                  </Label>
                  <Input
                    id="newSkillName"
                    name="newSkillName"
                    placeholder="e.g., Svelte v5"
                    required={isNewSkill}
                    className="bg-background border-surface"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryId" className="text-xs">
                    Category
                  </Label>
                  <Select name="categoryId" required={isNewSkill}>
                    <SelectTrigger className="bg-background border-surface">
                      <SelectValue placeholder="Select category for this skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-[10px] text-text-secondary flex items-center gap-1">
                  <Info className="h-3 w-3" /> New skills will be verified by
                  moderators.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Headline</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Briefly describe what makes this resource great..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-surface border-surface min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Summary & Key Highlights (Markdown supported)
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="## What you'll learn... \n- How to use RSC\n- Patterns for fetching data"
              className="bg-surface border-surface min-h-[200px] font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learning_points">
              Learning Tags (comma separated)
            </Label>
            <Input
              id="learning_points"
              name="learning_points"
              placeholder="React, Hooks, Web Performance"
              className="bg-surface border-surface"
            />
          </div>

          {thumbnailUrl && (
            <div className="space-y-2">
              <Label>Thumbnail Preview</Label>
              <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-surface">
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
                <button
                  type="button"
                  onClick={() => setThumbnailUrl("")}
                  className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-black/80"
                >
                  <Plus className="h-4 w-4 rotate-45" />
                </button>
              </div>
              <input type="hidden" name="thumbnail_url" value={thumbnailUrl} />
            </div>
          )}

          <div className="flex justify-end gap-4 pt-8 border-t border-surface/50">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary-dark px-8 h-12 text-white font-bold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Resource"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

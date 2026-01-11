"use client";

import { useState, useTransition } from "react";
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
import { createPost } from "../actions";
import { Rocket, Plus } from "lucide-react";

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
  const [isNewSkill, setIsNewSkill] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (isNewSkill) {
        formData.append("isNewSkill", "true");
      }

      const result = await createPost(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Post created successfully!");
      }
    });
  }

  return (
    <Card className="border-surface bg-background">
      <CardHeader>
        <CardTitle>Post Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Understanding React Server Components"
              required
              className="bg-surface border-surface"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://..."
                required
                className="bg-surface border-surface"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" required>
                <SelectTrigger className="bg-surface border-surface">
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
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="skillId">Skill</Label>
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
                <SelectTrigger className="bg-surface border-surface">
                  <SelectValue placeholder="Select a related skill" />
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
              <div className="space-y-4 rounded-lg bg-surface/30 p-4 border border-surface/50">
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
                <p className="text-xs text-text-secondary flex items-center gap-1">
                  <Rocket className="h-3 w-3" /> New skills require admin
                  approval but you can post immediately.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Briefly describe this resource..."
              className="bg-surface border-surface min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary-dark"
            >
              {isPending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

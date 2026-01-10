"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { updateProfile } from "./actions";
import { Profile } from "@/types";

interface ProfileFormProps {
  profile: Profile | null;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl border-surface bg-background">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Profile Management
          </CardTitle>
          <CardDescription>
            Manage your public profile and account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-surface">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="bg-primary text-white text-xl">
                {profile?.full_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                defaultValue={profile?.avatar_url || ""}
                placeholder="https://example.com/avatar.jpg"
                className="bg-surface border-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={profile?.full_name || ""}
                placeholder="John Doe"
                className="bg-surface border-surface"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={profile?.username || ""}
                placeholder="johndoe"
                className="bg-surface border-surface"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">About You</Label>
            <Input
              id="bio"
              name="bio"
              defaultValue={profile?.bio || ""}
              placeholder="Tell us about yourself..."
              className="bg-surface border-surface"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-surface pt-6">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-dark"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

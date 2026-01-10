"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const fullName = formData.get("fullName") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      username,
      bio,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) throw error;

  revalidatePath("/profile");
  return { success: true };
}

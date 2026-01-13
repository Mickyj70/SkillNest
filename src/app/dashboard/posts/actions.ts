"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import ogs from "open-graph-scraper-lite";

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const level = formData.get("level") as string;
  const duration = formData.get("duration") as string;
  const thumbnail_url = formData.get("thumbnail_url") as string;
  const content = formData.get("content") as string;
  const learning_points_raw = formData.get("learning_points") as string;
  let learning_points: string[] = [];

  try {
    learning_points = learning_points_raw
      ? JSON.parse(learning_points_raw)
      : [];
  } catch (e) {
    learning_points = learning_points_raw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
  }

  let skillId = formData.get("skillId") as string;

  // Handle new skill suggestion
  const isNewSkill = formData.get("isNewSkill") === "true";
  const newSkillName = formData.get("newSkillName") as string;
  const categoryId = formData.get("categoryId") as string;

  if (isNewSkill && newSkillName && categoryId) {
    // Create slug from name
    const slug = newSkillName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const { data: newSkill, error: skillError } = await supabase
      .from("skills")
      .insert({
        name: newSkillName,
        slug: slug,
        category_id: categoryId,
        status: "pending", // Admin approval queue
      })
      .select()
      .single();

    if (skillError) {
      return { error: "Failed to suggest skill: " + skillError.message };
    }

    skillId = newSkill.id;
  }

  const { error } = await supabase.from("resources").insert({
    user_id: user.id,
    skill_id: skillId,
    title,
    url,
    type,
    description,
    level,
    duration,
    thumbnail_url,
    content,
    learning_points,
    status: "published", // Auto-approved per requirements
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function getUrlMetadata(url: string) {
  if (!url || !url.startsWith("http")) return null;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const html = await response.text();
    const { result } = await ogs({ html });

    return {
      title: result.ogTitle || result.twitterTitle || "",
      description: result.ogDescription || result.twitterDescription || "",
      image: Array.isArray(result.ogImage)
        ? result.ogImage[0]?.url
        : (result.ogImage as any)?.url || "",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return data || [];
}

export async function getSkills() {
  const supabase = await createClient();
  // Only approved skills are selectable, or maybe specific ones
  const { data } = await supabase
    .from("skills")
    .select("*")
    .eq("status", "approved")
    .order("name");
  return data || [];
}

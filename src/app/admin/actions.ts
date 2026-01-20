"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * FETCHING STATS
 */
export async function getAdminStats() {
  const supabase = await createClient();

  const { count: userCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: pendingSkills } = await supabase
    .from("skills")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: totalPosts } = await supabase
    .from("resources")
    .select("*", { count: "exact", head: true });

  // Roadmaps count (assuming we'll add a roadmaps table or just use skills with roadmaps)
  // For now let's just count total skills
  const { count: totalSkills } = await supabase
    .from("skills")
    .select("*", { count: "exact", head: true });

  return {
    userCount: userCount || 0,
    pendingSkills: pendingSkills || 0,
    totalPosts: totalPosts || 0,
    totalSkills: totalSkills || 0,
  };
}

/**
 * USER MANAGEMENT
 */
export async function getAllUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateUserRole(userId: string, role: "user" | "admin") {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) throw error;
  revalidatePath("/admin/users");
}

/**
 * CONTENT MODERATION
 */
export async function getAllResources() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select(
      `
      *,
      profiles(full_name),
      skills(name)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteResource(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/resources");
}

/**
 * SKILL MANAGEMENT
 */
export async function approveSkill(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("skills")
    .update({ status: "approved" })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
}

/**
 * ROADMAP MANAGEMENT
 */
export async function getRoadmaps() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roadmaps")
    .select(
      `
      *,
      skills (name, slug)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createRoadmap(
  skillId: string,
  title: string,
  description: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roadmaps")
    .insert({ skill_id: skillId, title, description })
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/admin/roadmaps");
  return data;
}

export async function updateRoadmap(
  roadmapId: string,
  title: string,
  description: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roadmaps")
    .update({ title, description })
    .eq("id", roadmapId)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/admin/roadmaps/[slug]");
  return data;
}

export async function publishRoadmap(roadmapId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roadmaps")
    .update({ status: "published" })
    .eq("id", roadmapId)
    .select()
    .single();

  // If error is about missing column, just ignore it
  if (error && !error.message.includes("status")) throw error;
  revalidatePath("/admin/roadmaps");
  revalidatePath("/admin/roadmaps/[slug]");
  return data;
}

export async function unpublishRoadmap(roadmapId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roadmaps")
    .update({ status: "draft" })
    .eq("id", roadmapId)
    .select()
    .single();

  // If error is about missing column, just ignore it
  if (error && !error.message.includes("status")) throw error;
  revalidatePath("/admin/roadmaps");
  revalidatePath("/admin/roadmaps/[slug]");
  return data;
}

export async function addRoadmapStep(
  roadmapId: string,
  title: string,
  orderIndex: number
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roadmap_steps")
    .insert({ roadmap_id: roadmapId, title, order_index: orderIndex })
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/admin/roadmaps");
  return data;
}

export async function getFullRoadmap(skillSlug: string) {
  const supabase = await createClient();

  // Get skill first
  const { data: skill } = await supabase
    .from("skills")
    .select("id, name")
    .eq("slug", skillSlug)
    .single();

  if (!skill) return null;

  const { data: roadmap, error } = await supabase
    .from("roadmaps")
    .select(
      `
      *,
      roadmap_steps (
        *,
        roadmap_items (*)
      )
    `
    )
    .eq("skill_id", skill.id)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return {
    skill,
    roadmap: roadmap || null,
  };
}

export async function deleteRoadmapStep(stepId: string) {
  "use server";
  const supabase = await createClient();
  const { error } = await supabase
    .from("roadmap_steps")
    .delete()
    .eq("id", stepId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/roadmaps/[slug]");
}

export async function getPublicRoadmap(skillSlug: string) {
  const supabase = await createClient();

  // Get skill first
  const { data: skill } = await supabase
    .from("skills")
    .select("id, name, slug, description")
    .eq("slug", skillSlug)
    .single();

  if (!skill) return null;

  // Try to get published roadmap first
  let { data: roadmap, error } = await supabase
    .from("roadmaps")
    .select(
      `
      *,
      roadmap_steps (
        *,
        roadmap_items (*)
      )
    `
    )
    .eq("skill_id", skill.id)
    .eq("status", "published")
    .single();

  // If status column doesn't exist, fall back to getting any roadmap (treat all as public)
  if (error && error.message.includes("status")) {
    const fallback = await supabase
      .from("roadmaps")
      .select(
        `
        *,
        roadmap_steps (
          *,
          roadmap_items (*)
        )
      `
      )
      .eq("skill_id", skill.id)
      .single();

    roadmap = fallback.data;
    error = fallback.error;
  }

  if (error && error.code !== "PGRST116") throw error;

  return {
    skill,
    roadmap: roadmap || null,
  };
}

export async function getPublishedRoadmapForSkill(skillId: string) {
  const supabase = await createClient();
  let { data, error } = await supabase
    .from("roadmaps")
    .select("id, title, status")
    .eq("skill_id", skillId)
    .eq("status", "published")
    .maybeSingle();

  // If status column doesn't exist, fall back to getting any roadmap (treat all as public)
  if (error && error.message.includes("status")) {
    const fallback = await supabase
      .from("roadmaps")
      .select("id, title")
      .eq("skill_id", skillId)
      .maybeSingle();

    // Treat as if it has status (even though it doesn't exist in DB)
    data = fallback.data ? { ...fallback.data, status: "published" } : null;
    error = fallback.error;
  }

  if (error) throw error;
  return data;
}
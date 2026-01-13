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

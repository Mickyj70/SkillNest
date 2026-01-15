"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data;
}

export async function getSkills(categoryName: string = "All") {
  const supabase = await createClient();
  let query = supabase
    .from("skills")
    .select(
      `
      *,
      categories (
        name
      )
    `
    )
    .eq("status", "approved");

  if (categoryName !== "All") {
    query = query.eq("categories.name", categoryName);
  }

  const { data, error } = await query.order("name");

  if (error) {
    console.error("Error fetching skills:", error);
    return [];
  }

  // Filter out null categories if using join filtering or just return
  return data.filter(
    (skill) => categoryName === "All" || skill.categories?.name === categoryName
  );
}

export async function getSkillBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select(
      `
      *,
      categories (
        name
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching skill by slug:", error);
    return null;
  }
  return data;
}

export async function getResourcesBySkillId(skillId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select(
      `
      *,
      profiles (
        full_name
      )
    `
    )
    .eq("skill_id", skillId)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
  return data;
}

export async function getResource(id: string) {
  const supabase = await createClient();

  // Increment view count
  await supabase.rpc("increment_resource_views", { resource_id: id });

  const { data, error } = await supabase
    .from("resources")
    .select(
      `
      *,
      skills (
        name,
        slug,
        categories (
          name
        )
      ),
      profiles (
        full_name,
        avatar_url,
        bio
      ),
      likes_stats:likes(count),
      bookmarks_stats:bookmarks(count),
      comments (
        id,
        content,
        created_at,
        profiles (
          full_name,
          avatar_url
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching resource:", error);
    return null;
  }
  return data;
}

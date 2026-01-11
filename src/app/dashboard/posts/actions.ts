"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    status: "published", // Auto-approved per requirements
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*");
  return data || [];
}

export async function getSkills() {
  const supabase = await createClient();
  // Only approved skills are selectable, or maybe specific ones
  const { data } = await supabase
    .from("skills")
    .select("*")
    .eq("status", "approved");
  return data || [];
}

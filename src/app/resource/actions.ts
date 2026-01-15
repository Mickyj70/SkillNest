"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(resource_id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Please sign in to like resources." };
  }

  // Check if already liked
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("resource_id", resource_id)
    .eq("user_id", user.id)
    .single();

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", existingLike.id);
    if (error) return { error: error.message };
  } else {
    // Like
    const { error } = await supabase
      .from("likes")
      .insert({ resource_id, user_id: user.id });
    if (error) return { error: error.message };
  }

  revalidatePath(`/resource/${resource_id}`);
  return { success: true };
}

export async function toggleBookmark(resource_id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Please sign in to save resources." };
  }

  // Check if already bookmarked
  const { data: existingBookmark } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("resource_id", resource_id)
    .eq("user_id", user.id)
    .single();

  if (existingBookmark) {
    // Unbookmark
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", existingBookmark.id);
    if (error) return { error: error.message };
  } else {
    // Bookmark
    const { error } = await supabase
      .from("bookmarks")
      .insert({ resource_id, user_id: user.id });
    if (error) return { error: error.message };
  }

  revalidatePath(`/resource/${resource_id}`);
  return { success: true };
}

export async function addComment(resource_id: string, content: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Please sign in to comment." };
  }

  const { error } = await supabase
    .from("comments")
    .insert({ resource_id, user_id: user.id, content });

  if (error) return { error: error.message };

  revalidatePath(`/resource/${resource_id}`);
  return { success: true };
}

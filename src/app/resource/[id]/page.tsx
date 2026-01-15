import { getResource } from "@/app/skills/actions";
import ResourceDetailClient from "./resource-detail-client";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ResourcePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const resource = await getResource(id);

  if (!resource) {
    notFound();
  }

  // Check initial state if user is logged in
  let initialLiked = false;
  let initialBookmarked = false;

  if (user) {
    const [{ data: like }, { data: bookmark }] = await Promise.all([
      supabase
        .from("likes")
        .select("id")
        .eq("resource_id", id)
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("bookmarks")
        .select("id")
        .eq("resource_id", id)
        .eq("user_id", user.id)
        .single(),
    ]);

    initialLiked = !!like;
    initialBookmarked = !!bookmark;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ResourceDetailClient
        resource={resource}
        userId={user?.id}
        initialLiked={initialLiked}
        initialBookmarked={initialBookmarked}
      />
    </main>
  );
}

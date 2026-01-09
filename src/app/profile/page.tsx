import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfileForm from "./profile-form";
import { getProfile } from "./actions";

export default async function ProfilePage() {
  /* Production Auth (Disabled for UI Dev)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile();
  */

  // Mock Profile for UI Development
  const profile = {
    id: "mock-id",
    full_name: "Demo User",
    username: "demouser",
    avatar_url: "",
    bio: "Just building the UI for now!",
    role: "admin",
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
      <ProfileForm profile={profile} />
    </div>
  );
}

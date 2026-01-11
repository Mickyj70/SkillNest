import ProfileForm from "@/app/profile/profile-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-text-secondary mt-2">
          Manage your profile and account preferences.
        </p>
      </div>
      <div className="max-w-2xl">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}

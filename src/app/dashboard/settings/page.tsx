import ProfileForm from "@/app/profile/profile-form";

export default function SettingsPage() {
  // Mock Profile for UI Development (Same as ProfilePage)
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

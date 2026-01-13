import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Map,
  Settings,
  Sparkles,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-surface bg-surface/30 p-6">
        <div className="mb-8 p-4">
          <h2 className="text-lg font-bold text-primary">Admin Control</h2>
        </div>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all"
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all"
          >
            <Users className="h-4 w-4" />
            Handle User Data
          </Link>
          <Link
            href="/admin/resources"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all"
          >
            <FileText className="h-4 w-4" />
            Supervise Posts
          </Link>
          <Link
            href="/admin/roadmaps"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all"
          >
            <Map className="h-4 w-4" />
            Populate Roadmap
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Manage Skills
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

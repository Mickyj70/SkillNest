import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Settings,
  User,
  Bookmark,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* Dashboard Sidebar */}
      <aside className="w-64 border-r border-surface bg-surface/30 p-6 hidden md:block">
        <div className="mb-8 px-4">
          <h2 className="text-lg font-bold text-primary">My Dashboard</h2>
          <p className="text-xs text-text-secondary">Manage your content</p>
        </div>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all group"
          >
            <LayoutDashboard className="h-4 w-4 group-hover:text-primary transition-colors" />
            Overview
          </Link>
          <Link
            href="/dashboard/posts"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all group"
          >
            <FileText className="h-4 w-4 group-hover:text-primary transition-colors" />
            My Posts
          </Link>
          <Link
            href="/dashboard/bookmarks"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all group"
          >
            <Bookmark className="h-4 w-4 group-hover:text-primary transition-colors" />
            Bookmarks
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-surface hover:text-primary transition-all group"
          >
            <Settings className="h-4 w-4 group-hover:text-primary transition-colors" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

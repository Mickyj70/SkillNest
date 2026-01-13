import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Map, Activity, Sparkles } from "lucide-react";
import { getAdminStats } from "./actions";

export default async function AdminPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-bold uppercase tracking-wider">
            Admin Console
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard Overview
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary">
          Monitor SkillNest platform activity, manage user contributions, and
          oversee the resource ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-surface bg-linear-to-br from-surface/50 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider">
              Total Users
            </CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.userCount}</div>
            <p className="mt-1 text-xs text-text-secondary">
              Registered profiles
            </p>
          </CardContent>
        </Card>

        <Card className="border-surface bg-linear-to-br from-surface/50 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider">
              Pending Skills
            </CardTitle>
            <div className="rounded-lg bg-accent/10 p-2">
              <FileText className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pendingSkills}</div>
            <p className="mt-1 text-xs text-text-secondary">
              Awaiting moderation
            </p>
          </CardContent>
        </Card>

        <Card className="border-surface bg-linear-to-br from-surface/50 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider">
              Total Posts
            </CardTitle>
            <div className="rounded-lg bg-success/10 p-2">
              <Activity className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPosts}</div>
            <p className="mt-1 text-xs text-text-secondary">
              Resource contributions
            </p>
          </CardContent>
        </Card>

        <Card className="border-surface bg-linear-to-br from-surface/50 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider">
              Skills
            </CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Map className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalSkills}</div>
            <p className="mt-1 text-xs text-text-secondary">
              Active skill nodes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-surface bg-surface/30 p-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            User Management
          </h3>
          <p className="text-text-secondary mb-6 max-w-sm">
            Oversee all registered users, adjust permissions, and ensure
            community health.
          </p>
          <a
            href="/admin/users"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Manage Users
          </a>
        </div>

        <div className="rounded-2xl border border-surface bg-surface/30 p-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-accent/10 p-4">
            <FileText className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Content Moderation
          </h3>
          <p className="text-text-secondary mb-6 max-w-sm">
            Review and manage all community posts. Remove or archive content
            that doesn't meet quality standards.
          </p>
          <a
            href="/admin/resources"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Review Posts
          </a>
        </div>
      </div>
    </div>
  );
}

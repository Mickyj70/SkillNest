import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Map, Activity } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-text-secondary">
          Overview of SkillNest platform activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-surface bg-surface/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-text-secondary">+12 this week</p>
          </CardContent>
        </Card>
        <Card className="border-surface bg-surface/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Posts</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-text-secondary">Awaiting supervision</p>
          </CardContent>
        </Card>
        <Card className="border-surface bg-surface/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Roadmaps</CardTitle>
            <Map className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-text-secondary">8 fully populated</p>
          </CardContent>
        </Card>
        <Card className="border-surface bg-surface/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-text-secondary">Real-time engagement</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-dashed border-surface p-12 text-center text-text-secondary">
        <p>
          Specific management tools for users, posts, and roadmaps are located
          in the sidebar.
        </p>
      </div>
    </div>
  );
}

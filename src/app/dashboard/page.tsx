import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ThumbsUp, Bookmark, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, Demo User!
        </h1>
        <p className="text-text-secondary mt-2">
          Here&apos;s what&apos;s happening with your contributions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-surface bg-surface/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-text-secondary">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-surface bg-surface/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">423</div>
            <p className="text-xs text-text-secondary">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-surface bg-surface/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-text-secondary">+5 new this week</p>
          </CardContent>
        </Card>
        <Card className="border-surface bg-surface/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3%</div>
            <p className="text-xs text-text-secondary">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity or Posts Placeholder */}
      <div className="rounded-xl border border-surface bg-surface/10 p-8 text-center">
        <h3 className="text-lg font-medium">Recent Activity</h3>
        <p className="text-text-secondary text-sm mt-2">
          Your recent submissions and interactions will appear here.
        </p>
      </div>
    </div>
  );
}

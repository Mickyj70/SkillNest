import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, ExternalLink, Plus } from "lucide-react";

export default function MyPostsPage() {
  const posts = [
    {
      id: 1,
      title: "Introduction to React Server Components",
      type: "Article",
      status: "Published",
      views: 1205,
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS Grid",
      type: "Video",
      status: "Published",
      views: 854,
      date: "2024-03-10",
    },
    {
      id: 3,
      title: "Next.js 14 Full Course",
      type: "Course",
      status: "Pending",
      views: 0,
      date: "2024-03-18",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Posts</h1>
          <p className="text-text-secondary mt-2">
            Manage your submitted resources.
          </p>
        </div>
        <Link href="/submit">
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="mr-2 h-4 w-4" /> Create New Post
          </Button>
        </Link>
      </div>

      <Card className="border-surface bg-surface/20">
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            A list of all content you have submitted to SkillNest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-surface hover:bg-transparent">
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow
                  key={post.id}
                  className="border-surface hover:bg-surface/50"
                >
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        post.status === "Published"
                          ? "bg-success/20 text-success hover:bg-success/30"
                          : "bg-warning/20 text-warning hover:bg-warning/30"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.views.toLocaleString()}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-primary"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

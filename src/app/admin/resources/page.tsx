import { getAllResources, deleteResource } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  ExternalLink,
  MessageSquare,
  Clock,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function ResourcesAdminPage() {
  const resources = await getAllResources();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Post Moderation</h1>
          <p className="text-text-secondary">
            Review and manage all community submissions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Filter by title..."
              className="pl-10 border-surface bg-surface/50"
            />
          </div>
          <Button variant="outline" className="border-surface">
            <Filter className="h-4 w-4 mr-2" />
            Types
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-surface bg-canvas overflow-hidden">
        <Table>
          <TableHeader className="bg-surface/50">
            <TableRow className="border-surface hover:bg-transparent">
              <TableHead className="w-[400px] text-xs uppercase tracking-wider font-bold">
                Resource
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Author
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Skill
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Status
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow
                key={resource.id}
                className="border-surface hover:bg-surface/20 transition-colors"
              >
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="font-bold flex items-center gap-2">
                      {resource.title}
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 text-primary hover:text-primary-dark" />
                      </a>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(resource.created_at).toLocaleDateString()}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-bold border-surface px-1 py-0 h-4"
                      >
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">
                    {resource.profiles?.full_name || "Anonymous"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {resource.skills?.name || "Uncategorized"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase font-bold"
                  >
                    {resource.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-text-secondary hover:text-primary"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <form
                      action={async () => {
                        "use server";
                        await deleteResource(resource.id);
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-text-secondary hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

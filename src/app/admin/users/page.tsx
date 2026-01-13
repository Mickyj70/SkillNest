import { getAllUsers, updateUserRole } from "../actions";
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
import { Shield, User, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function UsersAdminPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-text-secondary">
            Manage permissions and view all registered profiles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search users..."
              className="pl-10 border-surface bg-surface/50"
            />
          </div>
          <Button variant="outline" className="border-surface">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-surface bg-canvas overflow-hidden">
        <Table>
          <TableHeader className="bg-surface/50">
            <TableRow className="border-surface hover:bg-transparent">
              <TableHead className="w-[300px] text-xs uppercase tracking-wider font-bold">
                User
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Role
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-bold">
                Joined
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-surface hover:bg-surface/20 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-surface border border-surface overflow-hidden">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.full_name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-text-secondary">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.full_name || "Anonymous User"}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {user.username || `@${user.id.slice(0, 8)}`}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                    className={
                      user.role === "admin"
                        ? "bg-primary text-white"
                        : "bg-surface text-text-secondary"
                    }
                  >
                    {user.role === "admin" ? (
                      <Shield className="h-3 w-3 mr-1" />
                    ) : (
                      <User className="h-3 w-3 mr-1" />
                    )}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-text-secondary">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <form
                    action={async () => {
                      "use server";
                      await updateUserRole(
                        user.id,
                        user.role === "admin" ? "user" : "admin"
                      );
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      Toggle Role
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

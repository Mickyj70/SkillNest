import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        <p className="text-text-secondary mt-2">
          Resources you have saved for later.
        </p>
      </div>

      <Card className="border-surface bg-surface/20 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-surface/50 p-4 mb-4">
            <Bookmark className="h-8 w-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium">No bookmarks yet</h3>
          <p className="text-text-secondary max-w-sm mt-2">
            Start browsing skills and resources to save content to your library.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

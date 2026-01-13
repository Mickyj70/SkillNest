import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  PlayCircle,
  FileText,
  Globe,
  Clock,
  ThumbsUp,
  Bookmark,
} from "lucide-react";
import Link from "next/link";

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  type: "Video" | "Article" | "Course" | "Other" | "Book" | "Tool";
  level: "Beginner" | "Intermediate" | "Advanced";
  url: string;
  author: string;
  likes: number;
  duration?: string;
  thumbnail_url?: string;
}

export function ResourceCard({
  id,
  title,
  description,
  type,
  level,
  url,
  author,
  likes,
  duration,
  thumbnail_url,
}: ResourceCardProps) {
  const TypeIcon =
    {
      Video: PlayCircle,
      Article: FileText,
      Course: Globe,
      Book: FileText,
      Tool: Globe,
      Other: Globe,
    }[type as any] || Globe;

  return (
    <Card className="flex flex-col border-surface bg-surface/30 backdrop-blur-sm transition-all hover:border-primary/50 overflow-hidden group">
      {thumbnail_url && (
        <div className="aspect-video w-full overflow-hidden border-b border-surface">
          <img
            src={thumbnail_url}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20 gap-1.5"
          >
            <TypeIcon className="h-3 w-3" /> {type}
          </Badge>
          <Badge
            variant="outline"
            className="border-surface text-text-secondary text-[10px]"
          >
            {level}
          </Badge>
        </div>
        <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/resource/${id}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="font-medium text-foreground">{author}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration || "5 min read"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-surface pt-4 flex justify-between items-center bg-surface/10">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            {likes}
          </button>
          <button className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors">
            <Bookmark className="h-4 w-4" />
            Save
          </button>
        </div>
        <Link
          href={`/resource/${id}`}
          className="text-xs font-bold text-primary flex items-center gap-1 group/link"
        >
          View Guide
          <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}

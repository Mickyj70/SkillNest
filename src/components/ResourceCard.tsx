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
  title: string;
  description: string;
  type: "Video" | "Article" | "Course" | "Other";
  level: "Beginner" | "Intermediate" | "Advanced";
  url: string;
  author: string;
  likes: number;
}

export function ResourceCard({
  title,
  description,
  type,
  level,
  url,
  author,
  likes,
}: ResourceCardProps) {
  const TypeIcon = {
    Video: PlayCircle,
    Article: FileText,
    Course: Globe,
    Other: Globe,
  }[type];

  return (
    <Card className="flex flex-col border-surface bg-surface/30 backdrop-blur-sm transition-all hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            <TypeIcon className="h-4 w-4" /> {type}
          </Badge>
          <Badge
            variant="outline"
            className="border-surface text-text-secondary text-[10px]"
          >
            {level}
          </Badge>
        </div>
        <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            {title} <ExternalLink className="h-3 w-3" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-text-secondary line-clamp-3 mb-4">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="font-medium text-foreground">{author}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            10 min read
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
          href={`/resource/123`}
          className="text-xs font-medium text-primary hover:underline"
        >
          View Detail
        </Link>
      </CardFooter>
    </Card>
  );
}

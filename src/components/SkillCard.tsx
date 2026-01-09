import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface SkillCardProps {
  name: string;
  slug: string;
  category: string;
  icon?: React.ReactNode;
  color?: string;
}

export function SkillCard({ name, slug, category, icon }: SkillCardProps) {
  return (
    <Link href={`/skills/${slug}`} className="group block">
      <Card className="h-full overflow-hidden border-surface bg-surface/20 backdrop-blur-sm transition-all hover:translate-y-[-4px] hover:border-primary/50 hover:bg-surface/40 hover:shadow-[0_20px_40px_-15px_rgba(102,126,234,0.2)]">
        {/* Visual Top Section */}
        <div className="relative flex h-32 items-center justify-center overflow-hidden bg-linear-to-br from-surface to-background/50">
          {/* Subtle circuit/grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] grayscale invert"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-surface/80 p-3 shadow-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            {icon || <div className="h-10 w-10 rounded-full bg-primary/20" />}
          </div>
        </div>

        {/* Info Bottom Section */}
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <Badge
              variant="secondary"
              className="mt-2 bg-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary border-none"
            >
              {category}
            </Badge>
          </div>

          <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5 text-sm font-bold text-primary transition-all group-hover:bg-primary group-hover:text-white">
            Explore <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

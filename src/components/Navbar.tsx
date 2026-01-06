"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary-dark font-bold text-white">
              SN
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              SkillNest
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
            <Link
              href="/skills"
              className="transition-colors hover:text-foreground"
            >
              Browse Skills
            </Link>
            <Link
              href="/resources"
              className="transition-colors hover:text-foreground"
            >
              Trending
            </Link>
            <Link
              href="/roadmaps"
              className="transition-colors hover:text-foreground"
            >
              Roadmaps
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-text-secondary hover:bg-surface hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Sign up
            </Link>
          </div>

          <button className="md:hidden rounded-full p-2 text-text-secondary hover:bg-surface hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

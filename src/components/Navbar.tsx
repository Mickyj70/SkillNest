"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  Rocket,
  Award,
  Shield,
  User,
  LogOut,
  Settings as SettingsIcon,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { logout } from "@/app/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  user: SupabaseUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Skills", href: "/skills", icon: Rocket },
    { name: "Trending", href: "#", icon: Award },
    { name: "Roadmaps", href: "/admin/roadmaps", icon: Award },
  ];

  // Admin link only if user needs it (optional logic)
  if (user) {
    // navLinks.push({ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Desktop Nav */}
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            {/* Show Admin link separately or based on role later */}
            {/* <Link
              href="/admin"
              className="transition-colors hover:text-foreground"
            >
              Admin
            </Link> */}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-text-secondary hover:bg-surface hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-surface bg-surface/50 p-1 pl-3 pr-1 transition-colors hover:bg-surface focus:outline-none">
                    <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                      {user.user_metadata.full_name ||
                        user.email?.split("@")[0]}
                    </span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata.avatar_url} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {(
                          user.user_metadata.full_name?.[0] ||
                          user.email?.[0] ||
                          "U"
                        ).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.user_metadata?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="cursor-pointer text-primary"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Console</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/bookmarks"
                      className="cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
          </div>

          <button
            className="md:hidden rounded-full p-2 text-text-secondary hover:bg-surface hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-surface bg-background overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-text-secondary hover:bg-surface hover:text-primary transition-all"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}

              <div className="my-2 h-px bg-surface" />

              {user ? (
                <>
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {(
                            user.user_metadata.full_name?.[0] ||
                            user.email?.[0] ||
                            "U"
                          ).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {user.user_metadata.full_name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-text-secondary hover:bg-surface hover:text-primary transition-all"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-red-500 hover:bg-red-500/10 transition-all text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </button>
                </>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-surface bg-surface py-3 text-center text-sm font-bold text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl bg-primary py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/25"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

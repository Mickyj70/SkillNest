"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { login, signInWithOAuth } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Github } from "lucide-react";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOAuthLogin = (provider: "google" | "github") => {
    startTransition(async () => {
      const result = await signInWithOAuth(provider);
      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await login(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Welcome back!");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-surface bg-surface p-8 shadow-md">
        <h2 className="mb-2 text-3xl font-extrabold text-center">
          Welcome back
        </h2>
        <p className="mb-8 text-center text-text-secondary">
          Log in to your account to continue shopping
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-transparent hover:bg-muted/50 h-12 text-base font-medium transition-all"
            onClick={() => handleOAuthLogin("google")}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-transparent hover:bg-muted/50 h-12 text-base font-medium transition-all"
            onClick={() => handleOAuthLogin("github")}
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wider">
            <span className="bg-surface px-4 text-text-secondary">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-sm ml-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl px-4 text-base bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20"
              required
            />
          </div>

          <div className="space-y-2 relative">
            <div className="flex items-center justify-between ml-1">
              <Label htmlFor="password" className="font-medium text-sm">
                Password
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl px-4 pr-12 text-base bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked as boolean)}
              className="rounded-full border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-text-secondary cursor-pointer"
            >
              Remember me for 30 days
            </Label>
          </div>

          <Button
            type="submit"
            className="mt-4 h-12 w-full rounded-xl text-base font-bold bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 text-primary-foreground"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline hover:text-primary-dark"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

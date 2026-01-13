"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signup, signInWithOAuth } from "@/app/auth/actions";
import PillSelect from "@/components/PillSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Eye, EyeOff, Mail } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [skill, setSkill] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOAuthLogin = (provider: "google" | "github") => {
    startTransition(async () => {
      const result = await signInWithOAuth(provider);
      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  // Profession options
  const professions = [
    "Developer",
    "Designer",
    "Data Science",
    "Product Manager",
    "QA Engineer",
    "DevOps Engineer",
    "System Administrator",
    "Mobile Developer",
    "UI/UX Designer",
    "Machine Learning Engineer",
    "Cybersecurity Specialist",
    "Frontend Developer",
    "Backend Developer",
  ];

  // Skill levels
  const skills = ["Beginner", "Intermediate", "Senior"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !profession || !skill) {
      toast.error("Please fill in all fields.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullName", name);
      formData.append("profession", profession);
      formData.append("skillLevel", skill);

      const result = await signup(formData);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        setIsSuccess(true);
        toast.success("Account created! Please check your email.");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border border-surface bg-surface/50 p-8 text-center shadow-lg backdrop-blur-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-8 w-8" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Check your inbox</h2>
          <p className="mb-8 text-text-secondary">
            We&apos;ve sent a verification link to{" "}
            <span className="font-medium text-foreground">{email}</span>. Please
            click the link to confirm your account and sign in.
          </p>
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={() => router.push("/login")}
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-surface bg-surface p-8 shadow-md">
        <h2 className="mb-2 text-3xl font-extrabold text-center">
          Create an Account
        </h2>
        <p className="mb-8 text-center text-text-secondary">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-surface bg-surface shadow-sm hover:border-primary/50 hover:bg-surface-foreground/5 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleOAuthLogin("google")}
              title="Sign up with Google"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
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
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-surface bg-surface shadow-sm hover:border-primary/50 hover:bg-surface-foreground/5 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleOAuthLogin("github")}
              title="Sign up with GitHub"
            >
              <Github className="h-6 w-6" />
            </Button>
          </div>

          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-surface" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-2 text-text-secondary">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="name" className="sr-only">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-full px-5 text-base"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full px-5 text-base"
              required
            />
          </div>

          <div className="space-y-1 relative">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-full px-5 pr-12 text-base"
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

          <div className="space-y-1">
            <Label className="pl-2 text-xs text-text-secondary uppercase tracking-wider font-semibold">
              Profession
            </Label>
            <PillSelect
              value={profession}
              onChange={setProfession}
              options={professions}
              placeholder="Select Profession"
            />
          </div>

          <div className="space-y-1">
            <Label className="pl-2 text-xs text-text-secondary uppercase tracking-wider font-semibold">
              Experience Level
            </Label>
            <PillSelect
              value={skill}
              onChange={setSkill}
              options={skills}
              placeholder="Select Level"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-full text-base font-bold bg-primary hover:bg-primary-dark"
            disabled={isPending}
          >
            {isPending ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

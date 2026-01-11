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
import { Mail } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [skill, setSkill] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border-surface/50 bg-surface/30 font-medium hover:bg-surface hover:text-foreground transition-all"
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
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border-surface/50 bg-surface/30 font-medium hover:bg-surface hover:text-foreground transition-all"
              onClick={() => handleOAuthLogin("github")}
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Sign up with GitHub
            </Button>
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-surface" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-text-secondary">
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

          <div className="space-y-1">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-full px-5 text-base"
              required
            />
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

"use client";
// components/auth/SignUp.tsx

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [skill, setSkill] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, profession, skill },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    console.log("Signup successful:", data);

    // Redirect to login page after successful signup
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-16 pb-12">
      <div className="w-full max-w-md rounded-2xl border border-surface bg-surface p-8 shadow-md">
        {/* Header */}
        <h2 className="mb-2 text-3xl font-extrabold text-center">
          Create an Account
        </h2>
        <p className="mb-6 text-center text-text-secondary">
          Sign up to get started
        </p>

        {/* Error message */}
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full border border-surface bg-background px-4 py-3 text-lg text-text-secondary focus:border-primary focus:outline-none hover:border-purple-500 transition-colors"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-surface bg-background px-4 py-3 text-lg text-text-secondary focus:border-primary focus:outline-none hover:border-purple-500 transition-colors"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full border border-surface bg-background px-4 py-3 text-lg text-text-secondary focus:border-primary focus:outline-none hover:border-purple-500 transition-colors"
            required
          />

          {/* Profession Dropdown */}
          <div className="relative w-full group">
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full rounded-full border border-surface bg-background py-3 px-4 pr-12 text-lg text-text-secondary focus:border-primary focus:outline-none appearance-none hover:border-purple-500 transition-colors duration-300 ease-in-out"
              required
            >
              <option value="" disabled>
                Select Profession
              </option>
              {professions.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary group-hover:text-purple-500">
              ▼
            </span>
          </div>

          {/* Skill Dropdown */}
          <div className="relative w-full group">
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full rounded-full border border-surface bg-background py-3 px-4 pr-12 text-lg text-text-secondary focus:border-primary focus:outline-none appearance-none hover:border-purple-500 transition-colors duration-300 ease-in-out"
              required
            >
              <option value="" disabled>
                Select Skill Level
              </option>
              {skills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary group-hover:text-purple-500">
              ▼
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-primary px-6 py-3 font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:text-primary underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

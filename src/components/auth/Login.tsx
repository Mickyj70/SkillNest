// components/auth/Login.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Placeholder for error messages
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    console.log("Login successful");
    setError(""); // clear error for now
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-surface bg-surface p-8 shadow-md">
        {/* Header */}
        <h2 className="mb-2 text-3xl font-extrabold text-center">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-text-secondary">
          Sign in to continue
        </p>

        {/* Error message */}
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-surface text-primary focus:ring-primary"
            />
            Remember me
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-primary px-6 py-3 font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 flex justify-between text-sm text-text-secondary">
          <Link
            href="/auth/forgot-password"
            className="hover:text-primary underline"
          >
            Forgot password?
          </Link>
          <Link href="/auth/signup" className="hover:text-primary underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { HomeSearch } from "@/components/home/HomeSearch";
import { SkillsCarousel } from "@/components/home/SkillsCarousel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center lg:pt-32">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-accent/5 blur-[100px]" />
        </div>

        <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
          Learn Anything,{" "}
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Faster.
          </span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-text-secondary sm:text-xl">
          SkillNest is your curated hub for the best learning resources.
          Discover paths, share knowledge, and take flight in your learning
          journey. Whether you&apos;re a developer, designer, or hobbyist — we
          have something for you.
        </p>

        {/* Dynamic Search Component */}
        <div className="w-full max-w-2xl">
          <HomeSearch />
        </div>
      </section>

      {/* Popular Skills Carousel */}
      <section className="border-y border-surface bg-surface/10 py-12">
        <SkillsCarousel />
      </section>

      {/* Value Props Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="rounded-2xl border border-surface bg-surface/20 p-8 shadow-sm transition-colors hover:border-primary/50 hover:bg-surface/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
                <path d="m4.93 4.93 14.14 14.14" />
                <path d="m14.14 4.93-14.14 14.14" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold">Curated Resources</h3>
            <p className="text-text-secondary">
              Stop wasting time searching. We handpick the best tutorials,
              courses, and documentation for every skill.
            </p>
          </div>
          <div className="rounded-2xl border border-surface bg-surface/20 p-8 shadow-sm transition-colors hover:border-primary/50 hover:bg-surface/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold">Community Driven</h3>
            <p className="text-text-secondary">
              Share your own findings, vote on the best content, and help others
              navigate their learning path.
            </p>
          </div>
          <div className="rounded-2xl border border-surface bg-surface/20 p-8 shadow-sm transition-colors hover:border-primary/50 hover:bg-surface/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold">Track Progress</h3>
            <p className="text-text-secondary">
              Save resources to your dashboard, track your learning journey, and
              build your personalized skill nest.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

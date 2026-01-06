import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const popularSkills = [
    { name: "Python", slug: "python" },
    { name: "JavaScript", slug: "javascript" },
    { name: "React", slug: "react" },
    { name: "Design", slug: "design" },
    { name: "Data Science", slug: "data-science" },
    { name: "DevOps", slug: "devops" },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-background py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Learn Anything,{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Faster
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-text-secondary sm:text-xl">
            SkillNest is your curated hub for the best developer resources.
            Discover paths, share knowledge, and take flight in your learning
            journey.
          </p>

          <div className="mx-auto max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-text-secondary" />
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="h-14 w-full rounded-full border-2 border-surface bg-surface pl-12 pr-4 text-lg focus:border-primary focus:outline-none transition-all"
              />
              <button className="absolute right-2 rounded-full bg-primary px-6 py-2 font-medium text-white hover:bg-primary-dark transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-accent blur-[100px]" />
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">Popular Skills</h2>
          <Link
            href="/skills"
            className="flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View all skills <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {popularSkills.map((skill) => (
            <Link
              key={skill.slug}
              href={`/skills/${skill.slug}`}
              className="group flex h-32 flex-col items-center justify-center rounded-2xl border border-surface bg-surface transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(102,126,234,0.1)]"
            >
              <span className="text-lg font-semibold group-hover:text-primary transition-colors">
                {skill.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

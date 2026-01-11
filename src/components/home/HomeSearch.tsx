"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Skill {
  name: string;
  slug: string;
  category?: string;
  categories?: { name: string } | null;
}

interface HomeSearchProps {
  skills: Skill[];
}

export function HomeSearch({ skills }: HomeSearchProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSkills = skills
    .filter((skill) => skill.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5); // Limit to top 5 suggestions

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/skills?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-text-secondary" />
        <Input
          type="text"
          placeholder="What do you want to learn today?"
          className="h-14 rounded-full border-surface bg-background/50 pl-12 pr-28 text-lg backdrop-blur-sm transition-all focus:bg-background/80 focus:ring-2 focus:ring-primary/20"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <button
          type="submit"
          className="absolute right-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-primary-dark"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && query.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full overflow-hidden rounded-2xl border border-surface bg-background/90 p-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          {filteredSkills.length > 0 ? (
            <ul>
              {filteredSkills.map((skill) => (
                <li key={skill.slug}>
                  <button
                    onClick={() => {
                      router.push(`/skills/${skill.slug}`);
                      setShowSuggestions(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-surface/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface/50">
                      <div className="h-6 w-6 rounded-full bg-primary/20" />
                    </div>
                    <div>
                      <span className="block font-bold text-foreground">
                        {skill.name}
                      </span>
                      <span className="block text-xs text-text-secondary uppercase tracking-wider">
                        {skill.categories?.name || "Skill"}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-text-secondary">
              No skills found. Try &quot;React&quot; or &quot;Python&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

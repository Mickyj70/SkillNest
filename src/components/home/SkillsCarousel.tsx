"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MOCK_SKILLS } from "@/lib/data";
import { SkillCard } from "@/components/SkillCard";

export function SkillsCarousel() {
  // Duplicate arrays to create seamless loop
  const duplicatedSkills = [...MOCK_SKILLS, ...MOCK_SKILLS];

  return (
    <div className="w-full overflow-hidden py-10">
      <div className="container mx-auto px-4 mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Popular Skills</h2>
          <p className="text-text-secondary">
            Most sought-after technologies this week
          </p>
        </div>
        <Link
          href="/skills"
          className="text-sm font-bold text-primary hover:underline"
        >
          View all skills →
        </Link>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: [0, -1920], // Adjust based on total width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`${skill.slug}-${index}`}
              className="w-[280px] shrink-0 transform-gpu"
            >
              <SkillCard {...skill} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface PillSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export default function PillSelect({
  value,
  onChange,
  options,
  placeholder,
}: PillSelectProps) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    setOpenUp(spaceBelow < 260);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full rounded-full border px-4 py-3 text-left text-lg transition-all
          ${
            value
              ? "bg-background text-foreground"
              : "bg-background text-text-secondary border-surface hover:border-purple-500"
          }
        `}
      >
        {value || placeholder}

        <span
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className={`absolute z-20 w-full max-h-60 overflow-auto rounded-2xl border border-surface bg-surface shadow-lg
            ${openUp ? "bottom-full mb-2" : "top-full mt-2"}
          `}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-3 text-sm transition-colors
  ${
    option === value
      ? "bg-purple-100 text-black"
      : "hover:bg-purple-50 hover:text-black text-text-secondary"
  }
`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

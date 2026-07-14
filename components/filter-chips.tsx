"use client";

import type { FilterValue } from "@/lib/filter-by-tag";

const defaultOptions: FilterValue[] = ["All", "Games", "Web", "Mobile", "AI"];

export function FilterChips({
  value,
  onChange,
  options = defaultOptions,
}: {
  value: FilterValue;
  onChange: (next: FilterValue) => void;
  options?: FilterValue[];
}) {
  return (
    <div
      role="group"
      aria-label="Filter by domain"
      className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
    >
      {options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={`shrink-0 whitespace-nowrap rounded-sm pb-1 underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? "text-ink underline decoration-accent"
                : "text-muted underline decoration-transparent hover:text-ink hover:decoration-[color:var(--hairline)]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

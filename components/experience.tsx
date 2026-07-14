"use client";

import { useState } from "react";
import { roles } from "@/content/experience";
import { filterByTag, type FilterValue } from "@/lib/filter-by-tag";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { FilterChips } from "@/components/filter-chips";

export function Experience() {
  const [active, setActive] = useState<FilterValue>("All");
  const visible = filterByTag(roles, active);

  return (
    <Section id="experience" title="Experience" compact>
      <FilterChips value={active} onChange={setActive} />

      {visible.length ? (
        <div className="mt-10 border-t border-[color:var(--hairline)]">
          {visible.map((role) => (
            <Reveal key={role.id}>
              <article className="flex flex-col gap-2 border-b border-[color:var(--hairline)] py-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted sm:text-base">
                      {role.company} · {role.location}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs tracking-[0.15em] text-muted uppercase sm:text-right">
                    {role.start} – {role.end}
                  </p>
                </div>
                <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink sm:text-base">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs tracking-[0.1em] text-muted uppercase">
                  {role.stack.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted">No roles for this filter.</p>
      )}
    </Section>
  );
}

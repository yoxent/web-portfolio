"use client";

import { useState } from "react";
import { skillGroups } from "@/content/skills";
import { filterByTag, type FilterValue } from "@/lib/filter-by-tag";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { FilterChips } from "@/components/filter-chips";

export function Skills() {
  const [active, setActive] = useState<FilterValue>("All");
  const visible = filterByTag(skillGroups, active);

  return (
    <Section id="skills" title="Skills">
      <FilterChips value={active} onChange={setActive} />

      {visible.length ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {visible.map((group) => (
            <Reveal key={group.id}>
              <div>
                <h3 className="text-xs font-medium tracking-[0.15em] text-muted uppercase">
                  {group.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink">
                  {group.items.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted">No skills for this filter.</p>
      )}
    </Section>
  );
}

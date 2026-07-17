import { skillGroups } from "@/content/skills";
import { resolveSkillIcon } from "@/lib/skill-icons";

export function SkillIconGrid() {
  return (
    <div className="space-y-8">
      {skillGroups.map((group) => (
        <div key={group.id}>
          <h4 className="text-xs font-medium tracking-[0.15em] text-muted uppercase">
            {group.label}
          </h4>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {group.items.map((label) => {
              const source = resolveSkillIcon(label);
              return (
                <li key={label}>
                  <span className="inline-flex h-10 items-center gap-2 rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] px-2.5 text-ink transition-colors hover:border-accent hover:text-accent">
                    {source.kind === "simple" ? (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 shrink-0 fill-current"
                        aria-hidden
                      >
                        <path d={source.icon.path} />
                      </svg>
                    ) : (
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center text-[0.6rem] font-medium tracking-wide"
                        aria-hidden
                      >
                        {source.letter}
                      </span>
                    )}
                    <span className="text-xs whitespace-nowrap">{label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

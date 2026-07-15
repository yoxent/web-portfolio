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
          <ul className="mt-4 flex flex-wrap gap-3">
            {group.items.map((label) => {
              const source = resolveSkillIcon(label);
              return (
                <li key={label}>
                  <span
                    title={label}
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] text-ink transition-colors hover:border-accent hover:text-accent focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
                  >
                    {source.kind === "simple" ? (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-current"
                        aria-hidden
                      >
                        <title>{label}</title>
                        <path d={source.icon.path} />
                      </svg>
                    ) : (
                      <span className="text-[0.65rem] font-medium tracking-wide" aria-hidden>
                        {source.letter}
                      </span>
                    )}
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

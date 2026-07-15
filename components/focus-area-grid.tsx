import type { FocusArea } from "@/content/types";

function FocusIcon({ name }: { name: FocusArea["icon"] }) {
  const common = {
    className: "h-7 w-7 text-accent",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "games":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "web":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 8h18" />
          <path d="M8 20h8" />
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="M11 17.5h2" />
        </svg>
      );
    case "agentic":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
          <path d="m5.6 5.6 1.8 1.8M16.6 16.6l1.8 1.8M16.6 7.4l1.8-1.8M5.6 18.4l1.8-1.8" />
        </svg>
      );
  }
}

export function FocusAreaGrid({ areas }: { areas: FocusArea[] }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {areas.map((area) => (
        <li
          key={area.id}
          className="flex gap-4 rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--ink)_3%,transparent)] p-4 sm:p-5"
        >
          <div className="mt-0.5 shrink-0">
            <FocusIcon name={area.icon} />
          </div>
          <div className="min-w-0">
            <h4 className="font-display text-base font-medium tracking-tight text-ink">
              {area.title}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{area.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

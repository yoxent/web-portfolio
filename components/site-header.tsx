import { profile } from "@/content/profile";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--hairline)] bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 sm:px-10 lg:px-16">
        <a
          href="#"
          className="font-display text-lg font-medium tracking-tight text-ink"
        >
          {profile.shortName}
        </a>

        <nav
          aria-label="Primary"
          className="order-3 flex w-full items-center gap-6 overflow-x-auto text-sm text-muted sm:order-none sm:w-auto sm:justify-center"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4 text-sm">
          <a
            href={profile.cvPath}
            download
            className="whitespace-nowrap text-ink underline decoration-[color:var(--hairline)] underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Download CV
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-muted transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-muted transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}

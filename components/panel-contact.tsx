import { profile } from "@/content/profile";

export function PanelContact() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Contact</h2>
      <div className="h-0.5 w-10 bg-accent" aria-hidden />
      <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        {profile.location} — reach out by email, or find me on GitHub and LinkedIn.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-base">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          LinkedIn
        </a>
        <a
          href={profile.cvPath}
          download
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}

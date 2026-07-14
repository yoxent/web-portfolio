import Image from "next/image";
import { profile } from "@/content/profile";

export function ShellSidebar() {
  return (
    <aside className="flex flex-col gap-6 border-[color:var(--hairline)] lg:border-r lg:pr-8">
      <div className="relative aspect-square w-28 overflow-hidden rounded-sm sm:w-36 lg:w-40">
        <Image
          src={profile.portraitPath}
          alt={profile.name}
          fill
          sizes="160px"
          className="object-cover"
          priority
        />
      </div>
      <div>
        <p className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {profile.name}
        </p>
        <p className="mt-2 text-xs tracking-[0.12em] text-muted uppercase sm:text-sm">
          {profile.title}
        </p>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a
          href={profile.cvPath}
          download
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Download CV
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Email
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
      </div>
    </aside>
  );
}

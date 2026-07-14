import { profile } from "@/content/profile";
import { Reveal } from "@/components/reveal";

function getLeadSentence(summary: string) {
  if (summary.length <= 140) return summary;
  const [firstSentence] = summary.split(". ");
  return `${firstSentence}.`;
}

export function Hero() {
  const lead = getLeadSentence(profile.summary);

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center px-6 sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-4xl">
        <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">{profile.title}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
          {lead}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          <a
            href={profile.cvPath}
            download
            className="border border-[color:var(--hairline)] px-5 py-2.5 text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Download CV
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get in touch
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-muted underline decoration-[color:var(--hairline)] underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-muted underline decoration-[color:var(--hairline)] underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}

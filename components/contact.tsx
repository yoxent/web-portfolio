import { profile } from "@/content/profile";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <Reveal>
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.location} — reach out by email, or find me on GitHub and
          LinkedIn.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-muted underline decoration-[color:var(--hairline)] underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            GitHub
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
            href={profile.cvPath}
            download
            className="border border-[color:var(--hairline)] px-5 py-2.5 text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Download CV
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

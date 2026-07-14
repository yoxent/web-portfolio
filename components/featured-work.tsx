import { projects } from "@/content/projects";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function FeaturedWork() {
  return (
    <Section id="work" title="Selected work">
      <div className="border-t border-[color:var(--hairline)]">
        {projects.map((project) => (
          <Reveal key={project.id}>
            <article className="flex flex-col gap-2 border-b border-[color:var(--hairline)] py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <div className="sm:max-w-2xl">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {project.blurb}
                </p>
                {project.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-[color:var(--hairline)] underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="shrink-0 text-xs tracking-[0.15em] text-muted uppercase sm:text-right">
                {project.tags.join(" · ")}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

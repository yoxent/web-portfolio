import { roles } from "@/content/experience";
import { projects } from "@/content/projects";
import { DemoPlayer } from "@/components/demo-player";
import { ProjectThumb } from "@/components/project-thumb";
import { sortProjectsByResumeTimeline } from "@/lib/sort-projects-by-resume";

export function PanelWork() {
  const ordered = sortProjectsByResumeTimeline(projects, roles);

  return (
    <div>
      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Work</h2>
      <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
      <div className="mt-6 border-t border-[color:var(--hairline)]">
        {ordered.map((project) => (
          <article key={project.id} className="border-b border-[color:var(--hairline)] py-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <div className="min-w-0 sm:max-w-2xl">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                  {project.title}
                </h3>
                {project.company ? (
                  <p className="mt-1 text-xs tracking-[0.15em] text-muted uppercase">
                    {project.company}
                  </p>
                ) : null}
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
                        className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
            </div>
            {project.media?.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.media.map((m) =>
                  m.kind === "image" && m.href ? (
                    <ProjectThumb key={m.id} label={m.label} src={m.src} href={m.href} />
                  ) : (
                    <DemoPlayer
                      key={m.id}
                      mediaId={`${project.id}:${m.id}`}
                      label={m.label}
                      src={m.src}
                    />
                  ),
                )}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

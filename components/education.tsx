import { education } from "@/content/education";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Education() {
  return (
    <Section id="education" title="Education" compact>
      <div className="border-t border-[color:var(--hairline)]">
        {education.map((entry) => (
          <Reveal key={entry.id}>
            <article className="flex flex-col gap-2 border-b border-[color:var(--hairline)] py-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted sm:text-base">
                    {entry.school} · {entry.location}
                  </p>
                  {entry.detail ? (
                    <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">
                      {entry.detail}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 text-xs tracking-[0.15em] text-muted uppercase sm:text-right">
                  {entry.start} – {entry.end}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

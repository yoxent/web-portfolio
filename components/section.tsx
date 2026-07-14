import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  compact = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <section id={id} className="scroll-mt-4">
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
          {title}
        </h3>
        <div className="mt-6">{children}</div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

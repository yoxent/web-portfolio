"use client";

import Image from "next/image";
import { useId } from "react";

type ProjectThumbProps = {
  label: string;
  src: string;
  href: string;
};

export function ProjectThumb({ label, src, href }: ProjectThumbProps) {
  const labelId = useId();

  return (
    <figure className="min-w-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={labelId}
        className="relative block overflow-hidden rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--ink)_6%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-top"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--ink)_85%,transparent)] text-[0.65rem] font-bold tracking-[0.15em] text-paper uppercase transition-opacity hover:bg-[color-mix(in_oklab,var(--ink)_90%,transparent)]">
            Open
          </span>
        </div>
      </a>
      <figcaption
        id={labelId}
        className="mt-2 text-xs tracking-[0.15em] text-muted uppercase"
      >
        {label}
      </figcaption>
    </figure>
  );
}

import Image from "next/image";
import { profile } from "@/content/profile";
import { SocialIconLinks } from "@/components/social-icon-links";
import { FitOneLine } from "@/components/fit-one-line";

const cvLinkClass =
  "rounded-sm text-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

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
      <div className="min-w-0">
        <FitOneLine
          className="font-display font-medium tracking-tight text-ink"
          maxPx={30}
          minPx={15}
        >
          {profile.name}
        </FitOneLine>
        <p className="mt-2 text-xs tracking-[0.12em] text-muted uppercase sm:text-sm">
          {profile.title}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <SocialIconLinks />
        <a href={profile.cvPath} download className={cvLinkClass}>
          Download CV
        </a>
      </div>
    </aside>
  );
}

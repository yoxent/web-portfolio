import { profile } from "@/content/profile";

type SocialIconLinksProps = {
  className?: string;
  iconClassName?: string;
};

const iconLinkClass =
  "inline-flex rounded-sm text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const githubLinkClass = `${iconLinkClass} relative items-end`;

function GitHubSubscript({ n }: { n: 1 | 2 }) {
  return (
    <span
      className="ml-0.5 translate-y-px text-[0.65em] leading-none font-medium tabular-nums"
      aria-hidden
    >
      {n}
    </span>
  );
}

export function SocialIconLinks({
  className = "flex items-center gap-4",
  iconClassName = "h-5 w-5",
}: SocialIconLinksProps) {
  return (
    <div className={className}>
      <a
        href={`mailto:${profile.email}`}
        aria-label={`Email ${profile.email}`}
        title={profile.email}
        className={iconLinkClass}
      >
        <MailIcon className={iconClassName} />
      </a>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub 1, yoxent"
        title="GitHub 1, yoxent"
        className={githubLinkClass}
      >
        <GitHubIcon className={iconClassName} />
        <GitHubSubscript n={1} />
      </a>
      {profile.githubOrg ? (
        <a
          href={profile.githubOrg}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 2, IndiePH"
          title="GitHub 2, IndiePH"
          className={githubLinkClass}
        >
          <GitHubIcon className={iconClassName} />
          <GitHubSubscript n={2} />
        </a>
      ) : null}
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
        className={iconLinkClass}
      >
        <LinkedInIcon className={iconClassName} />
      </a>
    </div>
  );
}

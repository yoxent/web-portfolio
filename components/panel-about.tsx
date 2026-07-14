import { profile } from "@/content/profile";

export function PanelAbout() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">About</h2>
      <div className="h-0.5 w-10 bg-accent" aria-hidden />
      <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{profile.summary}</p>
      {profile.seeking ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {profile.seeking}
        </p>
      ) : null}
    </div>
  );
}

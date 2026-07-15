import { focusAreas, profile } from "@/content/profile";
import { SkillIconGrid } from "@/components/skill-icon-grid";
import { FocusAreaGrid } from "@/components/focus-area-grid";

export function PanelAbout() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">About</h2>
        <div className="h-0.5 w-10 bg-accent" aria-hidden />
        <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{profile.summary}</p>
        {profile.aboutMore?.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div>
        <h3 className="font-display text-xl font-medium tracking-tight text-ink">What I work on</h3>
        <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
        <FocusAreaGrid areas={focusAreas} />
      </div>

      <div>
        <h3 className="font-display text-xl font-medium tracking-tight text-ink">Skills</h3>
        <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
        <div className="mt-6">
          <SkillIconGrid />
        </div>
      </div>
    </div>
  );
}

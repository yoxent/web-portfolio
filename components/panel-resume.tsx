import { Experience } from "@/components/experience";
import { Education } from "@/components/education";

export function PanelResume() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Resume</h2>
        <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
      </div>

      <div className="space-y-14">
        <Experience />
        <Education />
      </div>
    </div>
  );
}

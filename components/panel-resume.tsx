import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";

export function PanelResume() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Resume</h2>
        <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
      </div>
      <Experience />
      <Skills />
    </div>
  );
}

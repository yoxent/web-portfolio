import { Experience } from "@/components/experience";

export function PanelResume() {
  return (
    <div className="space-y-10 lg:pr-10">
      <div>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Resume</h2>
        <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
      </div>
      <Experience />
    </div>
  );
}

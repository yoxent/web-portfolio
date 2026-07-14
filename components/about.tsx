import { profile } from "@/content/profile";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <Section id="about" title="About">
      <Reveal>
        <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
          {profile.summary}
        </p>
        {profile.seeking ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {profile.seeking}
          </p>
        ) : null}
      </Reveal>
    </Section>
  );
}

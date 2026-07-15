import { ContactForm } from "@/components/contact-form";

export function PanelContact() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Contact</h2>
        <div className="h-0.5 w-10 bg-accent" aria-hidden />
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Have a project in mind or want to connect? Send a message.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium tracking-tight text-ink">Contact form</h3>
        <div className="h-0.5 w-10 bg-accent" aria-hidden />
        <ContactForm />
      </div>
    </div>
  );
}

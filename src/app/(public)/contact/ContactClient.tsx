"use client";

import { useActionState } from "react";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/i18n/context";
import { submitContact } from "@/actions/contact.action";
import { cn } from "@/lib/utils";
import type { SiteProfile } from "@/lib/site";

type State = { success: boolean; errors: Record<string, string[] | undefined> };
const initial: State = { success: false, errors: {} };

export function ContactClient({ site }: { site: SiteProfile }) {
  const { t } = useLang();
  const c = t.contact;
  const [state, action, pending] = useActionState(submitContact, initial);

  const channels = [
    { icon: Icons.mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Icons.whatsapp, label: "WhatsApp", value: site.phone, href: `https://wa.me/${site.whatsapp}` },
    { icon: Icons.github, label: "GitHub", value: cleanUrl(site.githubUrl), href: site.githubUrl },
    { icon: Icons.linkedin, label: "LinkedIn", value: cleanUrl(site.linkedinUrl), href: site.linkedinUrl },
  ];

  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.desc}
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal direction="right" className="space-y-3">
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                <ch.icon width={20} height={20} />
              </span>
              <div>
                <p className="text-xs text-muted">{ch.label}</p>
                <p className="text-sm font-medium">{ch.value}</p>
              </div>
            </a>
          ))}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card-soft/40 p-4 text-sm text-muted">
            <Icons.mapPin width={16} height={16} />
            {site.location}
          </div>
        </Reveal>

        <Reveal direction="left" className="rounded-card border border-border bg-card p-6 sm:p-8">
          {state.success ? (
            <div className="rounded-card border border-success/30 bg-success/10 p-8 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/20 text-success">
                <Icons.check width={24} height={24} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.successTitle}</h3>
              <p className="mt-2 text-sm text-muted">{c.successDesc}</p>
            </div>
          ) : (
            <form action={action} className="space-y-5">
              <Field label={c.name} error={state.errors.name?.[0]}>
                <input name="name" type="text" placeholder={c.namePlaceholder} className={inputCls(!!state.errors.name)} />
              </Field>
              <Field label={c.email} error={state.errors.email?.[0]}>
                <input name="email" type="email" placeholder={c.emailPlaceholder} className={inputCls(!!state.errors.email)} />
              </Field>
              <Field label={c.subject} error={state.errors.subject?.[0]}>
                <input name="subject" type="text" placeholder={c.subjectPlaceholder} className={inputCls(!!state.errors.subject)} />
              </Field>
              <Field label={c.message} error={state.errors.message?.[0]}>
                <textarea name="message" rows={5} placeholder={c.messagePlaceholder} className={inputCls(!!state.errors.message)} />
              </Field>
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? c.sending : c.send}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-bg-soft px-4 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2",
    hasError ? "border-red-500/50 focus:ring-red-500/40" : "border-border focus:border-accent focus:ring-accent/30"
  );
}

function cleanUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/i18n/context";
import type { SiteProfile } from "@/lib/site";

export function CTASection({ site }: { site: SiteProfile }) {
  const { t } = useLang();

  return (
    <section className="container-page py-20">
      <Reveal direction="up">
      <div className="relative overflow-hidden rounded-card border border-border bg-card p-10 text-center sm:p-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{t.cta.desc}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact">
            <Icons.mail width={18} height={18} />
            {t.cta.contact}
          </ButtonLink>
          <ButtonLink
            href={`https://wa.me/${site.whatsapp}`}
            variant="secondary"
            external
          >
            <Icons.whatsapp width={18} height={18} />
            WhatsApp
          </ButtonLink>
        </div>
      </div>
      </Reveal>
    </section>
  );
}

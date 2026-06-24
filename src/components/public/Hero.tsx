"use client";

import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/Icons";
import { useLang } from "@/i18n/context";
import type { SiteProfile } from "@/lib/site";

export function Hero({ site }: { site: SiteProfile }) {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-accent-purple/10 blur-[120px]" />
      </div>

      <div className="container-page py-20 sm:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {site.isAvailable && (
            <motion.div variants={fadeUp}>
              <Badge variant="success" className="mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                {t.hero.available}
              </Badge>
            </motion.div>
          )}

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight sm:text-6xl"
          >
            {site.fullName}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-2xl font-semibold text-gradient sm:text-3xl"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink href="/portfolio">
              {t.hero.cta_projects}
              <Icons.arrowRight width={18} height={18} />
            </ButtonLink>
            <ButtonLink href={site.cvUrl} variant="secondary" external>
              <Icons.download width={18} height={18} />
              {t.hero.cta_cv}
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              {t.hero.cta_contact}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.dl
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
          }}
        >
          {t.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card/60 p-5 text-center backdrop-blur-sm"
            >
              <dt className="text-2xl font-bold text-accent sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

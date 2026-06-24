"use client";

import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { useLang } from "@/i18n/context";
import type { SiteProfile } from "@/lib/site";

export function Footer({ site }: { site: SiteProfile }) {
  const { t } = useLang();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.portfolio, href: "/portfolio" },
    { label: t.nav.expertise, href: "/expertise" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const socials = [
    { href: site.githubUrl, icon: Icons.github, label: "GitHub" },
    { href: site.linkedinUrl, icon: Icons.linkedin, label: "LinkedIn" },
    { href: site.instagramUrl, icon: Icons.instagram, label: "Instagram" },
    { href: `mailto:${site.email}`, icon: Icons.mail, label: "Email" },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-bg-soft">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent text-sm">
              {getInitials(site.fullName)}
            </span>
            {site.fullName}
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t.footer.nav}</h4>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t.footer.connect}</h4>
          <div className="mt-3 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <s.icon width={18} height={18} />
              </a>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Icons.mapPin width={16} height={16} />
            {site.location}
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>(c) {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

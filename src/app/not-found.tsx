"use client";

import { ButtonLink } from "@/components/ui/Button";
import { useLang } from "@/i18n/context";

export default function NotFound() {
  const { t } = useLang();
  const n = t.notFound;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-bold text-gradient">{n.code}</p>
      <h1 className="mt-4 text-2xl font-bold">{n.title}</h1>
      <p className="mt-2 max-w-md text-muted">{n.desc}</p>
      <ButtonLink href="/" className="mt-8">{n.back}</ButtonLink>
    </div>
  );
}

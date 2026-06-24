"use client";

import { useLang } from "@/i18n/context";

export function LangToggle() {
  const { locale, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="grid h-9 min-w-[2.5rem] place-items-center rounded-lg border border-border px-2 text-xs font-semibold text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      {locale === "id" ? "EN" : "ID"}
    </button>
  );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icons } from "./Icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="h-9 w-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      {isDark ? (
        <Icons.sun width={18} height={18} />
      ) : (
        <Icons.moon width={18} height={18} />
      )}
    </button>
  );
}

"use client";

import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/i18n/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}

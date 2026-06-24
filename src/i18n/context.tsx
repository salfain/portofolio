"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { dict, type Locale, type Dict } from "./dict";

interface LangCtx {
  locale: Locale;
  t: Dict;
  toggle: () => void;
}

const LangContext = createContext<LangCtx>({
  locale: "id",
  t: dict.id as Dict,
  toggle: () => {},
});

const STORAGE_KEY = "portfolio-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "id" || saved === "en") setLocale(saved);
  }, []);

  const toggle = useCallback(() => {
    setLocale((prev) => {
      const next: Locale = prev === "id" ? "en" : "id";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ locale, t: dict[locale] as Dict, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

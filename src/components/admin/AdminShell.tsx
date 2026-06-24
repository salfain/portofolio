"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/Icons";
import { logoutAction } from "@/actions/auth.action";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "server" },
  { label: "Projects", href: "/admin/projects", icon: "code" },
  { label: "Kategori", href: "/admin/categories", icon: "globe" },
  { label: "Skills", href: "/admin/skills", icon: "support" },
  { label: "Pengalaman", href: "/admin/experiences", icon: "calendar" },
  { label: "Pendidikan", href: "/admin/education", icon: "award" },
  { label: "Sertifikat", href: "/admin/certificates", icon: "award" },
  { label: "Pesan", href: "/admin/messages", icon: "mail" },
  { label: "Settings", href: "/admin/settings", icon: "network" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLogin = pathname === "/admin/login";
  if (isLogin) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-bg-soft transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-border px-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent text-sm font-bold">SA</span>
          <span className="font-semibold">Admin Panel</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-card hover:text-fg"
                )}
              >
                <Icon width={18} height={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-fg"
            >
              <Icons.arrowRight width={18} height={18} className="rotate-180" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-bg-soft px-5">
          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:text-fg lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Icons.menu width={20} height={20} />
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-accent"
          >
            <Icons.external width={14} height={14} />
            Lihat Website
          </Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

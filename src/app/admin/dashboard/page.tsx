import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { StatCard } from "@/components/admin/AdminCard";
import { Icons } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [projectCount, skillCount, expCount, certCount, msgCount, unreadMsgCount, recentMsgs, recentProjects] =
    await Promise.all([
      db.project.count(),
      db.skill.count(),
      db.experience.count(),
      db.certificate.count(),
      db.contactMessage.count(),
      db.contactMessage.count({ where: { isRead: false } }),
      db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      db.project.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    { label: "Total Project", value: projectCount, icon: <Icons.code width={18} height={18} /> },
    { label: "Total Skill", value: skillCount, icon: <Icons.support width={18} height={18} /> },
    { label: "Total Pengalaman", value: expCount, icon: <Icons.calendar width={18} height={18} /> },
    { label: "Total Sertifikat", value: certCount, icon: <Icons.award width={18} height={18} /> },
    { label: "Total Pesan", value: msgCount, icon: <Icons.mail width={18} height={18} /> },
    { label: "Pesan Belum Dibaca", value: unreadMsgCount, icon: <Icons.mail width={18} height={18} /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Ringkasan konten portofolio</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold">Project Terbaru</h2>
            <Link href="/admin/projects" className="text-xs text-accent hover:underline">Lihat semua</Link>
          </div>
          <ul className="divide-y divide-border">
            {recentProjects.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-muted">{p.category.name} · {p.year}</p>
                </div>
                <Badge variant={p.status === "published" ? "success" : "default"}>
                  {p.status === "published" ? "Publik" : "Draft"}
                </Badge>
              </li>
            ))}
            {recentProjects.length === 0 && (
              <li className="px-5 py-6 text-center text-sm text-muted">Belum ada project</li>
            )}
          </ul>
        </div>

        {/* Recent Messages */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold">Pesan Terbaru</h2>
            <Link href="/admin/messages" className="text-xs text-accent hover:underline">Lihat semua</Link>
          </div>
          <ul className="divide-y divide-border">
            {recentMsgs.map((m) => (
              <li key={m.id} className="flex items-start justify-between gap-3 px-5 py-3 text-sm">
                <div className="min-w-0">
                  <p className={`font-medium ${!m.isRead ? "text-fg" : "text-muted"}`}>{m.name}</p>
                  <p className="truncate text-xs text-muted">{m.subject}</p>
                </div>
                {!m.isRead && <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
              </li>
            ))}
            {recentMsgs.length === 0 && (
              <li className="px-5 py-6 text-center text-sm text-muted">Belum ada pesan</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

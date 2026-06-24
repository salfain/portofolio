import type { Metadata } from "next";
import { getAllSkills, getSkillCategories } from "@/actions/skill.action";
import { Badge } from "@/components/ui/Badge";
import { SkillActions } from "./SkillActions";
import { NewSkillForm } from "./NewSkillForm";

export const metadata: Metadata = { title: "Skills" };
export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const [skills, categories] = await Promise.all([getAllSkills(), getSkillCategories()]);

  const levelVariant = { Fundamental: "default", Intermediate: "accent", Advanced: "purple" } as const;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Skills</h1>
        <p className="mt-1 text-sm text-muted">{skills.length} skill total</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* List */}
        <div className="rounded-xl border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-soft text-left text-xs text-muted">
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {skills.map((s) => (
                <tr key={s.id} className="hover:bg-bg-soft/40 transition-colors">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-muted text-xs">{s.category.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant={levelVariant[s.level as keyof typeof levelVariant] ?? "default"}>{s.level}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <SkillActions id={s.id} />
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-muted">Belum ada skill</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add form */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Tambah Skill</h2>
          <NewSkillForm categories={categories} />
        </div>
      </div>
    </div>
  );
}

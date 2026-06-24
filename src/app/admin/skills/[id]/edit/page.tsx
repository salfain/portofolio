import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkillCategories, updateSkill } from "@/actions/skill.action";
import { db } from "@/lib/db";
import { SkillEditForm } from "../../SkillEditForm";

type Params = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Edit Skill" };
export const dynamic = "force-dynamic";

export default async function EditSkillPage({ params }: Params) {
  const { id } = await params;
  const [skill, categories] = await Promise.all([
    db.skill.findUnique({ where: { id } }),
    getSkillCategories(),
  ]);

  if (!skill) notFound();

  const boundAction = updateSkill.bind(null, skill.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/skills" className="text-sm text-muted hover:text-accent">
          {"<-"} Skills
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Edit Skill</h1>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <SkillEditForm
          categories={categories}
          action={boundAction}
          defaultValues={{
            name: skill.name,
            categoryId: skill.categoryId,
            level: skill.level,
            description: skill.description,
            sortOrder: skill.sortOrder,
          }}
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import {
  getProjectCategoriesWithCount,
  getSkillCategoriesWithCount,
} from "@/actions/category.action";
import { CategorySection } from "./CategorySection";

export const metadata: Metadata = { title: "Kategori" };
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const [projectCats, skillCats] = await Promise.all([
    getProjectCategoriesWithCount(),
    getSkillCategoriesWithCount(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Kategori</h1>
        <p className="mt-1 text-sm text-muted">
          Kelola kategori untuk project dan skill
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <CategorySection
          title="Kategori Project"
          type="project"
          items={projectCats.map((c) => ({
            id: c.id,
            name: c.name,
            count: c._count.projects,
          }))}
        />
        <CategorySection
          title="Kategori Skill"
          type="skill"
          items={skillCats.map((c) => ({
            id: c.id,
            name: c.name,
            count: c._count.skills,
          }))}
        />
      </div>
    </div>
  );
}

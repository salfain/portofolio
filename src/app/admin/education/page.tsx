import type { Metadata } from "next";
import { getEducation } from "@/actions/education.action";
import { EduActions } from "./EduActions";
import { NewEduForm } from "./NewEduForm";

export const metadata: Metadata = { title: "Pendidikan" };
export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const items = await getEducation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Pendidikan</h1>
        <p className="mt-1 text-sm text-muted">{items.length} pendidikan total</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((edu) => (
            <div key={edu.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{edu.schoolName}</h3>
                  <p className="text-sm text-accent">{edu.major}</p>
                </div>
                <span className="text-xs text-muted">
                  {edu.startYear} - {edu.endYear ?? "Sekarang"}
                </span>
              </div>
              {edu.description && (
                <p className="mt-2 text-sm text-muted">{edu.description}</p>
              )}
              <div className="mt-3">
                <EduActions id={edu.id} />
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="py-10 text-center text-muted">Belum ada pendidikan</p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Tambah Pendidikan</h2>
          <NewEduForm />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateEducation } from "@/actions/education.action";
import { EduEditForm } from "../../EduEditForm";

type Params = { params: Promise<{ id: string }> };
export const metadata: Metadata = { title: "Edit Pendidikan" };
export const dynamic = "force-dynamic";

export default async function EditEducationPage({ params }: Params) {
  const { id } = await params;
  const edu = await db.education.findUnique({ where: { id } });
  if (!edu) notFound();

  const boundAction = updateEducation.bind(null, edu.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/education" className="text-sm text-muted hover:text-accent">
          ← Pendidikan
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Edit Pendidikan</h1>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <EduEditForm
          action={boundAction}
          defaultValues={{
            schoolName: edu.schoolName,
            major: edu.major,
            startYear: edu.startYear,
            endYear: edu.endYear,
            description: edu.description,
          }}
        />
      </div>
    </div>
  );
}

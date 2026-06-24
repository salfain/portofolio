import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateExperience } from "@/actions/experience.action";
import { db } from "@/lib/db";
import { ExpEditForm } from "../../ExpEditForm";

type Params = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Edit Pengalaman" };
export const dynamic = "force-dynamic";

export default async function EditExperiencePage({ params }: Params) {
  const { id } = await params;
  const experience = await db.experience.findUnique({ where: { id } });

  if (!experience) notFound();

  const boundAction = updateExperience.bind(null, experience.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/experiences" className="text-sm text-muted hover:text-accent">
          {"<-"} Pengalaman
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Edit Pengalaman</h1>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <ExpEditForm
          action={boundAction}
          defaultValues={{
            title: experience.title,
            organization: experience.organization,
            type: experience.type,
            startDate: experience.startDate.toISOString().slice(0, 7),
            endDate: experience.endDate?.toISOString().slice(0, 7) ?? "",
            isCurrent: experience.isCurrent,
            description: experience.description,
          }}
        />
      </div>
    </div>
  );
}

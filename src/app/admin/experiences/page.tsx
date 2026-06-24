import type { Metadata } from "next";
import { getExperiences } from "@/actions/experience.action";
import { Badge } from "@/components/ui/Badge";
import { ExpActions } from "./ExpActions";
import { NewExpForm } from "./NewExpForm";
import { formatDateRange } from "@/lib/utils";

export const metadata: Metadata = { title: "Pengalaman" };
export const dynamic = "force-dynamic";

const typeLabel: Record<string, string> = {
  work: "Kerja", freelance: "Freelance", internship: "Magang",
  organization: "Organisasi", project: "Project",
};

export default async function ExperiencesPage() {
  const exps = await getExperiences();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Pengalaman</h1>
        <p className="mt-1 text-sm text-muted">{exps.length} pengalaman total</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {exps.map((exp) => (
            <div key={exp.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-sm text-accent">{exp.organization}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{typeLabel[exp.type]}</Badge>
                  <span className="text-xs text-muted">
                    {formatDateRange(
                      exp.startDate.toISOString().slice(0, 7),
                      exp.endDate?.toISOString().slice(0, 7) ?? null,
                      exp.isCurrent
                    )}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted">{exp.description}</p>
              <div className="mt-3">
                <ExpActions id={exp.id} />
              </div>
            </div>
          ))}
          {exps.length === 0 && (
            <p className="py-10 text-center text-muted">Belum ada pengalaman</p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Tambah Pengalaman</h2>
          <NewExpForm />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateCertificate } from "@/actions/certificate.action";
import { db } from "@/lib/db";
import { CertEditForm } from "../../CertEditForm";

type Params = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Edit Sertifikat" };
export const dynamic = "force-dynamic";

export default async function EditCertificatePage({ params }: Params) {
  const { id } = await params;
  const certificate = await db.certificate.findUnique({ where: { id } });

  if (!certificate) notFound();

  const boundAction = updateCertificate.bind(null, certificate.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/certificates" className="text-sm text-muted hover:text-accent">
          {"<-"} Sertifikat
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Edit Sertifikat</h1>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <CertEditForm
          action={boundAction}
          defaultValues={{
            title: certificate.title,
            issuer: certificate.issuer,
            issueDate: certificate.issueDate.toISOString().slice(0, 7),
            credentialUrl: certificate.credentialUrl ?? "",
            description: certificate.description,
            hasImage: !!certificate.certificateImageUrl,
          }}
        />
      </div>
    </div>
  );
}

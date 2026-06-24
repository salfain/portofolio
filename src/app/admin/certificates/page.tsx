import type { Metadata } from "next";
import Image from "next/image";
import { getCertificates } from "@/actions/certificate.action";
import { Icons } from "@/components/ui/Icons";
import { CertActions } from "./CertActions";
import { NewCertForm } from "./NewCertForm";

export const metadata: Metadata = { title: "Sertifikat" };
export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const certs = await getCertificates();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Sertifikat</h1>
        <p className="mt-1 text-sm text-muted">{certs.length} sertifikat total</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {certs.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-xl border border-border bg-card">
              {c.certificateImageUrl ? (
                <div className="relative aspect-video bg-card-soft">
                  <Image
                    src={c.certificateImageUrl}
                    alt={c.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="p-5 pb-0">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-purple/10 text-accent-purple">
                    <Icons.award width={20} height={20} />
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-accent">{c.issuer}</p>
                <p className="mt-1 text-xs text-muted">{new Date(c.issueDate).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</p>
                <div className="mt-3">
                  <CertActions id={c.id} />
                </div>
              </div>
            </div>
          ))}
          {certs.length === 0 && (
            <p className="col-span-2 py-10 text-center text-muted">Belum ada sertifikat</p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Tambah Sertifikat</h2>
          <NewCertForm />
        </div>
      </div>
    </div>
  );
}

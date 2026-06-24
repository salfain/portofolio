"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCertificate } from "@/actions/certificate.action";

export function CertActions({ id }: { id: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/certificates/${id}/edit`}
        className="rounded-lg px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 transition-colors"
      >
        Edit
      </Link>
      <DeleteButton onDelete={async () => { await deleteCertificate(id); router.refresh(); }} />
    </div>
  );
}

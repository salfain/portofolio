"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type Category = { id: string; name: string };

type State = {
  success: boolean;
  errors: Record<string, string[] | undefined>;
};

const initial: State = { success: false, errors: {} };

interface Props {
  categories: Category[];
  action: (prev: unknown, fd: FormData) => Promise<State>;
  defaultValues?: Record<string, string | number | boolean | string[] | undefined>;
}

export function ProjectForm({ categories, action, defaultValues: dv = {} }: Props) {
  const [state, formAction, pending] = useActionState(action, initial);

  if (state.success) {
    return (
      <div className="rounded-xl border border-success/30 bg-success/10 p-8 text-center">
        <p className="text-lg font-semibold">Project berhasil disimpan!</p>
        <Link href="/admin/projects" className="mt-4 inline-block text-sm text-accent hover:underline">
          ← Kembali ke Projects
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Judul" required error={state.errors.title?.[0]}>
          <input name="title" defaultValue={dv.title as string} placeholder="Nama project" className={inputCls(!!state.errors.title)} />
        </FormField>
        <FormField label="Slug" required error={state.errors.slug?.[0]}>
          <input name="slug" defaultValue={dv.slug as string} placeholder="nama-project" className={inputCls(!!state.errors.slug)} />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Kategori" required error={state.errors.categoryId?.[0]}>
          <select name="categoryId" defaultValue={dv.categoryId as string} className={inputCls(!!state.errors.categoryId)}>
            <option value="">Pilih kategori...</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </FormField>
        <FormField label="Tahun" required error={state.errors.year?.[0]}>
          <input name="year" type="number" defaultValue={dv.year as number ?? new Date().getFullYear()} className={inputCls(!!state.errors.year)} />
        </FormField>
      </div>

      <FormField label="Deskripsi Singkat" required error={state.errors.shortDescription?.[0]}>
        <textarea name="shortDescription" rows={2} defaultValue={dv.shortDescription as string} placeholder="Ringkasan singkat project" className={inputCls(!!state.errors.shortDescription)} />
      </FormField>

      <FormField label="Latar Belakang Masalah" error={state.errors.problem?.[0]}>
        <textarea name="problem" rows={3} defaultValue={dv.problem as string} placeholder="Masalah yang diselesaikan" className={inputCls(!!state.errors.problem)} />
      </FormField>

      <FormField label="Solusi" error={state.errors.solution?.[0]}>
        <textarea name="solution" rows={3} defaultValue={dv.solution as string} placeholder="Pendekatan dan solusi" className={inputCls(!!state.errors.solution)} />
      </FormField>

      <FormField label="Konten Detail" error={state.errors.content?.[0]}>
        <textarea name="content" rows={5} defaultValue={dv.content as string} placeholder="Penjelasan lengkap..." className={inputCls(!!state.errors.content)} />
      </FormField>

      <FormField label="Fitur Utama (satu per baris)" error={state.errors.features?.[0]}>
        <textarea name="features" rows={4} defaultValue={(dv.features as string[] | undefined)?.join("\n")} placeholder={"Fitur A\nFitur B\nFitur C"} className={inputCls(!!state.errors.features)} />
      </FormField>

      <FormField label="Teknologi (pisahkan dengan koma)" error={state.errors.technologies?.[0]}>
        <input name="technologies" defaultValue={(dv.technologies as string[] | undefined)?.join(", ")} placeholder="Next.js, Prisma, Tailwind CSS" className={inputCls(!!state.errors.technologies)} />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="URL Demo" error={state.errors.demoUrl?.[0]}>
          <input name="demoUrl" type="url" defaultValue={dv.demoUrl as string} placeholder="https://demo.example.com" className={inputCls(!!state.errors.demoUrl)} />
        </FormField>
        <FormField label="URL GitHub" error={state.errors.githubUrl?.[0]}>
          <input name="githubUrl" type="url" defaultValue={dv.githubUrl as string} placeholder="https://github.com/..." className={inputCls(!!state.errors.githubUrl)} />
        </FormField>
      </div>

      <FormField label="Thumbnail" error={undefined}>
        <input name="thumbnail" type="file" accept="image/*" className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-accent" />
        {dv.thumbnailUrl && <p className="mt-1 text-xs text-muted">Thumbnail saat ini: sudah ada</p>}
      </FormField>

      <FormField label="Gallery Screenshot" error={undefined}>
        <input name="gallery" type="file" accept="image/*" multiple className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-accent" />
        {typeof dv.galleryCount === "number" && dv.galleryCount > 0 && (
          <p className="mt-1 text-xs text-muted">
            Gallery saat ini: {dv.galleryCount} gambar. Upload baru akan ditambahkan.
          </p>
        )}
      </FormField>

      <div className="flex flex-wrap gap-6">
        <FormField label="Status" required error={state.errors.status?.[0]}>
          <select name="status" defaultValue={dv.status as string ?? "draft"} className={inputCls(!!state.errors.status)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FormField>
        <FormField label="Featured di Homepage" error={undefined}>
          <select name="isFeatured" defaultValue={String(dv.isFeatured ?? false)} className={inputCls()}>
            <option value="false">Tidak</option>
            <option value="true">Ya</option>
          </select>
        </FormField>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending}>{pending ? "Menyimpan..." : "Simpan Project"}</Button>
        <Link href="/admin/projects" className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm text-muted hover:text-fg transition-colors">
          Batal
        </Link>
      </div>
    </form>
  );
}

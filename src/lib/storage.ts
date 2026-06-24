import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Simpan file ke folder public/uploads/<folder>/.
 * Mengembalikan URL relatif (mis. /uploads/projects/162...-abc.jpg)
 * yang langsung bisa dipakai di <img src> atau next/image.
 */
export async function saveLocalFile(
  folder: string,
  filename: string,
  body: Buffer
): Promise<string> {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const relDir = path.posix.join("uploads", folder);
  const absDir = path.join(PUBLIC_DIR, relDir);

  await mkdir(absDir, { recursive: true });
  await writeFile(path.join(absDir, safeName), body);

  // URL publik (selalu pakai forward slash)
  return `/${path.posix.join(relDir, safeName)}`;
}

/**
 * Hapus file lokal berdasarkan URL relatif (mis. /uploads/projects/xxx.jpg).
 * Aman dipanggil; error diabaikan jika file tidak ada.
 */
export async function deleteLocalFile(url: string | null | undefined): Promise<void> {
  if (!url || !url.startsWith("/uploads/")) return;
  try {
    await unlink(path.join(PUBLIC_DIR, url));
  } catch {
    // file tidak ada / sudah terhapus — abaikan
  }
}

/**
 * Helper: ubah File (dari FormData) jadi tersimpan di public, kembalikan URL.
 * Mengembalikan null jika file kosong.
 */
export async function saveUploadedFile(
  folder: string,
  file: File | null
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return saveLocalFile(folder, file.name, buffer);
}

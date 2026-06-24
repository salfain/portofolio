import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL!;

/**
 * Upload buffer langsung ke R2.
 * Kembalikan URL publik file.
 */
export async function uploadToR2(
  key: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  await R2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return `${PUBLIC_URL}/${key}`;
}

/**
 * Buat pre-signed URL untuk upload langsung dari browser (opsional).
 */
export async function createPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 300
): Promise<string> {
  return getSignedUrl(
    R2,
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn }
  );
}

/**
 * Hapus file dari R2.
 */
export async function deleteFromR2(key: string): Promise<void> {
  await R2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

/**
 * Generate key unik dari nama file.
 * Contoh: uploads/projects/1749999-thumbnail.jpg
 */
export function generateKey(folder: string, filename: string): string {
  const ext = filename.split(".").pop() ?? "bin";
  return `uploads/${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
}

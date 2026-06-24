"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import { uploadToR2, deleteFromR2, generateKey } from "@/lib/r2";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

// ─── Read ────────────────────────────────────────────────────────────────────

export async function getProjects() {
  return db.project.findMany({
    include: { category: true, technologies: { include: { technology: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedProjects() {
  return db.project.findMany({
    where: { status: "published" },
    include: {
      category: true,
      technologies: { include: { technology: true } },
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { year: "desc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return db.project.findUnique({
    where: { slug },
    include: {
      category: true,
      technologies: { include: { technology: true } },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getPublishedProjectBySlug(slug: string) {
  return db.project.findFirst({
    where: { slug, status: "published" },
    include: {
      category: true,
      technologies: { include: { technology: true } },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getFeaturedProjects() {
  return db.project.findMany({
    where: { status: "published", isFeatured: true },
    include: {
      category: true,
      technologies: { include: { technology: true } },
      images: { orderBy: { sortOrder: "asc" } },
    },
    take: 3,
    orderBy: { year: "desc" },
  });
}

export async function getProjectCategories() {
  return db.projectCategory.findMany({ orderBy: { sortOrder: "asc" } });
}

async function uploadProjectGallery(
  projectId: string,
  entries: FormDataEntryValue[],
  startOrder = 0
) {
  const files = entries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  if (files.length === 0) return;

  await Promise.all(
    files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const key = generateKey("projects/gallery", file.name);
      const imageUrl = await uploadToR2(key, buffer, file.type);

      await db.projectImage.create({
        data: {
          projectId,
          imageUrl,
          caption: file.name,
          sortOrder: startOrder + index,
        },
      });
    })
  );
}

// ─── Create ──────────────────────────────────────────────────────────────────

export async function createProject(
  _prev: unknown,
  formData: FormData
) {
  await requireAdmin();

  const techNames = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const features = (formData.get("features") as string)
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    categoryId: formData.get("categoryId") as string,
    shortDescription: formData.get("shortDescription") as string,
    problem: formData.get("problem") as string,
    solution: formData.get("solution") as string,
    content: formData.get("content") as string,
    features,
    technologies: techNames,
    demoUrl: (formData.get("demoUrl") as string) || undefined,
    githubUrl: (formData.get("githubUrl") as string) || undefined,
    year: Number(formData.get("year")),
    status: formData.get("status") as "draft" | "published",
    isFeatured: formData.get("isFeatured") === "true",
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { technologies, ...projectData } = result.data;

  // Upsert technologies
  const techIds = await Promise.all(
    technologies.map(async (name) => {
      const tech = await db.technology.upsert({
        where: { name },
        create: { name },
        update: {},
      });
      return tech.id;
    })
  );

  // Handle thumbnail upload
  let thumbnailUrl: string | undefined;
  const thumbnailFile = formData.get("thumbnail") as File | null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    const key = generateKey("projects", thumbnailFile.name);
    thumbnailUrl = await uploadToR2(key, buffer, thumbnailFile.type);
  }

  const project = await db.project.create({
    data: {
      ...projectData,
      thumbnailUrl,
      technologies: {
        create: techIds.map((id) => ({ technologyId: id })),
      },
    },
  });

  await uploadProjectGallery(project.id, formData.getAll("gallery"));

  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true, errors: {} };
}

// ─── Update ──────────────────────────────────────────────────────────────────

export async function updateProject(id: string, _prev: unknown, formData: FormData) {
  await requireAdmin();

  const techNames = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const features = (formData.get("features") as string)
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    categoryId: formData.get("categoryId") as string,
    shortDescription: formData.get("shortDescription") as string,
    problem: formData.get("problem") as string,
    solution: formData.get("solution") as string,
    content: formData.get("content") as string,
    features,
    technologies: techNames,
    demoUrl: (formData.get("demoUrl") as string) || undefined,
    githubUrl: (formData.get("githubUrl") as string) || undefined,
    year: Number(formData.get("year")),
    status: formData.get("status") as "draft" | "published",
    isFeatured: formData.get("isFeatured") === "true",
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { technologies, ...projectData } = result.data;

  const techIds = await Promise.all(
    technologies.map(async (name) => {
      const tech = await db.technology.upsert({
        where: { name },
        create: { name },
        update: {},
      });
      return tech.id;
    })
  );

  // Handle thumbnail upload
  let thumbnailUrl: string | undefined;
  const thumbnailFile = formData.get("thumbnail") as File | null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    const key = generateKey("projects", thumbnailFile.name);
    thumbnailUrl = await uploadToR2(key, buffer, thumbnailFile.type);
  }

  await db.project.update({
    where: { id },
    data: {
      ...projectData,
      ...(thumbnailUrl && { thumbnailUrl }),
      technologies: {
        deleteMany: {},
        create: techIds.map((id) => ({ technologyId: id })),
      },
    },
  });

  const currentImageCount = await db.projectImage.count({
    where: { projectId: id },
  });
  await uploadProjectGallery(id, formData.getAll("gallery"), currentImageCount);

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${result.data.slug}`);
  revalidatePath("/");
  return { success: true, errors: {} };
}

// ─── Delete ──────────────────────────────────────────────────────────────────

export async function deleteProject(id: string) {
  await requireAdmin();
  const project = await db.project.findUnique({ where: { id } });
  if (!project) return { success: false };

  // Delete thumbnail from R2 if stored there
  if (project.thumbnailUrl?.includes("r2.cloudflarestorage.com")) {
    try {
      const key = project.thumbnailUrl.split("/uploads/")[1];
      if (key) await deleteFromR2(`uploads/${key}`);
    } catch {
      // non-blocking
    }
  }

  await db.project.delete({ where: { id } });
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true };
}

// ─── Toggle status ───────────────────────────────────────────────────────────

export async function toggleProjectStatus(id: string, current: string) {
  await requireAdmin();
  await db.project.update({
    where: { id },
    data: { status: current === "published" ? "draft" : "published" },
  });
  revalidatePath("/portfolio");
  revalidatePath("/");
}

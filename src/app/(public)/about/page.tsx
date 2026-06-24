import type { Metadata } from "next";
import type { Experience, Certificate } from "@prisma/client";
import { getExperiences } from "@/actions/experience.action";
import { getCertificates } from "@/actions/certificate.action";
import { education as staticEducation } from "@/data/profile";
import { db } from "@/lib/db";
import { getSiteProfile } from "@/lib/site";
import type { Education } from "@/types";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Profil, pendidikan, pengalaman, sertifikat, dan minat bidang IT.",
};
export const revalidate = 60;

async function safeGetExperiences(): Promise<Experience[]> {
  try { return await getExperiences(); } catch { return []; }
}
async function safeGetCertificates(): Promise<Certificate[]> {
  try { return await getCertificates(); } catch { return []; }
}
async function safeGetEducation(): Promise<Education[]> {
  try {
    return await db.education.findMany({ orderBy: { startYear: "desc" } });
  } catch {
    return staticEducation;
  }
}

export default async function AboutPage() {
  const [experiences, certificates, education, site] = await Promise.all([
    safeGetExperiences(),
    safeGetCertificates(),
    safeGetEducation(),
    getSiteProfile(),
  ]);
  return (
    <AboutClient
      site={site}
      education={education}
      experiences={experiences}
      certificates={certificates}
    />
  );
}

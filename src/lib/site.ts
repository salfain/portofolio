import type { Profile } from "@prisma/client";
import { cache } from "react";
import { profile as staticProfile } from "@/data/profile";
import { db } from "@/lib/db";

export type SiteProfile = {
  fullName: string;
  headline: string;
  shortRole: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  cvUrl: string;
  profileImageUrl: string;
  isAvailable: boolean;
};

export const defaultSiteProfile: SiteProfile = {
  ...staticProfile,
  profileImageUrl: "",
};

function valueOrFallback(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function boolOrFallback(value: string | null | undefined, fallback: boolean) {
  if (value === undefined || value === null || value === "") return fallback;
  return value === "true";
}

function fromDbProfile(profile: Profile | null): SiteProfile {
  if (!profile) return defaultSiteProfile;

  return {
    fullName: profile.fullName,
    headline: valueOrFallback(profile.headline, defaultSiteProfile.headline),
    shortRole: valueOrFallback(profile.shortRole, defaultSiteProfile.shortRole),
    tagline: valueOrFallback(profile.tagline, defaultSiteProfile.tagline),
    bio: valueOrFallback(profile.bio, defaultSiteProfile.bio),
    location: valueOrFallback(profile.location, defaultSiteProfile.location),
    email: valueOrFallback(profile.email, defaultSiteProfile.email),
    phone: valueOrFallback(profile.phone, defaultSiteProfile.phone),
    whatsapp: valueOrFallback(profile.whatsapp, defaultSiteProfile.whatsapp),
    githubUrl: valueOrFallback(profile.githubUrl, defaultSiteProfile.githubUrl),
    linkedinUrl: valueOrFallback(profile.linkedinUrl, defaultSiteProfile.linkedinUrl),
    instagramUrl: valueOrFallback(profile.instagramUrl, defaultSiteProfile.instagramUrl),
    cvUrl: valueOrFallback(profile.cvUrl, defaultSiteProfile.cvUrl),
    profileImageUrl: profile.profileImageUrl ?? "",
    isAvailable: profile.isAvailable,
  };
}

export function mergeSiteSettings(
  base: SiteProfile,
  settings: Record<string, string>
): SiteProfile {
  const whatsapp = valueOrFallback(settings.whatsapp, base.whatsapp);

  return {
    ...base,
    fullName: valueOrFallback(settings.site_name, base.fullName),
    tagline: valueOrFallback(settings.tagline, base.tagline),
    bio: valueOrFallback(settings.bio, base.bio),
    email: valueOrFallback(settings.email, base.email),
    phone: valueOrFallback(settings.phone, whatsapp || base.phone),
    whatsapp,
    githubUrl: valueOrFallback(settings.github_url, base.githubUrl),
    linkedinUrl: valueOrFallback(settings.linkedin_url, base.linkedinUrl),
    instagramUrl: valueOrFallback(settings.instagram_url, base.instagramUrl),
    cvUrl: valueOrFallback(settings.cv_url, base.cvUrl),
    isAvailable: boolOrFallback(settings.is_available, base.isAvailable),
  };
}

export const getSiteProfile = cache(async (): Promise<SiteProfile> => {
  try {
    const [settingsRows, dbProfile] = await Promise.all([
      db.siteSetting.findMany(),
      db.profile.findFirst(),
    ]);

    const settings = Object.fromEntries(
      settingsRows.map((row) => [row.key, row.value])
    );

    return mergeSiteSettings(fromDbProfile(dbProfile), settings);
  } catch {
    return defaultSiteProfile;
  }
});

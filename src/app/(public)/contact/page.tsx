import type { Metadata } from "next";
import { getSiteProfile } from "@/lib/site";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi Muhammad Syaban Alfain untuk kerja sama, project, freelance, atau peluang karier.",
};

export default async function ContactPage() {
  const site = await getSiteProfile();
  return <ContactClient site={site} />;
}

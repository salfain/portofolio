import { getFeaturedProjects } from "@/actions/project.action";
import { toProjectView } from "@/lib/transforms";
import { getSiteProfile } from "@/lib/site";
import { HomeClient } from "./HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  let featured: ReturnType<typeof toProjectView>[] = [];
  const site = await getSiteProfile();

  try {
    const raw = await getFeaturedProjects();
    featured = raw.map(toProjectView);
  } catch {
    // DB not yet configured
  }

  return <HomeClient featured={featured} site={site} />;
}

import type { Metadata } from "next";
import { getSkillsGrouped } from "@/actions/skill.action";
import type { SkillGroup } from "@/types";
import { ExpertiseClient } from "./ExpertiseClient";

export const metadata: Metadata = {
  title: "Expertise",
  description: "Skill teknis di bidang frontend, backend, database, IT support, network, server, tools, dan dokumentasi.",
};
export const revalidate = 60;

export default async function ExpertisePage() {
  let skillGroups: SkillGroup[] = [];
  try {
    const raw = await getSkillsGrouped();
    skillGroups = raw.map((g) => ({
      category: g.name,
      skills: g.skills.map((s) => ({
        name: s.name,
        level: s.level as SkillGroup["skills"][number]["level"],
        description: s.description,
      })),
    }));
  } catch {
    // DB not configured
  }
  return <ExpertiseClient skillGroups={skillGroups} />;
}

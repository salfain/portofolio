"use client";

import { SectionHeading } from "@/components/public/SectionHeading";
import { SkillCard } from "@/components/public/SkillCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useLang } from "@/i18n/context";
import type { SkillGroup } from "@/types";

export function ExpertiseClient({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const { t } = useLang();
  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow={t.expertise.eyebrow}
        title={t.expertise.title}
        description={t.expertise.desc}
      />
      <div className="mt-12 space-y-12">
        {skillGroups.map((group) => (
          <Reveal key={group.category}>
            <h2 className="flex items-center gap-3 text-xl font-bold">
              <span className="h-6 w-1 rounded-full bg-accent" />
              {group.category}
            </h2>
            <StaggerGroup className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
              {group.skills.map((skill) => (
                <StaggerItem key={skill.name}>
                  <SkillCard skill={skill} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
        ))}
        {skillGroups.length === 0 && (
          <p className="py-10 text-center text-muted">{t.expertise.empty}</p>
        )}
      </div>
    </div>
  );
}

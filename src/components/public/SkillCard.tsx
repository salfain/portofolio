import type { Skill } from "@/types";
import { Badge } from "@/components/ui/Badge";

const levelVariant = {
  Fundamental: "default",
  Intermediate: "accent",
  Advanced: "purple",
} as const;

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold">{skill.name}</h4>
        <Badge variant={levelVariant[skill.level]}>{skill.level}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">{skill.description}</p>
    </div>
  );
}

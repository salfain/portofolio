import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "purple" | "success" | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-card-soft text-muted border border-border",
  accent: "bg-accent/10 text-accent border border-accent/30",
  purple: "bg-accent-purple/10 text-accent-purple border border-accent-purple/30",
  success: "bg-success/10 text-success border border-success/30",
  outline: "border border-border text-muted",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

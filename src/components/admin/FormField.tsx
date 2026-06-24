import { cn } from "@/lib/utils";

export function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function inputCls(hasError = false) {
  return cn(
    "w-full rounded-lg border bg-bg-soft px-3 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2",
    hasError ? "border-red-500/50 focus:ring-red-500/40" : "border-border focus:border-accent focus:ring-accent/30"
  );
}

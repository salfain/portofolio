export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateRange(
  start: string,
  end: string | null,
  isCurrent: boolean
) {
  const fmt = (d: string) => {
    const [year, month] = d.split("-");
    if (!month) return year;
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
  };
  const startLabel = fmt(start);
  const endLabel = isCurrent ? "Sekarang" : end ? fmt(end) : "";
  return endLabel ? `${startLabel} - ${endLabel}` : startLabel;
}

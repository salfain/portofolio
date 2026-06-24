"use client";

import { useState } from "react";
import { Icons } from "@/components/ui/Icons";

export function DeleteButton({
  onDelete,
  label = "Hapus",
}: {
  onDelete: () => Promise<unknown>;
  label?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <button
          onClick={async () => {
            setLoading(true);
            await onDelete();
            setLoading(false);
            setConfirming(false);
          }}
          disabled={loading}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-50"
        >
          {loading ? "..." : "Ya, hapus"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-fg"
        >
          Batal
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
    >
      <Icons.close width={14} height={14} />
      {label}
    </button>
  );
}

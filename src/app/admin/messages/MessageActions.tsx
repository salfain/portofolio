"use client";
import { useRouter } from "next/navigation";
import { markMessageRead, deleteMessage } from "@/actions/message.action";
import { DeleteButton } from "@/components/admin/DeleteButton";

export function MessageActions({ id, isRead }: { id: string; isRead: boolean }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      {!isRead && (
        <button
          onClick={async () => { await markMessageRead(id); router.refresh(); }}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-fg transition-colors"
        >
          Tandai dibaca
        </button>
      )}
      <DeleteButton onDelete={async () => { await deleteMessage(id); router.refresh(); }} />
    </div>
  );
}

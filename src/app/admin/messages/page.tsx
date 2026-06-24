import type { Metadata } from "next";
import { getMessages } from "@/actions/message.action";
import { MessageActions } from "./MessageActions";

export const metadata: Metadata = { title: "Pesan Masuk" };
export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pesan Masuk</h1>
        <p className="mt-1 text-sm text-muted">{messages.length} pesan, {unread} belum dibaca</p>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`rounded-xl border bg-card p-5 ${!m.isRead ? "border-accent/30" : "border-border"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  {!m.isRead && <span className="h-2 w-2 rounded-full bg-accent" />}
                  <h3 className="font-semibold">{m.name}</h3>
                  <span className="text-xs text-muted">{m.email}</span>
                </div>
                <p className="mt-1 font-medium text-sm text-accent">{m.subject}</p>
                <p className="mt-2 text-sm text-muted whitespace-pre-wrap">{m.message}</p>
                <p className="mt-3 text-xs text-muted">
                  {new Date(m.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
              <MessageActions id={m.id} isRead={m.isRead} />
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="py-16 text-center text-muted">Belum ada pesan masuk</p>
        )}
      </div>
    </div>
  );
}

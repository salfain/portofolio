"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.action";
import { Icons } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type State = { success: boolean; error: string | null };
const initial: State = { success: false, error: null };

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent text-lg font-bold">SA</div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">Masuk untuk mengelola portofolio</p>
        </div>

        <form action={action} className="space-y-4 rounded-xl border border-border bg-card p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@portofolio.local"
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={inputCls}
            />
          </div>

          {state.error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {pending ? "Masuk..." : <>Masuk <Icons.arrowRight width={16} height={16} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputCls = cn(
  "w-full rounded-lg border border-border bg-bg-soft px-3 py-2.5 text-sm text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:border-accent focus:ring-accent/30 transition-colors"
);

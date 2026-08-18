import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Masuk",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-pills bg-emerald-pulse text-sm font-semibold text-white shadow-subtle">
            N
          </span>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-heading bg-gradient-to-r from-pine via-emerald-pulse to-amber-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
              {siteConfig.name}
            </h1>
            <p className="text-sm text-graphite">
              Masuk untuk mengakses dashboard Anda.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

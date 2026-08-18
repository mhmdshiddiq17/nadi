import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions";

export default function AccessPendingPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-background p-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-secondary">
          <ShieldAlert className="size-6" />
        </div>

        <h1 className="font-display text-3xl font-semibold">
          Akses belum diberikan
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Akun Anda telah terautentikasi, tetapi belum
          memiliki role NADI yang aktif.
        </p>

        <form
          action={signOut}
          className="mt-6"
        >
          <Button
            type="submit"
            variant="outline"
          >
            Keluar
          </Button>
        </form>
      </div>
    </main>
  );
}
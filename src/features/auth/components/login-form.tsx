"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  signIn,
  type LoginActionState,
} from "../actions";

const initialState: LoginActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    signIn,
    initialState,
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col items-center gap-1 text-center">
        <CardTitle className="font-heading text-lg font-semibold tracking-tight">
          Masuk
        </CardTitle>
        <CardDescription>
          Gunakan akun yang terdaftar untuk melanjutkan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nama@agrinaspangan.co.id"
              disabled={pending}
              required
            />

            {state.fieldErrors?.email?.[0] && (
              <p className="text-sm text-destructive">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled={pending}
              required
            />

            {state.fieldErrors?.password?.[0] && (
              <p className="text-sm text-destructive">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>

          {state.error && (
            <div
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {state.error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <LogIn />
                Masuk
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
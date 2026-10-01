"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useAppForm } from "@/hooks/use-app-form";
import { Brand } from "@/components/brand";
import { brandName } from "@/lib/branding";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  defaultAuthValues,
  authSchemas,
  type AuthFormValues,
} from "@/features/auth/lib/validators";
export function AuthForm({ flow }: { flow: "signIn" | "signUp" }) {
  const signup = flow === "signUp";
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: defaultAuthValues,
    validators: { onChange: authSchemas[flow] },
    onSubmit: async ({ value }) => {
      const data = new FormData();
      data.set("email", value.email.trim());
      data.set("password", value.password);
      data.set("flow", flow);
      if (signup) data.set("name", value.name.trim());
      try {
        const result = await signIn("password", data);
        if (result.signingIn) {
          router.replace("/dashboard");
          router.refresh();
        } else {
          setError("Authentication could not be completed. Please try again.");
        }
      } catch {
        setError(
          signup
            ? "Could not create your account. Check your details or try logging in if you already have an account."
            : "Could not log in. Check your email and password, then try again.",
        );
      }
    },
  });
  const fields: {
    name: keyof AuthFormValues;
    label: string;
    type: string;
    autoComplete: string;
  }[] = [
    ...(signup
      ? [
          {
            name: "name" as const,
            label: "Full name",
            type: "text",
            autoComplete: "name",
          },
        ]
      : []),
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    {
      name: "password",
      label: "Password",
      type: "password",
      autoComplete: signup ? "new-password" : "current-password",
    },
    ...(signup
      ? [
          {
            name: "confirmPassword" as const,
            label: "Confirm password",
            type: "password",
            autoComplete: "new-password",
          },
        ]
      : []),
  ];
  return (
    <div className="flex min-h-svh flex-col bg-muted/30">
      <header className="flex items-center justify-between p-6">
        <Brand render={<Link href="/" aria-label={`${brandName} home`} />} />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Your next chapter starts here
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              {signup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {signup
                ? "A simple starting point for what comes next."
                : `Log in to your ${brandName} workspace.`}
            </p>
          </div>
          <Card>
            <CardContent>
              <form.AppForm>
                <form
                  noValidate
                  className="space-y-5"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (form.state.isSubmitting) return;
                    const element = event.currentTarget;
                    setError(null);
                    await form.handleSubmit();
                    requestAnimationFrame(() => {
                      element
                        .querySelector<HTMLInputElement>(
                          'input[aria-invalid="true"]',
                        )
                        ?.focus();
                    });
                  }}
                >
                  {fields.map((config) => (
                    <form.AppField key={config.name} name={config.name}>
                      {(field) => (
                        <field.TextField
                          id={config.name}
                          label={config.label}
                          type={config.type}
                          autoComplete={config.autoComplete}
                          required
                          minLength={
                            signup && config.name === "password" ? 8 : undefined
                          }
                          description={
                            signup && config.name === "password"
                              ? "Use at least 8 characters."
                              : undefined
                          }
                        />
                      )}
                    </form.AppField>
                  ))}
                  {error && (
                    <Alert variant="destructive" role="alert">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <form.SubmitButton
                    label={signup ? "Create account" : "Log in"}
                    pendingLabel={signup ? "Creating account…" : "Logging in…"}
                  />
                </form>
              </form.AppForm>
            </CardContent>
          </Card>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {signup ? "Already have an account?" : `New to ${brandName}?`}{" "}
            <Link
              className="font-medium text-foreground underline underline-offset-4"
              href={signup ? "/login" : "/signup"}
            >
              {signup ? "Log in" : "Create an account"}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

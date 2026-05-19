"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { ThemeSelector } from "@/components/ThemeSelector";
import { btnPrimaryClassName, inputClassName } from "@/lib/ui-classes";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(friendlyError(error.message));
        setLoading(false);
        return;
      }
      toast.success(
        "Account created! If email confirmation is on, check your inbox. Otherwise, log in now."
      );
      setMode("login");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(friendlyError(error.message));
      setLoading(false);
      return;
    }

    toast.success("Welcome back!");
    router.push("/app");
    router.refresh();
  }

  return (
    <div className="card w-full max-w-md bg-base-100/95 shadow-2xl backdrop-blur rounded-2xl border border-base-300/40 transition-shadow duration-200 hover:shadow-xl">
      <div className="card-body gap-5">
        <div>
          <h2 className="section-title text-2xl">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-helper mt-2">
            {mode === "login"
              ? "Log in to track your concert spending and fun ratings."
              : "Sign up to start logging concerts and building your dashboard."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[7.5rem_1fr] sm:items-center">
            <label htmlFor="email" className="label sm:justify-end sm:py-0">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              id="email"
              type="email"
              className={inputClassName}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[7.5rem_1fr] sm:items-center">
            <label htmlFor="password" className="label sm:justify-end sm:py-0">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              id="password"
              type="password"
              className={inputClassName}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          <button
            type="submit"
            className={`${btnPrimaryClassName} w-full active:scale-[0.98] transition-transform ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-link btn-sm self-center"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already have an account? Log in"}
        </button>

        <div className="divider my-0">Theme</div>
        <ThemeSelector className="mx-auto" />
      </div>
    </div>
  );
}

function friendlyError(message: string): string {
  if (message.toLowerCase().includes("invalid login")) {
    return "That email or password did not work. Please try again.";
  }
  if (message.toLowerCase().includes("already registered")) {
    return "That email is already in use. Try logging in instead.";
  }
  return message;
}

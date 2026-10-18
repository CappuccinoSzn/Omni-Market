"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import {
  btnGhost,
  btnPrimary,
  card,
  fieldError,
  input,
  label,
  noticePanel,
} from "./styles";

const perks = {
  login: [
    "Real email and password sign-in",
    "Your bag and favourites stay on this device",
    "Syncing them to your account is still on the roadmap",
  ],
  register: [
    "Creates an email and password account",
    "Shopping works with or without an account",
    "No seller profiles or messaging yet",
  ],
};

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const isRegister = mode === "register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!supabase) {
      setError(
        "Account sign-in is not configured for this environment yet. Add your Supabase keys to .env.local to enable it — shopping still works as a guest."
      );
      return;
    }

    if (password.length < 6) {
      setError("Use at least 6 characters for your password.");
      return;
    }

    if (isRegister && password !== confirm) {
      setError("Both passwords need to match.");
      return;
    }

    setBusy(true);

    if (isRegister) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });

      if (signUpError) setError(signUpError.message);
      else if (data.session) router.push("/dashboard");
      else
        setMessage(
          "Account created. Check your inbox to confirm the email, then sign in."
        );
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) setError(signInError.message);
      else router.push("/dashboard");
    }

    setBusy(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
      <div className={`${card} max-w-xl`}>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {isRegister
            ? "One account for buying, selling and saved finds."
            : "Sign in to reach your bag, favourites and listings."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className={label}>
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={input}
              placeholder="you@example.com"
            />
          </label>

          <div>
            <label className={`${label} block`}>
              Password
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={`${input} pr-20`}
                  placeholder={isRegister ? "At least 6 characters" : "Your password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#234b35]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>
          </div>

          {isRegister && (
            <label className={label}>
              Confirm password
              <input
                required
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className={input}
                placeholder="Repeat your password"
              />
            </label>
          )}

          {error && (
            <p role="alert" className={fieldError}>
              {error}
            </p>
          )}

          {message && <p className={`${noticePanel} text-left`}>{message}</p>}

          <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
            {busy
              ? "Working..."
              : isRegister
                ? "Create account"
                : "Sign in"}{" "}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#234b35] hover:underline">
                Sign in instead
              </Link>
            </>
          ) : (
            <>
              New to Omni Market?{" "}
              <Link href="/register" className="font-semibold text-[#234b35] hover:underline">
                Create an account
              </Link>
            </>
          )}
        </p>

        <div className="mt-4 border-t border-[#e6e8df] pt-4 text-sm text-gray-500">
          Prefer to look around first?{" "}
          <Link href="/products" className="font-semibold text-[#234b35] hover:underline">
            Continue as a guest
          </Link>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="rounded-3xl bg-[#234b35] p-6 text-white">
          <h2 className="text-lg font-semibold">
            {isRegister ? "What you get" : "Good to see you"}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {perks[mode].map((perk) => (
              <li key={perk} className="flex gap-2">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-[#c5dba9]" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-[#e6e8df] bg-white p-6 text-sm text-gray-600">
          <h2 className="text-base font-semibold text-[#26382a]">
            Your data, your control
          </h2>
          <p className="mt-2 leading-6">
            Omni Market keeps shopping data on your device by default. Read how
            we handle information in the{" "}
            <Link href="/privacy" className="font-semibold text-[#234b35] hover:underline">
              privacy policy
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-[#234b35] hover:underline">
              talk to us
            </Link>
            .
          </p>
        </div>

        <Link href="/help" className={`${btnGhost} w-full`}>
          Trouble signing in?
        </Link>
      </aside>
    </div>
  );
}

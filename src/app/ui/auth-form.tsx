"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import {
  btnGhost,
  btnPrimary,
  card,
  fieldError,
  input,
  kicker,
  label,
  noticePanel,
  panelDark,
  rule,
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
      <div className={`${card} relative max-w-xl overflow-hidden`}>
        <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9]" />
        <div className="relative">
          <p className={kicker}>
            <span className="cuk-live-dot" aria-hidden />
            {isRegister ? "Two minutes, no fees" : "Welcome back"}
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {isRegister ? (
              <>
                Create your{" "}
                <span className="cuk-grad-text font-serif font-normal italic">
                  account
                </span>
              </>
            ) : (
              <>
                Sign in to{" "}
                <span className="cuk-grad-text font-serif font-normal italic">
                  Omni Market
                </span>
              </>
            )}
          </h1>
          <div className={rule} />
        </div>
        <p className="mt-4 text-sm text-gray-500">
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#f2f7ec] px-3 py-1.5 text-[11px] font-semibold text-[#234b35] transition hover:bg-[#e4eed7]"
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
        <div className={`${panelDark} p-6`}>
          <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
          <span
            className="cuk-blob right-[-12%] top-[-45%] h-[180px] w-[180px] opacity-25"
            style={{ background: "#9ec77f" }}
            aria-hidden
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[1.6px] text-[#d5e4c8] ring-1 ring-white/15">
              <span className="cuk-live-dot" aria-hidden />
              {isRegister ? "What you get" : "Good to see you"}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
              {perks[mode].map((perk) => (
                <li key={perk} className="flex gap-3">
                  <ArrowRight
                    size={16}
                    className="mt-0.5 shrink-0 text-[#c5dba9]"
                  />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-6 text-sm leading-6 text-gray-600 shadow-[0_8px_26px_rgba(28,54,34,0.05)] transition duration-300 hover:border-[#c7d8b8] hover:shadow-[0_18px_38px_rgba(28,54,34,0.10)]">
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#26382a]">
            <ShieldCheck size={16} className="text-[#658958]" />
            Your data, your control
          </h2>
          <p className="mt-2">
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

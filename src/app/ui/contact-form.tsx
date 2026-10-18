"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  btnGhost,
  btnPrimary,
  card,
  fieldError,
  input,
  label,
  noticePanel,
} from "./styles";

const topics = [
  "Question about an order",
  "Report a listing",
  "Selling on Omni Market",
  "Account or data request",
  "Something else",
];

const empty = { name: "", email: "", topic: topics[0], message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  function update(key: keyof typeof empty, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.message.trim().length < 15) {
      setError("Add a little more detail so we can help in one reply.");
      return;
    }

    setReference(`OM-${Math.abs(form.email.length + form.message.length)}-${Date.now().toString().slice(-4)}`);
    setForm(empty);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const supportAddress = "support@omnimarket.co.ke";

  if (reference) {
    return (
      <div className={card}>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2e8]">
          <Check size={22} className="text-[#234b35]" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold">Message ready</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Your reference is <strong>{reference}</strong>. The messaging backend is
          not connected yet, so send the same note to our team and quote the
          reference — we reply within one working day.
        </p>

        <div className={`${noticePanel} mt-5`}>
          <a
            href={`mailto:${supportAddress}?subject=${encodeURIComponent(
              `Omni Market ${reference}: ${form.topic || topics[0]}`
            )}`}
            className="font-semibold text-[#234b35] hover:underline"
          >
            Email {supportAddress}
          </a>{" "}
          or call the seller line on +254 700 000 000 (Mon–Sat, 9am–6pm).
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => setReference("")} className={btnPrimary}>
            Write another message
          </button>
          <Link href="/help" className={btnGhost}>
            Back to the help centre
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${card} space-y-5`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Your name *
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className={input}
            placeholder="Full name"
            autoComplete="name"
          />
        </label>

        <label className={label}>
          Email *
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className={input}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label className={`${label} block sm:col-span-2`}>
          What is it about?
          <select
            value={form.topic}
            onChange={(event) => update("topic", event.target.value)}
            className={input}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <label className={`${label} block sm:col-span-2`}>
          Message *
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            className={`${input} resize-y`}
            placeholder="Include the listing or order reference if you have one."
          />
        </label>
      </div>

      {error && (
        <p role="alert" className={fieldError}>
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className={btnPrimary}>
          Prepare message <ArrowRight size={16} />
        </button>
        <p className="text-xs text-gray-500">
          We only use what you send to answer this query.
        </p>
      </div>
    </form>
  );
}

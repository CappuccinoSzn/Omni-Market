"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Copy } from "lucide-react";
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
  "Question about a listing",
  "Question about an order",
  "Report a listing",
  "Selling on Omni Market",
  "Account or data request",
  "Something else",
];

const empty = { name: "", email: "", topic: topics[0], message: "" };

const copyMessages = {
  idle: "Quote this reference in whatever you send so the note and your listing or order line up.",
  done: "Copied to your clipboard. Paste it into an email or a message to whoever you are dealing with.",
  failed: "Your browser blocked the clipboard. Select the text above and copy it manually.",
};

export default function ContactForm({ about = "" }: { about?: string }) {
  const [form, setForm] = useState(() => ({
    ...empty,
    message: about ? `About "${about}": ` : "",
  }));
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [draft, setDraft] = useState("");
  const [copyState, setCopyState] = useState<keyof typeof copyMessages>(
    "idle"
  );

  function update(key: keyof typeof empty, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.message.trim().length < 15) {
      setError("Add a little more detail so one note is enough.");
      return;
    }

    const ref = `OM-${Date.now().toString().slice(-6)}`;

    setDraft(
      `Omni Market reference ${ref}\nTopic: ${form.topic}\nFrom: ${form.name} <${form.email}>\n\n${form.message.trim()}`
    );
    setReference(ref);
    setCopyState("idle");
    setForm(empty);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
  }

  if (reference) {
    return (
      <div className={`${card} relative overflow-hidden`}>
        <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9]" />
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-white shadow-[0_14px_30px_rgba(28,64,42,0.28)]"
        >
          <Check size={26} strokeWidth={3} />
        </motion.span>
        <h2 className="relative mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
          Message{" "}
          <span className="cuk-grad-text font-serif font-normal italic">
            ready
          </span>
        </h2>
        <p className="relative mt-3 text-sm leading-6 text-gray-600">
          Your reference is{" "}
          <span className="rounded-full bg-[#eef4e6] px-2.5 py-1 font-mono text-xs font-bold text-[#234b35]">
            {reference}
          </span>
          . This demo does not send anything to a server — no message, no email,
          no ticket. The note below stays on your device, so copy it and send it
          however you like.
        </p>

        <label className={`${label} relative mt-5 block`}>
          Message to send
          <textarea
            readOnly
            rows={8}
            value={draft}
            onFocus={(event) => event.target.select()}
            className={`${input} resize-y`}
          />
        </label>

        <div className={`${noticePanel} relative mt-5`}>
          {copyMessages[copyState]}
        </div>

        <div className="relative mt-6 flex flex-wrap gap-3">
          <button onClick={handleCopy} className={btnPrimary}>
            <Copy size={16} /> Copy the message
          </button>
          <button onClick={() => setReference("")} className={btnGhost}>
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
    <form
      onSubmit={handleSubmit}
      className={`${card} relative space-y-6 overflow-hidden`}
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9]" />

      <div className="relative grid gap-4 sm:grid-cols-2">
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

        <fieldset className="sm:col-span-2">
          <legend className={label}>What is it about?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {topics.map((topic) => {
              const active = form.topic === topic;

              return (
                <label key={topic} className="cursor-pointer">
                  <input
                    type="radio"
                    name="contact-topic"
                    value={topic}
                    checked={active}
                    onChange={() => update("topic", topic)}
                    className="sr-only"
                  />
                  <span
                    className={`inline-flex items-center rounded-full px-3.5 py-2.5 text-xs font-semibold transition duration-200 active:scale-[0.97] sm:text-sm ${
                      active
                        ? "bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-white shadow-[0_10px_22px_rgba(28,64,42,0.20)]"
                        : "border border-[#e2e7dc] bg-white text-gray-600 hover:-translate-y-0.5 hover:border-[#a8c199] hover:text-[#234b35]"
                    }`}
                  >
                    {topic}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

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
        <p role="alert" className={`${fieldError} relative`}>
          {error}
        </p>
      )}

      <div className="relative flex flex-wrap items-center gap-3">
        <button type="submit" className={btnPrimary}>
          Prepare message <ArrowRight size={16} />
        </button>
        <p className="flex items-center gap-2 text-xs text-gray-500">
          <span className="cuk-live-dot" aria-hidden />
          Nothing leaves this browser. You get a reference and a copy of the note.
        </p>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
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
      <div className={card}>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2e8]">
          <Check size={22} className="text-[#234b35]" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold">Message ready</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Your reference is <strong>{reference}</strong>. This demo does not send
          anything to a server — no message, no email, no ticket. The note below
          stays on your device, so copy it and send it however you like.
        </p>

        <label className={`${label} mt-5 block`}>
          Message to send
          <textarea
            readOnly
            rows={8}
            value={draft}
            onFocus={(event) => event.target.select()}
            className={`${input} resize-y`}
          />
        </label>

        <div className={`${noticePanel} mt-5`}>{copyMessages[copyState]}</div>

        <div className="mt-6 flex flex-wrap gap-3">
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
          Nothing leaves this browser. You get a reference and a copy of the note.
        </p>
      </div>
    </form>
  );
}

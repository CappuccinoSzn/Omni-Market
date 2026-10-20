"use client";

import { motion } from "framer-motion";
import { kicker, rule } from "./styles";

export default function PageHeader({
  kicker: label,
  title,
  description,
  accent,
  children,
}: {
  kicker: string;
  title: string;
  description?: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className={kicker}>
        <span className="cuk-live-dot" aria-hidden />
        {label}
      </p>

      <h1 className="mt-4 text-3xl font-semibold tracking-[-1px] sm:text-4xl lg:text-[52px] lg:tracking-[-2px]">
        {title}
        {accent && (
          <>
            <br />
            <span className="cuk-grad-text font-serif text-[0.92em] font-normal italic">
              {accent}
            </span>
          </>
        )}
      </h1>

      <span className={`${rule} block`} aria-hidden />

      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
          {description}
        </p>
      )}

      {children && <div className="mt-5">{children}</div>}
    </motion.div>
  );
}

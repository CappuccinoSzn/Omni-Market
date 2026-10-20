"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useApp } from "@/app/lib/store";

export default function Toast() {
  const { notice } = useApp();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {notice && (
          <motion.div
            key={notice}
            initial={{ opacity: 0, y: 26, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            role="status"
            className="flex max-w-full items-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-br from-[#2c5c3f] via-[#234b35] to-[#173624] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(18,41,29,0.32)] ring-1 ring-white/10"
          >
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c5dba9] text-[#173624]">
              <Check size={15} strokeWidth={3} />
              <span
                className="absolute inset-0 rounded-full ring-2 ring-[#c5dba9]/50"
                aria-hidden
              />
            </span>
            <span className="truncate">{notice}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

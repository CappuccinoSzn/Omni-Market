"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useApp } from "@/app/lib/store";

export default function Toast() {
  const { notice } = useApp();

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          key={notice}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          role="status"
          className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#234b35] px-5 py-3.5 text-sm font-medium text-white shadow-xl"
        >
          <Check size={17} className="text-[#c5dba9]" />
          {notice}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import { useSafeMotion } from "@/hooks/use-safe-motion";
import { slideUp } from "@/lib/motion/slide";

export function AuthMotionWrapper({ children }: { children: React.ReactNode }) {
  const animation = useSafeMotion(slideUp);
  return (
    <motion.section {...animation} className="w-full max-w-md">
      {children}
    </motion.section>
  );
}

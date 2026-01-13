"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";

const CTA_KEY = "cta-dismissed-at";
const SHOW_AGAIN_AFTER_DAYS = 7;
const SHOW_DELAY = 2000;
const MIN_DESKTOP_WIDTH = 768;

export function CTA() {
  const t = useTranslations("cta");
  const [open, setOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Chỉ show trên desktop
    if (window.innerWidth < MIN_DESKTOP_WIDTH) return;

    const dismissedAt = localStorage.getItem(CTA_KEY);

    if (dismissedAt) {
      const diffDays =
        (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);

      if (diffDays < SHOW_AGAIN_AFTER_DAYS) {
        return;
      }
    }

    let cancelled = false;

    timerRef.current = setTimeout(() => {
      if (!cancelled) {
        setOpen(true);
      }
    }, SHOW_DELAY);

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem(CTA_KEY, Date.now().toString());
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-xl border bg-background p-6 shadow-xl"
        >
          <button
            onClick={handleClose}
            aria-label={t("close")}
            className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <h3 className="text-lg font-semibold">{t("title")}</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {t("description")}
          </p>

          <div className="mt-4 flex gap-3">
            <Button size="sm">{t("primary")}</Button>
            <Button size="sm" variant="outline">
              {t("secondary")}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

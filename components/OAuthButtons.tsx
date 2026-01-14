"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";

const MotionButton = motion(Button);

const motionProps = {
  whileHover: {
    scale: 1.03,
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  whileTap: { scale: 0.97 },
  transition: {
    type: "spring",
    stiffness: 320,
    damping: 22,
  } as const,
};

export function OAuthButtons() {
  const t = useTranslations("auth.oauth");

  return (
    <div className="grid gap-3">
      <MotionButton
        {...motionProps}
        variant="outline"
        className="h-11 rounded-xl flex items-center justify-center gap-3"
      >
        <GoogleIcon className="h-4 w-4" />
        {t("google")}
      </MotionButton>

      <MotionButton
        {...motionProps}
        variant="outline"
        className="h-11 rounded-xl flex items-center justify-center gap-3"
      >
        <GithubIcon className="h-4 w-4" />
        {t("github")}
      </MotionButton>
    </div>
  );
}

export const slideUp = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.98 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 24,
  } as const,
};

export const springButton = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: {
    type: "spring",
    stiffness: 320,
    damping: 22,
  } as const,
};

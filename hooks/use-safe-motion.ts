"use client";

import { useReducedMotion } from "framer-motion";

type EmptyObject = Record<string, never>;

export function useSafeMotion<T extends object>(motion: T): T | EmptyObject {
  const shouldReduce = useReducedMotion();
  return shouldReduce ? {} : motion;
}

"use client";

import { ReactNode } from "react";

/**
 * Lenis runs on the scroll viewport in `PageLayout` (wrapper + content refs).
 * This wrapper keeps the tree stable for layout.tsx; smooth scroll is not duplicated here.
 */
interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return <>{children}</>;
}

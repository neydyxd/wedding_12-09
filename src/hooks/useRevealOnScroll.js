import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Добавляет класс fx-in-view при появлении в зоне видимости (один раз).
 */
export function useRevealOnScroll(options = {}) {
  const ref = useRef(null);
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -6% 0px",
    once = true,
  } = options;

  const [revealed, setRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit) return;
        setRevealed(true);
        if (once) observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return {
    ref,
    revealed,
    fx: revealed ? "fx-in-view" : "",
  };
}

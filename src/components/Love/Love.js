import { useLayoutEffect, useRef } from "react";
import "./Love.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function Love() {
  const { ref: revealRef, fx } = useRevealOnScroll();
  const rootRef = useRef(null);

  const setLoveRef = (node) => {
    rootRef.current = node;
    revealRef.current = node;
  };
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const s1 = line1Ref.current;
    const s2 = line2Ref.current;
    if (!root || !s1 || !s2) return;

    let rafId = 0;

    const fit = () => {
      const maxW = root.clientWidth;
      if (maxW <= 0) return;

      let lo = 8;
      let hi = 6000;

      const widthAt = (px) => {
        root.style.setProperty("--love-fs", `${px}px`);
        return Math.max(s1.offsetWidth, s2.offsetWidth);
      };

      for (let i = 0; i < 42; i++) {
        const mid = (lo + hi) / 2;
        const w = widthAt(mid);
        if (w <= maxW) lo = mid;
        else hi = mid;
      }

      widthAt(lo);
    };

    const scheduleFit = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        fit();
      });
    };

    scheduleFit();
    const ro = new ResizeObserver(scheduleFit);
    ro.observe(root);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) scheduleFit();
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`love ${fx}`} ref={setLoveRef}>
      <h2>
        <span ref={line1Ref} className="love-line">
          LO
        </span>
      </h2>
      <h2>
        <span ref={line2Ref} className="love-line">
          VE
        </span>
      </h2>
    </div>
  );
}

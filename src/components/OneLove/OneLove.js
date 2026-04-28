import { useEffect, useState } from "react";
import oneLove from "../../assets/images/we.jpg";
import "./OneLove.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

const LINE0 = "Two hearts";
const LINE1 = "one love";
const MS_PER_CHAR = 46;
const PAUSE_BETWEEN_LINES_MS = 200;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function OneLove() {
  const { ref: sectionRef, fx, revealed } = useRevealOnScroll();
  const [typed0, setTyped0] = useState("");
  const [typed1, setTyped1] = useState("");

  useEffect(() => {
    if (!revealed) return;

    const reduced = prefersReducedMotion();
    if (reduced) {
      setTyped0(LINE0);
      setTyped1(LINE1);
      return;
    }

    let cancelled = false;
    const timers = [];
    const later = (fn, ms) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const tick0 = (i) => {
      if (cancelled) return;
      setTyped0(LINE0.slice(0, i));
      if (i < LINE0.length) {
        later(() => tick0(i + 1), MS_PER_CHAR);
      } else {
        later(() => tick1(1), PAUSE_BETWEEN_LINES_MS);
      }
    };

    const tick1 = (j) => {
      if (cancelled) return;
      setTyped1(LINE1.slice(0, j));
      if (j < LINE1.length) {
        later(() => tick1(j + 1), MS_PER_CHAR);
      }
    };

    later(() => tick0(1), 120);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [revealed]);

  const reduced = typeof window !== "undefined" && prefersReducedMotion();
  const showCaret0 =
    revealed && !reduced && typed0.length < LINE0.length;
  const showCaret1 =
    revealed &&
    !reduced &&
    typed0.length === LINE0.length &&
    typed1.length < LINE1.length;

  return (
    <section
      className={`one-love ${fx}`}
      ref={sectionRef}
      aria-label="Two hearts, one love"
    >
      <figure className="one-love__card">
        <div className="one-love__frame">
          <div className="one-love__title" aria-hidden="true">
            <div className="one-love__title-measure">
              <span className="one-love__title-line">{LINE0}</span>
              <span className="one-love__title-line one-love__title-line--shift">
                {LINE1}
              </span>
            </div>
            <div className="one-love__title-typed">
              <span className="one-love__title-line">
                {typed0}
                {showCaret0 ? (
                  <span className="one-love__caret" aria-hidden />
                ) : null}
              </span>
              <span className="one-love__title-line one-love__title-line--shift">
                {typed1}
                {showCaret1 ? (
                  <span className="one-love__caret" aria-hidden />
                ) : null}
              </span>
            </div>
          </div>
          <div className="one-love__media">
            <img
              className="one-love__photo"
              src={oneLove}
              alt="Мы вместе"
            />
            {/* <p className="one-love__tagline fx-in-view">на всю жизнь …</p> */}
          </div>
        </div>
      </figure>
    </section>
  );
}

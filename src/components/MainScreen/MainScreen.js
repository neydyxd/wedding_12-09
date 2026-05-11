import "./MainScreen.css";
import { useEffect, useRef, useState } from "react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function MainScreen() {
  const { ref, fx } = useRevealOnScroll({
    threshold: 0.06,
    rootMargin: "0px",
  });
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const secretTimerRef = useRef(null);

  const clearSecretTimer = () => {
    if (secretTimerRef.current) {
      window.clearTimeout(secretTimerRef.current);
      secretTimerRef.current = null;
    }
  };

  const startSecretTimer = () => {
    clearSecretTimer();
    secretTimerRef.current = window.setTimeout(() => {
      setIsSecretOpen(true);
      secretTimerRef.current = null;
    }, 1500);
  };

  useEffect(() => clearSecretTimer, []);

  return (
    <div className="main-screen" ref={ref}>
      <div className={`main-screen-header ${fx}`}>
        <span>любовь</span>
        <div className="main-screen-header-tags">
          <span className="main-screen-header-tags-tag">свадьба</span>
          <span>жизнь</span>
        </div>
      </div>
      <div className={`main-screen-content ${fx}`}>
        <h2 className="main-screen-content-top">
          СТЕПАН <span className="main-screen-ampersand">&</span>
        </h2>
        <h2 className="main-screen-content-bottom">ИРИНА</h2>
      </div>
      <div className={`main-screen-content-footer ${fx}`}>
        <span className="main-screen-content-footer-date">12.09.2026</span>
        <span className="main-screen-content-footer-text">
          Не существует шести или семи <br /> чудес в мире. Есть только <br />{" "}
          одно: это любовь{" "}
          <button
            className="main-screen-secret-mark"
            type="button"
            aria-label="Секретный знак"
            onPointerDown={startSecretTimer}
            onPointerUp={clearSecretTimer}
            onPointerCancel={clearSecretTimer}
            onPointerLeave={clearSecretTimer}
            onContextMenu={(event) => event.preventDefault()}
          >
            ※
          </button>
        </span>
        <a className="main-screen-content-footer-button" href="#guest-blocks">
          стать свидетелем чуда
        </a>
      </div>
      {isSecretOpen && (
        <div
          className="main-screen-secret"
          role="dialog"
          aria-modal="true"
          aria-labelledby="main-screen-secret-title"
        >
          <div className="main-screen-secret__card">
            <span className="main-screen-secret__eyebrow">секретный знак</span>
            <h3 id="main-screen-secret-title">Для самых внимательных</h3>
            <p>
              Ты нашёл маленькое послание, спрятанное с любовью. Спасибо, что
              разделяешь с нами этот день, замечаешь детали и становишься
              частью нашей истории.
            </p>
            <button
              className="main-screen-secret__button"
              type="button"
              onClick={() => setIsSecretOpen(false)}
            >
              сохраню это в тайне
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

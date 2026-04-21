import { useLayoutEffect, useRef } from "react";
import "./Location.css";
import locationPhoto from "../../assets/images/location.jpg";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

const TITLE_TEXT = "ЛЮБОВЬ СИЛЬНЕЕ ВСЕГО";

const MAP_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(
  "Оранжерея «Зименки парк», деревня Зименки, Парковая улица, 1",
)}`;

export default function Location() {
  const rootRef = useRef(null);
  const { ref: revealRef, fx } = useRevealOnScroll();
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const headlineRef = useRef(null);

  const setRootRef = (node) => {
    rootRef.current = node;
    revealRef.current = node;
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    const textEl = textRef.current;
    if (!root || !textEl) return;

    let rafId = 0;

    const fit = () => {
      const cs = getComputedStyle(root);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const maxW = root.clientWidth - padX;
      if (maxW <= 0) return;

      let lo = 8;
      let hi = 320;

      const widthAt = (px) => {
        textEl.style.fontSize = `${px}px`;
        return textEl.offsetWidth;
      };

      for (let i = 0; i < 42; i++) {
        const mid = (lo + hi) / 2;
        const w = widthAt(mid);
        if (w <= maxW) lo = mid;
        else hi = mid;
      }

      textEl.style.fontSize = `${lo}px`;
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

  useLayoutEffect(() => {
    const content = contentRef.current;
    const headline = headlineRef.current;
    if (!content || !headline) return;

    const lines = headline.querySelectorAll(".location-content__line");
    if (!lines.length) return;

    let rafId = 0;

    const fit = () => {
      const maxW = headline.clientWidth;
      if (maxW <= 0) return;

      let lo = 8;
      let hi = 640;

      const widthAt = (px) => {
        lines.forEach((el) => {
          el.style.fontSize = `${px}px`;
        });
        return Math.max(...Array.from(lines, (el) => el.offsetWidth));
      };

      for (let i = 0; i < 42; i++) {
        const mid = (lo + hi) / 2;
        const w = widthAt(mid);
        if (w <= maxW) lo = mid;
        else hi = mid;
      }

      lines.forEach((el) => {
        el.style.fontSize = `${lo}px`;
      });
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
    ro.observe(content);

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
    <div className={`location ${fx}`} ref={setRootRef}>
      <h2 className="location-title">
        <span ref={textRef} className="location-title__text">
          {TITLE_TEXT}
        </span>
      </h2>
      <div className="location-content" ref={contentRef}>
        <p className="location-content__tag">[МЕСТО]</p>
        <div className="location-content__headline" ref={headlineRef}>
          <span className="location-content__line">LOCA</span>
          <span className="location-content__line">TION</span>
        </div>

        <span className="location-content__text">
          Оранжерея &quot;Зименки парк&quot; <br /> деревня Зименки, Парковая
          улица, 1
        </span>

        <div className="location-content__media">
          <div className="location-content__photo-frame">
            <img
              className="location-content__photo"
              src={locationPhoto}
              alt="Банкетный стол в оранжерее, сервировка и гирлянды между деревьями"
            />
            <a
              className="location-content__map-btn"
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              открыть карту
            </a>
          </div>
        </div>

        <span className="location-content__text">
          Дорогиее женщины, девушки, сестры и подруги, торжество будет проходить
          на природе, поэтому просим вас позаботиться об удобной обуви, чтобы вы
          могли чувствовать себя комфортно весь день.
        </span>
      </div>
    </div>
  );
}

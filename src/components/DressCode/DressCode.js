import { useState } from "react";
import "./DressCode.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

const PALETTE = [
  { name: "терракота", color: "#B64D1E" },
  { name: "чёрный", color: "#0D0C00" },
  { name: "шоколад", color: "#402814" },
  { name: "винный", color: "#260101" },
  { name: "песочный", color: "#D9B991" },
];

const LOOKS = [
  {
    title: "терракота",
    note: "акцентный оттенок для платьев, жакетов и аксессуаров",
    image: "/images/dress-code/look-1.jpg",
  },
  {
    title: "чёрный",
    note: "лаконичная база для костюмов и вечерних образов",
    image: "/images/dress-code/look-2.jpg",
  },
  {
    title: "шоколад",
    note: "тёплые фактуры, кожа, замша и мягкие ткани",
    image: "/images/dress-code/look-3.jpg",
  },
  {
    title: "песочный",
    note: "светлая база, которая красиво поддержит осеннюю гамму",
    image: "/images/dress-code/look-4.jpg",
  },
];

export default function DressCode() {
  const { ref, fx } = useRevealOnScroll();
  const [activeLook, setActiveLook] = useState(0);
  const currentLook = LOOKS[activeLook];

  const goToPrevious = () => {
    setActiveLook((index) => (index === 0 ? LOOKS.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveLook((index) => (index === LOOKS.length - 1 ? 0 : index + 1));
  };

  return (
    <section className={`dress-code ${fx}`} ref={ref} aria-labelledby="dress-code-title">
      <div className="dress-code__intro">
        <p className="dress-code__tag">[ДРЕСС-КОД]</p>
        <h2 className="dress-code__title" id="dress-code-title">
          DRESS CODE
        </h2>
        <p className="dress-code__text">
          Будем рады, если в ваших образах появятся глубокие природные оттенки:
          терракота, чёрный, шоколадный, винный и тёплый песочный. Палитра
          поможет празднику выглядеть цельно и очень красиво на фотографиях.
        </p>
      </div>

      <div className="dress-code__palette" aria-label="Цветовая палитра дресс-кода">
        {PALETTE.map(({ name, color }) => (
          <span className="dress-code__swatch" key={name} style={{ "--swatch": color }}>
            <span>{name}</span>
          </span>
        ))}
      </div>

      <div className="dress-code__slider" aria-label="Примеры образов">
        <div className="dress-code__look">
          <div
            className="dress-code__look-image"
            style={{ "--look-image": `url("${currentLook.image}")` }}
            role="img"
            aria-label={`Фотография образа в цвете ${currentLook.title}`}
          />
          <div className="dress-code__look-caption">
            <span>{currentLook.title}</span>
            <p>{currentLook.note}</p>
          </div>
        </div>

        <div className="dress-code__controls">
          <button type="button" className="dress-code__control" onClick={goToPrevious}>
            назад
          </button>
          <div className="dress-code__dots" aria-label="Выбор образа">
            {LOOKS.map((look, index) => (
              <button
                type="button"
                className={`dress-code__dot ${index === activeLook ? "is-active" : ""}`}
                key={look.title}
                onClick={() => setActiveLook(index)}
                aria-label={`Показать образ: ${look.title}`}
                aria-current={index === activeLook ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" className="dress-code__control" onClick={goToNext}>
            вперёд
          </button>
        </div>
      </div>
    </section>
  );
}

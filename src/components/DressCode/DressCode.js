import { useRef, useState } from "react";
import "./DressCode.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import one from "../../assets/images/dress-code/1.jpg";
import two from "../../assets/images/dress-code/2.JPG";
import three from "../../assets/images/dress-code/3.JPG";
import four from "../../assets/images/dress-code/4.JPG";
import five from "../../assets/images/dress-code/5.JPG";
import six from "../../assets/images/dress-code/6.jpg";
import seven from "../../assets/images/dress-code/7.JPG";
import eight from "../../assets/images/dress-code/8.JPG";
import nine from "../../assets/images/dress-code/9.JPG";
import ten from "../../assets/images/dress-code/10.JPG";
import eleven from "../../assets/images/dress-code/11.jpg";
import twelve from "../../assets/images/dress-code/12.JPG";


const PALETTE = [
  { name: "терракота", color: "#B64D1E" },
  { name: "чёрный", color: "#0D0C00" },
  { name: "шоколад", color: "#402814" },
  { name: "винный", color: "#260101" },
  { name: "песочный", color: "#D9B991" },
];

const LOOKS = [
  {
    image: one,
  },
  {
    image: two,
  },
  {
    image: three,
  },
  {
    image: twelve,
  },
  {
    image: four,
  },
  {
    image: eleven,
  },
  {
    image: five,
  },
  {
    image: six,
  },
  {
    image: seven,
  },
  {
    image: eight,
  },
  {
    image: nine,
  },
  {
    image: ten,
  },

];

export default function DressCode() {
  const { ref, fx } = useRevealOnScroll();
  const [activeLook, setActiveLook] = useState(0);
  const swipeStartRef = useRef(null);
  const currentLook = LOOKS[activeLook];

  const goToPrevious = () => {
    setActiveLook((index) => (index === 0 ? LOOKS.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveLook((index) => (index === LOOKS.length - 1 ? 0 : index + 1));
  };

  const handleSwipeStart = (event) => {
    swipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleSwipeEnd = (event) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;

    if (!start) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35;

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  return (
    <section
      className={`dress-code ${fx}`}
      ref={ref}
      aria-labelledby="dress-code-title"
    >
      <div className="dress-code__intro">
        <p className="dress-code__tag">[ДРЕСС-КОД]</p>
        <h2 className="dress-code__title" id="dress-code-title">
          DRESS CODE
        </h2>
        <p className="dress-code__text">
          Будем рады, если в ваших образах появятся оттенки: чёрный, шоколадный,
          винный и тёплый песочный. Палитра поможет празднику выглядеть цельно и
          очень красиво на фотографиях. А оттенок терракоты можно использовать
          как акцентный.
        </p>
      </div>

      <div
        className="dress-code__palette"
        aria-label="Цветовая палитра дресс-кода"
      >
        {PALETTE.map(({ name, color }) => (
          <span
            className="dress-code__swatch"
            key={name}
            style={{ "--swatch": color }}
          >
            <span>{name}</span>
          </span>
        ))}
      </div>

      <div className="dress-code__slider" aria-label="Примеры образов">
        <div
          className="dress-code__look"
          onPointerDown={handleSwipeStart}
          onPointerUp={handleSwipeEnd}
          onPointerCancel={() => {
            swipeStartRef.current = null;
          }}
        >
          <div
            className="dress-code__look-image"
            style={{ "--look-image": `url("${currentLook.image}")` }}
            role="img"
            aria-label={`Пример образа ${activeLook + 1}`}
          />
        </div>

        <div className="dress-code__controls">
          <button
            type="button"
            className="dress-code__control"
            onClick={goToPrevious}
          >
            назад
          </button>
          <div className="dress-code__dots" aria-label="Выбор образа">
            {LOOKS.map((look, index) => (
              <button
                type="button"
                className={`dress-code__dot ${index === activeLook ? "is-active" : ""}`}
                key={index}
                onClick={() => setActiveLook(index)}
                aria-label={`Показать пример образа ${index + 1}`}
                aria-current={index === activeLook ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className="dress-code__control"
            onClick={goToNext}
          >
            вперёд
          </button>
        </div>
      </div>
    </section>
  );
}

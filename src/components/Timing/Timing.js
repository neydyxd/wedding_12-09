import "./Timing.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

const EVENTS = [
  { time: "15:30", label: "сбор гостей" },
  { time: "16:00", label: "свадебная церемония" },
  { time: "16:30", label: "праздничный ужин" },
];

export default function Timing() {
  const { ref, fx } = useRevealOnScroll();

  return (
    <section
      className={`timing ${fx}`}
      ref={ref}
      aria-labelledby="timing-title"
    >
      <header className="timing__head">
        <p className="timing__tag">[ТАЙМИНГ]</p>
        <h2 id="timing-title" className="timing__title">
          Расписание дня
        </h2>
      </header>

      <div className="timing__panel">
        <ol className="timing__list">
          {EVENTS.map(({ time, label }, index) => (
            <li
              key={time}
              className="timing__item"
              style={{ "--timing-stagger": `${0.06 + index * 0.08}s` }}
            >
              <div className="timing__rail" aria-hidden="true">
                <span className="timing__dot" />
              </div>
              <div className="timing__body">
                <time className="timing__time" dateTime={time}>
                  {time}
                </time>
                <p className="timing__label">{label}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

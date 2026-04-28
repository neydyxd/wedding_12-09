import "./Details.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function Details() {
  const { ref, fx } = useRevealOnScroll();

  return (
    <section className={`details ${fx}`} ref={ref} aria-labelledby="details-title">
      <div className="details__card">
        <span className="details__letter" aria-hidden="true">
          D
        </span>

        <div className="details__headline">
          <p className="details__tag">[ДЕТАЛИ]</p>
          <h2 className="details__title" id="details-title">
            DETAILS
          </h2>
        </div>

        <p className="details__text">
          Мы догадываемся, что после получения приглашения у вас может появиться
          ряд вопросов.
        </p>
      </div>
    </section>
  );
}

import amorantImage from "../../assets/images/amorant.jpg";
import "./WeddingPoster.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function WeddingPoster() {
  const { ref, fx } = useRevealOnScroll();

  return (
    <section
      id="wedding-poster"
      className={`wedding-poster ${fx}`}
      ref={ref}
      aria-label="Wedding poster"
    >
      <div className="wedding-poster__text-back" aria-hidden="true">
        <div className="wedding-poster__word wedding-poster__word--above">
          <span className="wedding-poster__line wedding-poster__line--crop-right">
            <span className="wedding-poster__line-text">WED</span>
          </span>
          <span className="wedding-poster__line wedding-poster__line--crop-left">
            <span className="wedding-poster__line-text">DING</span>
          </span>
        </div>
        <div className="wedding-poster__word wedding-poster__word--below">
          <span className="wedding-poster__line wedding-poster__line--crop-right">
            <span className="wedding-poster__line-text">WED</span>
          </span>
          <span className="wedding-poster__line wedding-poster__line--crop-left">
            <span className="wedding-poster__line-text">DING</span>
          </span>
        </div>
      </div>
      <img
        className="wedding-poster__photo"
        src={amorantImage}
        alt="Жених и невеста"
      />
    </section>
  );
}

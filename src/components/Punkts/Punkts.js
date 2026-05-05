import "./Punkts.css";
import amorantImage from "../../assets/images/amorant.jpg";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function Punkts() {
  const { ref, fx } = useRevealOnScroll();

  return (
    <section
      className={`punkts ${fx}`}
      ref={ref}
      aria-label="Пожелания гостям"
    >
      <div
        className="punkts__banner"
        style={{ "--punkts-banner": `url(${amorantImage})` }}
        role="img"
        aria-hidden="true"
      />
      <div className="punkts__content">
        <div className="punkts__content-item">
          <p className="punkts__content-item-number">01</p>
          <p className="punkts__content-item-text">
            Будем благодарны, если вы воздержитесь от криков &quot;Горько&quot; на
            празднике, ведь поцелуй — это знак выражения чувств, и он не может
            быть по заказу.
          </p>
        </div>
        <div className="punkts__content-item">
          <p className="punkts__content-item-number">02</p>
          <p className="punkts__content-item-text">
            Мы с нетерпением ждём возможности разделить с вами этот особенный
            день! Ваше присутствие — самый ценный подарок для нас.
            <br />
            <br />
            Если вы захотите поздравить нас чем-то ещё, мы будем рады вашему
            вкладу в наш общий путь: денежный подарок поможет воплотить в жизнь
            наши мечты и планы.
          </p>
        </div>
      </div>
    </section>
  );
}

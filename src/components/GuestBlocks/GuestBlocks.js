import "./GuestBlocks.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import { GUEST_CHAT_URL } from "./guestLinks";
import GuestSurveyForm from "./GuestSurveyForm";

function GuestAction({ href, children }) {
  if (href && href.trim()) {
    return (
      <a
        className="guest-blocks__action"
        href={href.trim()}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <span className="guest-blocks__action guest-blocks__action--pending">
      Скоро здесь появится ссылка
    </span>
  );
}

export default function GuestBlocks() {
  const { ref, fx } = useRevealOnScroll();

  return (
    <section
      id="guest-blocks"
      className={`guest-blocks ${fx}`}
      ref={ref}
      aria-label="Чат и анкета для гостей"
    >
      <div className="guest-blocks__grid">
        <article className="guest-blocks__card guest-blocks__card--chat">
          <p className="guest-blocks__tag">[ЧАТ]</p>
          <h2 className="guest-blocks__title">Чат для гостей</h2>
          <p className="guest-blocks__text">
            Здесь можно задать вопросы, договориться о трансфере и быть на
            связи перед праздником.
          </p>
          <GuestAction href={GUEST_CHAT_URL}>Открыть чат</GuestAction>
        </article>

        <article className="guest-blocks__card guest-blocks__card--form">
          <p className="guest-blocks__tag">[АНКЕТА]</p>
          <h2 className="guest-blocks__title">Анкета для гостей</h2>
          <p className="guest-blocks__text guest-blocks__text--form-intro">
            Заполните поля ниже — так нам проще учесть ваши пожелания по
            празднику. Обязательные пункты отмечены звёздочкой.
          </p>
          <GuestSurveyForm />
        </article>
      </div>
    </section>
  );
}

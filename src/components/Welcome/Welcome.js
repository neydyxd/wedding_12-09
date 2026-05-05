import "./Welcome.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function Welcome() {
  const { ref, fx } = useRevealOnScroll();

  return (
    <div className={`welcome ${fx}`} ref={ref}>
      <h2 className="welcome-title">
        Дорогие <br /> родные и близкие!
      </h2>
      <span>
        Мы давно ждали момента, когда сможем разделить с вами самый важный и
        счастливый день в нашей жизни.
      </span>
      <span>
        Совсем скоро состоится наша свадьба! Мы рады пригласить вас стать
        свидетелями этого торжества и разделить с нами самые яркие моменты!
      </span>
    </div>
  );
}

import "./MainScreen.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function MainScreen() {
  const { ref, fx } = useRevealOnScroll({
    threshold: 0.06,
    rootMargin: "0px",
  });

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
        <span className="main-screen-content-footer-text">Не существует шести или семи <br /> чудес в мире. Есть только <br /> одно: это любовь.</span>
        <span className="main-screen-content-footer-button"> стать свидетелем чуда</span>
      </div>
    </div>
  );
}

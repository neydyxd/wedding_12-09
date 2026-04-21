import "./Timing.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export default function Timing() {
  const { ref, fx } = useRevealOnScroll();

  return (
    <div className={`timing ${fx}`} ref={ref}>
      <h2 className="timing-title">ТАЙМИНГ</h2>
      <div className="timing-content">
        <div className="timing-content-item">
          <h3>14:30</h3>
          <p>сбор гостей</p>
        </div>
        <div className="timing-content-item">
          <h3>15:00</h3>
          <p>свадебная церемония</p>
        </div>
        <div className="timing-content-item">
          <h3>17:00</h3>
          <p>праздничный ужин</p>
        </div>
      </div>
    </div>
  );
}

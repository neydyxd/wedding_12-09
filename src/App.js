import "./App.css";
import Love from "./components/Love/Love";
import MainScreen from "./components/MainScreen/MainScreen";
import OneLove from "./components/OneLove/OneLove";
import Welcome from "./components/Welcome/Welcome";
import Timing from "./components/Timing/Timing";
import Location from "./components/Location/Location";

function App() {
  return (
    <>
      <div className="container">
        <MainScreen />
        <Love />
        <Welcome />
        <OneLove />
        <Timing />
        <Location />
      </div>
    </>
  );
}

export default App;

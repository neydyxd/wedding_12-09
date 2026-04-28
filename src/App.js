import "./App.css";
import Love from "./components/Love/Love";
import MainScreen from "./components/MainScreen/MainScreen";
import OneLove from "./components/OneLove/OneLove";
import Welcome from "./components/Welcome/Welcome";
import Timing from "./components/Timing/Timing";
import Location from "./components/Location/Location";
import DressCode from "./components/DressCode/DressCode";
import Details from "./components/Details/Details";
import Punkts from "./components/Punkts/Punkts";
import WeddingPoster from "./components/WeddingPoster/WeddingPoster";
import GuestBlocks from "./components/GuestBlocks/GuestBlocks";

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
        <DressCode />
        <Details />
        <Punkts />
        <WeddingPoster />
        <GuestBlocks />
      </div>
    </>
  );
}

export default App;

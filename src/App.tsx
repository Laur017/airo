import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Settings from "./components/Settings/Settings";
import Onboarding from "./components/Settings/Onboarding";

function App() {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const handleOnboarding = (bool: boolean) => {
    setShowOnboarding(bool);
  };
  const handleSettings = (bool: boolean) => {
    setShowSettings(bool);
  };
  return (
    <div className="app">
      <Header handleSettings={handleSettings} />
      <div className="main">
        <Map />
        {showSettings && (
          <Settings
            handleOnboarding={handleOnboarding}
            handleSettings={handleSettings}
          />
        )}
      </div>

      {showOnboarding && <Onboarding handleOnboarding={handleOnboarding} />}
    </div>
  );
}
export default App;

import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Settings from "./components/Settings/Settings";
import Onboarding from "./components/Settings/Onboarding";

function App() {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const handleOnboarding = (bool: boolean) => {
    setShowOnboarding(bool);
  };
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Settings handleOnboarding={handleOnboarding} />
      </div>

      {showOnboarding && <Onboarding handleOnboarding={handleOnboarding} />}
    </div>
  );
}
export default App;

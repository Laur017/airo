import { useEffect, useState } from "react";
import "./App.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Settings from "./components/Settings/Settings";
import Onboarding from "./components/Settings/Onboarding";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [user, setUser] = useState<any>([]);
  const [profile, setProfile] = useState<any[] | null>([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      return setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  const handleOnboarding = (bool: boolean) => {
    setShowOnboarding(bool);
  };
  const handleSettings = (bool: boolean) => {
    setShowSettings(bool);
  };
  return (
    <div className="app">
      <Header
        handleSettings={handleSettings}
        profile={profile}
        open={showSettings}
      />
      <div className="main">
        <Map />
        {showSettings && (
          <Settings
            handleOnboarding={handleOnboarding}
            handleSettings={handleSettings}
            login={login}
            logout={logOut}
            profile={profile}
          />
        )}
        <Footer />
      </div>

      {showOnboarding && <Onboarding handleOnboarding={handleOnboarding} />}
    </div>
  );
}
export default App;

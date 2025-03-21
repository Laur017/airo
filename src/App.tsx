import { useEffect, useState } from "react";
import "./App.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Settings from "./components/Settings/Settings";
import Onboarding from "./components/Settings/Onboarding";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

function App() {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [user, setUser] = useState<any>([]);
  const [profile, setProfile] = useState<any[]>([]);
  const [updateMap, setUpdateMap] = useState<number>(0);

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      return setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const data = window.localStorage.getItem("MY_PROFILE");
    if (data !== null) setProfile(JSON.parse(data));
  }, []);

  useEffect(() => {
    console.log("action");
    window.localStorage.setItem("MY_PROFILE", JSON.stringify(profile));
  }, [profile]);

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
          navigate(`/${res.data.id}`);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    window.localStorage.removeItem("MY_PROFILE");
    googleLogout();
    setProfile([]);
    navigate("/");
    window.location.reload();
  };
  const handleOnboarding = (bool: boolean) => {
    setShowOnboarding(bool);
  };
  const handleSettings = (bool: boolean) => {
    setShowSettings(bool);
    setUpdateMap(updateMap + 1);
    console.log(bool ? "showing" : "hidding");
  };

	const { id } = useParams();
	const [locations, setLocations] = useState<string[]>([]);
	const [data, setData] = useState<any>('');

	useEffect(() => {
		if (!id) return;

		const colRef = collection(firestore, id.toString());
		const getAllDevices = async () => {
			try {
				const data = await getDocs(colRef);
				const allData = data.docs
					.map((doc) => {
						const docData = doc.data();
						return docData && typeof docData === 'object'
							? { ...docData, id: doc.id }
							: null;
					})
					.filter((el: any) => el.type === 'device');
				setLocations(allData.map((el: any) => el.deviceLocation));
				setData(allData);
			} catch (error) {
				console.error('Error fetching devices:', error);
			}
		};
		getAllDevices();
	}, [id, updateMap]);

	return (
		<div className='app'>
			<Header
				handleSettings={handleSettings}
				profile={profile}
				open={showSettings}
				data={data}
			/>
			<div className='main'>
				<Map
					locations={locations}
					data={data}
				/>
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

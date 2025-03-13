import SettingsImage from "../../assets/settings-img.png";
import Login from "./Login";

interface SettingsParams {
  handleOnboarding: (val: boolean) => void;
  handleSettings: (val: boolean) => void;
  login: any;
}
export default function Settings({
  handleOnboarding,
  handleSettings,
  login,
}: SettingsParams) {
  return (
    <div className="settings">
      <div className="settings__top">
        <h2>Settings</h2>
        <span onClick={() => handleSettings(false)}>
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0867 5.65662L11.3137 10.4296L6.54074 5.65662C6.29665 5.41254 5.90094 5.41254 5.65685 5.65662C5.41277 5.90071 5.41277 6.29642 5.65685 6.54051L10.4298 11.3135L5.65685 16.0864C5.41277 16.3305 5.41277 16.7262 5.65685 16.9703C5.90094 17.2144 6.29665 17.2144 6.54074 16.9703L11.3137 12.1974L16.0867 16.9703C16.3308 17.2144 16.7265 17.2144 16.9706 16.9703C17.2146 16.7262 17.2146 16.3305 16.9706 16.0864L12.1976 11.3135L16.9706 6.54051C17.2146 6.29642 17.2146 5.90071 16.9706 5.65662C16.7265 5.41254 16.3308 5.41254 16.0867 5.65662Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      <div className="settings__bottom">
        <img src={SettingsImage} alt="Settings image" />
        <p>
          Please Log In via Gmail SSO account to have possibility to manage
          personal devices and recieve notifications.
        </p>
        <button className="main-btn">
          <Login login={login} />
          <p>Sign In</p>
        </button>
        <a onClick={() => handleOnboarding(true)}>About this application →</a>
      </div>
    </div>
  );
}

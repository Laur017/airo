import { useState } from "react";
import AddNew from "../Forms/AddNew";

interface DevicesProps {
  profile: any;
  signout: any;
  handleSettings: (val: boolean) => void;
}

export default function Devices({
  profile,
  signout,
  handleSettings,
}: DevicesProps) {
  const [openedForm, setOpenedForm] = useState<boolean>(false);

  const handleForm = (bool: boolean) => {
    setOpenedForm(bool);
    console.log(bool);
    bool ? handleSettings(false) : handleSettings(true);
  };
  return !openedForm ? (
    <div className="devices">
      <div className="devices-top">
        <div className="devices-top__user">
          <img src={profile.picture} alt={`${profile.name} picture`} />
          <div>
            <h2>{profile.name}</h2>
            <p>
              @
              {profile.given_name[0].toLowerCase() +
                profile.family_name.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="devices-top__content"></div>
        <p onClick={() => setOpenedForm(true)}>+ Add new</p>
      </div>
      <div className="devices-bottom">
        <div>
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="24 / security / shield-ok">
                <path
                  id="icon"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 23C6 20.3271 3 17.6604 3 15V5C3 4.23241 3.2946 4.05401 4.10993 3.56029L4.10993 3.56029C4.35679 3.4108 4.65139 3.23241 5 3C5.16179 2.89214 8.56321 1 12 1C14.9952 1 17.5 2 19 3C19.3486 3.23241 19.6432 3.4108 19.8901 3.56029C20.7054 4.05401 21 4.23241 21 5C21.0197 5.21723 21.01 9.83711 21.0038 12.7947C21.0017 13.8033 21 14.6186 21 15C21 17.6667 18 20.3333 12 23ZM19 15C19 14.7697 19.0006 14.3838 19.0018 13.7547L19.0059 11.8014C19.0072 11.1695 19.0082 10.6272 19.009 10.1098C19.0127 7.87764 19.0117 5.96182 19.0096 5.36928L18.8722 5.28403C18.5488 5.08342 18.1274 4.82194 17.8906 4.6641C16.4143 3.67992 14.2602 3 12 3C9.83809 3 7.02864 4.05128 6.1094 4.6641C5.87264 4.82194 5.45117 5.08341 5.1278 5.28402L5.12779 5.28403L5 5.36333V15C5 16.5085 7.22911 18.5687 12.0009 20.802C16.7722 18.5737 19 16.5142 19 15ZM15.2929 8.29289L11 12.5858L8.70711 10.2929L7.29289 11.7071L11 15.4142L16.7071 9.70711L15.2929 8.29289Z"
                  fill="white"
                />
              </g>
            </svg>
          </span>
          <p>Privacy</p>
        </div>
        <div>
          <span>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.3062 14.9157L29.7955 18.6258H16.7712V21.1493H29.7955L26.3062 24.8594L28.1458 26.5906L34.4482 19.8876L28.1458 13.1847L26.3062 14.9157Z"
                fill="white"
              />
              <path
                d="M23.6688 23.4752H21.4688V26.5752H10.2V13.2H21.4688V16.3H23.6688V11H8V28.7752H23.6688V23.4752Z"
                fill="white"
              />
            </svg>
          </span>
          <p onClick={signout}>Sign Out</p>
        </div>
      </div>
    </div>
  ) : (
    <AddNew closeForm={handleForm} />
  );
}

import { useEffect, useState } from "react";
import AddNew from "../Forms/AddNew";

import { firestore } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";

interface DevicesProps {
  profile: any;
  signout: any;
  handleSettings: (val: boolean) => void;
  handleSelected: (val: string, arr: any[]) => void;
}

export default function Devices({
  profile,
  signout,
  handleSettings,
  handleSelected,
}: DevicesProps) {
  const { id } = useParams();
  const [openedForm, setOpenedForm] = useState<boolean>(false);
  const [typeSuccesMessage, setTypeSuccessMessage] = useState<0 | 1 | 2>(0);
  const [devices, setDevices] = useState<any>([]);
  const [gateways, setGateways] = useState<any>([]);
  const [filteredDevices, setFilteredDevices] = useState<any>(null);

  const colRef = collection(firestore, id ? id.toString() : "");

  useEffect(() => {
    const getAllDevices = async () => {
      const data = await getDocs(colRef);
      setDevices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAllDevices();
  }, [openedForm]);

  useEffect(() => {
    console.log("fetched");
    const filteredGateways = devices.filter(
      (el: {
        gatewayKey: string;
        type: string;
        gatewayName: string;
        id: string;
      }) => el.type === "gateway"
    );

    const almostFilteredDevices = devices.filter(
      (el: {
        deviceName: string;
        deviceDescription: string;
        deviceLocation: string;
        type: string;
        gatewaySelected: string;
        id: string;
      }) => el.type === "device"
    );

    setGateways(filteredGateways);
    setFilteredDevices(almostFilteredDevices);
  }, [devices]);

  const handleForm = (bool: boolean, typeClose: 0 | 1 | 2) => {
    setOpenedForm(bool);
    bool ? handleSettings(false) : handleSettings(true);
    setTypeSuccessMessage(typeClose);
    setTimeout(
      () => {
        setTypeSuccessMessage(0);
      },
      typeClose === 2 ? 5000 : 3000
    );
  };

  const AllDevices = devices.map((element: any) => (
    <div
      className="device-card"
      key={element.id}
      onClick={() => {
        handleSelected(
          element.gatewayName,
          filteredDevices.filter(
            (el: any) => el.gatewaySelected === element.gatewayName
          )
        );
      }}
    >
      <div className="device-card__left">
        <span>
          {element.type === "gateway" ? (
            <svg
              width="30"
              height="32"
              viewBox="0 0 30 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3751 15.0625C23.8933 15.0625 24.3126 14.6432 24.3126 14.125C24.3126 8.43871 19.6864 3.75 14 3.75C8.31371 3.75 3.6875 8.43871 3.6875 14.125C3.6875 14.6432 4.10681 15.0625 4.625 15.0625C5.14319 15.0625 5.56251 14.6432 5.56251 14.125C5.56251 9.47233 9.34733 5.62501 14 5.62501C18.6527 5.62501 22.4376 9.47233 22.4376 14.125C22.4376 14.6432 22.8569 15.0625 23.3751 15.0625Z"
                fill="white"
              />
              <path
                d="M14 7.5C10.3818 7.5 7.4375 10.5068 7.4375 14.125C7.4375 14.6432 7.85681 15.0625 8.375 15.0625C8.89319 15.0625 9.3125 14.6432 9.3125 14.125C9.3125 11.5404 11.4154 9.375 14 9.375C16.5846 9.375 18.6875 11.5404 18.6875 14.125C18.6875 14.6432 19.1068 15.0625 19.625 15.0625C20.1432 15.0625 20.5625 14.6432 20.5625 14.125C20.5625 10.5068 17.6182 7.5 14 7.5Z"
                fill="white"
              />
              <path
                d="M27.1251 15.0626C27.6433 15.0626 28.0626 14.6432 28.0626 14.1251C28.0626 6.37053 21.7546 0 14.0001 0C6.24552 0 -0.0625 6.37053 -0.0625 14.1251C-0.0625 14.6432 0.356814 15.0626 0.875004 15.0626C1.39319 15.0626 1.81251 14.6432 1.81251 14.1251C1.81251 7.40503 7.28003 1.87501 14.0001 1.87501C20.7201 1.87501 26.1876 7.40503 26.1876 14.1251C26.1876 14.6432 26.6069 15.0626 27.1251 15.0626Z"
                fill="white"
              />
              <path
                d="M8.04542 31.9406C8.53067 32.1182 9.06992 31.8774 9.25298 31.3922L9.72811 30.0626H18.2718L18.747 31.3921C18.9269 31.8721 19.463 32.1223 19.9546 31.9405C20.4389 31.7583 20.6843 31.2181 20.503 30.733L15.2403 16.6365C16.1677 16.1762 16.8125 15.2286 16.8125 14.125C16.8125 12.5741 15.5508 11.25 13.9999 11.25C12.4491 11.25 11.1874 12.5741 11.1874 14.125C11.1874 15.2287 11.8322 16.1763 12.7596 16.6365L7.49691 30.733C7.31573 31.2182 7.5611 31.7584 8.04542 31.9406ZM10.4312 28.1876L11.1342 26.3126H16.8659L17.5689 28.1876H10.4312ZM12.5403 22.5625H15.4597L16.1627 24.4376H11.8372L12.5403 22.5625ZM13.2434 20.6875L14 18.6697L14.7566 20.6875H13.2434Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.1875 17.8126V16.625C29.1875 15.4028 28.4037 14.3608 27.3125 13.9738V2.875C27.3125 2.35725 26.8927 1.9375 26.375 1.9375C25.8573 1.9375 25.4375 2.35725 25.4375 2.875V13.9738C24.3463 14.3608 23.5625 15.4028 23.5625 16.625V17.8126H8.4375V16.625C8.4375 15.4028 7.65369 14.3608 6.5625 13.9738V2.875C6.5625 2.35725 6.14275 1.9375 5.625 1.9375C5.10725 1.9375 4.6875 2.35725 4.6875 2.875V13.9738C3.59631 14.3608 2.8125 15.4028 2.8125 16.625V17.8126C1.26169 17.8126 0 19.0742 0 20.625V26.2501C0 27.5749 0.921062 28.6879 2.15625 28.9844V29.125C2.15625 29.6427 2.576 30.0625 3.09375 30.0625C3.6115 30.0625 4.03125 29.6427 4.03125 29.125V29.0625H27.9688V29.125C27.9688 29.6427 28.3885 30.0625 28.9062 30.0625C29.424 30.0625 29.8438 29.6427 29.8438 29.125V28.9844C31.0789 28.6879 32 27.5748 32 26.2501V20.625C32 19.0742 30.7383 17.8126 29.1875 17.8126ZM25.4375 16.625C25.4375 16.1081 25.8581 15.6875 26.375 15.6875C26.8919 15.6875 27.3125 16.1081 27.3125 16.625V17.8125H25.4375V16.625ZM4.6875 16.625C4.6875 16.1081 5.10806 15.6875 5.625 15.6875C6.14194 15.6875 6.5625 16.1081 6.5625 16.625V17.8125H4.6875V16.625ZM30.125 26.2501C30.125 26.767 29.7044 27.1875 29.1875 27.1875H2.8125C2.29556 27.1875 1.875 26.7669 1.875 26.2501V20.625C1.875 20.1081 2.29556 19.6876 2.8125 19.6876H29.1875C29.7044 19.6876 30.125 20.1081 30.125 20.625V26.2501Z"
                fill="white"
              />
              <path
                d="M4.6875 22.5C4.17112 22.5 3.75 22.9212 3.75 23.4375C3.75 23.9539 4.17112 24.375 4.6875 24.375C5.20388 24.375 5.625 23.9539 5.625 23.4375C5.62506 22.9212 5.20388 22.5 4.6875 22.5Z"
                fill="white"
              />
              <path
                d="M8.43751 22.5C7.92113 22.5 7.5 22.9212 7.5 23.4375C7.5 23.9539 7.92113 24.375 8.43751 24.375C8.95388 24.375 9.37501 23.9539 9.37501 23.4375C9.37501 22.9212 8.95388 22.5 8.43751 22.5Z"
                fill="white"
              />
              <path
                d="M12.1875 22.5C11.6711 22.5 11.25 22.9212 11.25 23.4375C11.25 23.9539 11.6711 24.375 12.1875 24.375C12.7039 24.375 13.125 23.9539 13.125 23.4375C13.125 22.9212 12.7039 22.5 12.1875 22.5Z"
                fill="white"
              />
              <path
                d="M27.3125 22.5H17.4375C16.9197 22.5 16.5 22.9197 16.5 23.4375C16.5 23.9553 16.9197 24.375 17.4375 24.375H27.3125C27.8302 24.375 28.25 23.9553 28.25 23.4375C28.25 22.9197 27.8302 22.5 27.3125 22.5Z"
                fill="white"
              />
            </svg>
          )}
        </span>
      </div>
      <div className="device-card__right">
        <h2>
          {element.type === "gateway"
            ? element.gatewayName
            : element.deviceName}
        </h2>
        <p>
          {element.type === "gateway"
            ? "Iasi, Romania"
            : element.deviceLocation}
        </p>
      </div>
    </div>
  ));

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
        <div className="devices-top__content">{AllDevices}</div>
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

      <div
        className={`success-notification ${
          typeSuccesMessage === 1 ? "success-notification-active" : ""
        }`}
      >
        <div>
          <span>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="17"
                fill="#F7F8F9"
                stroke="#D5DDE0"
                stroke-width="0.2125"
              />
              <path
                d="M12.6167 19.4609L17.0367 22.8167L23.6667 13.75"
                stroke="#6202EE"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <h3>Success!</h3>
        </div>
        <p>The item was added.</p>
      </div>

      <div
        className={`no-success-notification ${
          typeSuccesMessage === 2 ? "success-notification-active" : ""
        }`}
      >
        <div>
          <span>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="17"
                fill="#F7F8F9"
                stroke="#D5DDE0"
                stroke-width="0.2125"
              />
              <path
                d="M20.8071 21.3727L18.4256 18.99L16.0441 21.3727C15.9647 21.4515 15.8574 21.4958 15.7455 21.4958C15.6336 21.4958 15.5263 21.4515 15.447 21.3727L15.1493 21.0748C15.1099 21.0359 15.0786 20.9895 15.0572 20.9384C15.0359 20.8872 15.0249 20.8324 15.0249 20.777C15.0249 20.7216 15.0359 20.6667 15.0572 20.6156C15.0786 20.5644 15.1099 20.5181 15.1493 20.4791L17.5308 18.0965L15.1493 15.7139C15.1099 15.6749 15.0786 15.6285 15.0572 15.5774C15.0359 15.5263 15.0249 15.4715 15.0249 15.416C15.0249 15.3606 15.0359 15.3058 15.0572 15.2546C15.0786 15.2035 15.1099 15.1571 15.1493 15.1182L15.447 14.8204C15.486 14.7809 15.5326 14.7496 15.5838 14.7282C15.635 14.7068 15.69 14.6958 15.7455 14.6958C15.801 14.6958 15.856 14.7068 15.9072 14.7282C15.9585 14.7496 16.005 14.7809 16.0441 14.8204L18.4256 17.203L20.8071 14.8204C20.8462 14.7809 20.8928 14.7496 20.944 14.7282C20.9952 14.7068 21.0502 14.6958 21.1057 14.6958C21.1612 14.6958 21.2162 14.7068 21.2674 14.7282C21.3187 14.7496 21.3652 14.7809 21.4043 14.8204L21.7019 15.1182C21.7807 15.1973 21.8249 15.3044 21.8249 15.416C21.8249 15.5277 21.7807 15.6348 21.7019 15.7139L19.3204 18.0965L21.7019 20.4791C21.7807 20.5582 21.8249 20.6653 21.8249 20.777C21.8249 20.8886 21.7807 20.9957 21.7019 21.0748L21.4043 21.3727C21.3249 21.4515 21.2176 21.4958 21.1057 21.4958C20.9938 21.4958 20.8865 21.4515 20.8071 21.3727Z"
                fill="#9E00D6"
              />
            </svg>
          </span>
          <h3>Oops!</h3>
        </div>
        <p>The item wasn't added. Try again.</p>
        <button className="try-again-btn" onClick={() => setOpenedForm(true)}>
          <p>Try again</p>
        </button>
      </div>
    </div>
  ) : (
    <AddNew closeForm={handleForm} gateways={gateways} />
  );
}

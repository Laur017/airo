import { useState } from "react";
import GatewayForm from "./GatewayForm";
import DeviceForm from "./DeviceForm";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";

interface AddNewProps {
  closeForm: (val: boolean, typeMessage: 0 | 1 | 2) => void;
  gateways: any;
}
export default function AddNew({ closeForm, gateways }: AddNewProps) {
  const { id } = useParams();
  const [addType, setAddType] = useState<"gateway" | "device">("gateway");
  const ref = collection(firestore, id ? id.toString() : "undefined");
  const [gatewayName, setGatewayName] = useState<string>("");
  const [gatewayKey, setGatewayKey] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceDescription, setDeviceDescription] = useState<string>("");
  const [gatewaySelected, setGatewaySelected] = useState<string>("");
  const [deviceLocation, setDeviceLocation] = useState<string>("");
  const [deviceAirQuality, setDeviceAirQuality] = useState<any[]>([]);

  const handleForm = async () => {
    console.log("clicked add form");
    let properData = true;
    try {
      let data = {};
      if (addType === "gateway") {
        if (gatewayName.length < 1 || gatewayKey.length < 1) {
          properData = false;
        }
        data = {
          type: addType,
          gatewayName: gatewayName,
          gatewayKey: gatewayKey,
        };
      } else if (addType === "device") {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?`,
            {
              params: {
                q: deviceLocation,
                format: "json",
                addressdetails: 1,
                limit: 1,
              },
            }
          );
          if (response.data.length < 1) {
            properData = false;
            closeForm(false, 2);
          }
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
              params: {
                q: deviceLocation,
                format: "json",
                addressdetails: 1,
                limit: 1,
              },
            }
          );

          let lat;
          let lon;
          let url: string;

          if (response.data.length > 0) {
            console.log("aici ar trebui sa am latitudinea si longitudinea");
            lat = res.data[0].lat;
            lon = res.data[0].lon;
            url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${
              import.meta.env.VITE_API_KEY
            }`;
            if (lat && lon) {
              const resp = await axios.get(url);
              console.log(resp.data.status);

              if (resp.data.status === "ok") {
                console.log("resp data data");
                console.log(resp.data.data);
              }
            }
          }

          data = {
            type: addType,
            deviceName: deviceName,
            deviceDescription: deviceDescription,
            gatewaySelected: gatewaySelected,
            deviceLocation: deviceLocation,
            deviceCoords: [lat, lon],
          };
        } catch (error) {
          properData = false;
          console.error("Error getting coordinates:", error);
          return null;
        }
      }

      setGatewayName("");
      setGatewayKey("");
      setDeviceName("");
      setDeviceDescription("");
      setGatewaySelected("");
      setDeviceLocation("");

      if (properData) {
        addDoc(ref, data);
        closeForm(false, 1);
      } else {
        closeForm(false, 2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormInputs = (inpType: string, val: string) => {
    if (inpType === "gatewayName") {
      setGatewayName(val);
    } else if (inpType === "gatewayKey") {
      setGatewayKey(val);
    } else if (inpType === "deviceName") {
      setDeviceName(val);
    } else if (inpType === "deviceDescription") {
      setDeviceDescription(val);
    } else if (inpType === "gatewaySelected") {
      setGatewaySelected(val);
    } else if (inpType === "deviceLocation") {
      setDeviceLocation(val);
    }
  };

  return (
    <div className="addNew">
      <div className="addNew-card">
        <span onClick={() => closeForm(false, 0)}>
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
        <h3>Add New</h3>
        <div className="addNew-card__type">
          <button
            className={`type-btn${addType === "gateway" ? "-active" : ""}`}
            onClick={() => setAddType("gateway")}
          >
            <p>Gateway</p>
          </button>
          <button
            className={`type-btn${addType === "device" ? "-active" : ""}`}
            onClick={() => setAddType("device")}
          >
            <p>Device</p>
          </button>
        </div>

        {addType === "gateway" ? (
          <GatewayForm
            gatewayName={gatewayName}
            gatewayKey={gatewayKey}
            handleFormInputs={handleFormInputs}
          />
        ) : (
          <DeviceForm
            deviceName={deviceName}
            deviceDescription={deviceDescription}
            deviceLocation={deviceLocation}
            handleFormInputs={handleFormInputs}
            gateways={gateways}
          />
        )}

        <div className="addNew-card__btns">
          <button className="add-btn" onClick={handleForm}>
            <p>Add {addType}</p>
          </button>
          <button className="cancel-btn" onClick={() => closeForm(false, 0)}>
            <p>Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
}

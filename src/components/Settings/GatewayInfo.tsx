import ProgressBar from "../PopupInfo/ProgressBar";

interface GatewayFormProps {
  name: string;
  handleSelected: (val: string, arr: any[]) => void;
  selectedDevices: any[];
}

export default function GatewayInfo({
  name,
  handleSelected,
  selectedDevices,
}: GatewayFormProps) {
  const Devices = selectedDevices.map((el: any) => {
    console.log(selectedDevices);
    return (
      <div className="gateway-device-card">
        <div className="gateway-device-card__top">
          <ProgressBar
            value={el.deviceAirData?.aqi}
            maxRange={10}
            title={"PM2.5"}
            height={75}
            width={75}
            colorStart={"#ACF254"}
            colorEnd={"#20944E"}
          />
          <div className="gateway-device-card__top-right">
            <h2>{el.deviceName}</h2>
            <p>
              <span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0C3.60363 0 1.65405 1.94958 1.65405 4.34592C1.65405 7.31986 5.54325 11.6858 5.70883 11.8702C5.86437 12.0434 6.13591 12.0431 6.29116 11.8702C6.45675 11.6858 10.3459 7.31986 10.3459 4.34592C10.3459 1.94958 8.39634 0 6 0ZM6 6.53248C4.79433 6.53248 3.81347 5.55159 3.81347 4.34592C3.81347 3.14025 4.79435 2.15939 6 2.15939C7.20565 2.15939 8.18651 3.14027 8.18651 4.34594C8.18651 5.55162 7.20565 6.53248 6 6.53248Z"
                    fill="white"
                  />
                </svg>
              </span>
              {el.deviceLocation}
            </p>
            <p>
              <span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1_12715)">
                    <path
                      d="M1.80005 8.45037V10.2004H3.55007L8.71379 5.03664L6.96377 3.28662L1.80005 8.45037Z"
                      fill="white"
                    />
                    <path
                      d="M10.0635 3.02744L8.97383 1.93777C8.79183 1.75577 8.49549 1.75577 8.31348 1.93777L7.45947 2.79178L9.20949 4.5418L10.0635 3.68779C10.2455 3.50579 10.2455 3.20945 10.0635 3.02744Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_12715">
                      <rect
                        width="8.4"
                        height="8.4"
                        fill="white"
                        transform="translate(1.80005 1.80005)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              {el.deviceDescription}
            </p>
          </div>
        </div>
        <div className="gateway-device-card__bottom">
          <div className="metrics-card">
            <h4>CO2</h4>
            <p>{el.deviceAirData?.iaqi?.no2?.v}</p>
          </div>
          <div className="metrics-card">
            <h4>Temp</h4>
            <p>{el.deviceAirData?.iaqi?.t?.v}°C</p>
          </div>
          <div className="metrics-card">
            <h4>Metrics</h4>
            <p>{el.deviceAirData?.idx}</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="gateway-info">
      <div className="gateway-info__top">
        <h1>{name}</h1>
        <span onClick={() => handleSelected("", [])}>
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
      <div className="gateway-info__content">{Devices}</div>
      <div className="gateway-info__bottom"></div>
    </div>
  );
}

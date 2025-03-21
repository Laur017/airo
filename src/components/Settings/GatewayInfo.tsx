import axios from "axios";

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
	console.log(selectedDevices);

  const Devices = selectedDevices.map((el: any) => {
    return (
      <div className="gateway-device-card">
        <div className="gateway-device-card__top">
          <div className="gateway-device-card__top-left">
            <h3>7.8</h3>
            <h4>PM2.5</h4>
          </div>
          <div className="gateway-device-card__top-right">
            <h2>{el.deviceName}</h2>
            <p>
              <span>
                <svg
                  width="44"
                  height="40"
                  viewBox="0 0 44 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    clip-path="url(#clip0_1_8263)"
                    filter="url(#filter0_d_1_8263)"
                  >
                    <path
                      d="M26 6.35294C21.3483 6.35294 17.5638 10.1374 17.5638 14.7891C17.5638 20.5621 25.1134 29.0371 25.4348 29.395C25.7367 29.7313 26.2639 29.7307 26.5652 29.395C26.8867 29.0371 34.4363 20.5621 34.4363 14.7891C34.4362 10.1374 30.6517 6.35294 26 6.35294ZM26 19.0336C23.6596 19.0336 21.7556 17.1296 21.7556 14.7891C21.7556 12.4487 23.6596 10.5447 26 10.5447C28.3404 10.5447 30.2444 12.4488 30.2444 14.7892C30.2444 17.1296 28.3404 19.0336 26 19.0336Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1_8263"
                      x="0"
                      y="-6"
                      width="52"
                      height="52"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="4" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1_8263"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_8263"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_1_8263">
                      <rect
                        width="36"
                        height="36"
                        fill="white"
                        transform="translate(8)"
                      />
                    </clipPath>
                  </defs>
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
            <p>695.5</p>
          </div>
          <div className="metrics-card">
            <h4>Temp</h4>
            <p>13 C</p>
          </div>
          <div className="metrics-card">
            <h4>Metrics</h4>
            <p>444.2</p>
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

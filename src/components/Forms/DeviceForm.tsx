import { useState } from "react";

export default function DeviceForm() {
  const [dataFormat, setDataFormat] = useState<"json" | "single">("json");
  const [activeDropdown, setActiveDropdown] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [selectedGateway, setSelectedGateway] = useState<string>("");
  return (
    <div className="device-form">
      <label htmlFor="deviceName">
        <p>Device's name</p>
        <input type="text" id="deviceName" placeholder="Type name..." />
      </label>
      <label htmlFor="deviceDataFormat">
        <p>Data format</p>
        <div className="addNew-card__type device-data-format">
          <button
            className={`type-btn${dataFormat === "json" ? "-active" : ""}`}
            onClick={() => setDataFormat("json")}
          >
            <p>JSON Value</p>
          </button>
          <button
            className={`type-btn${dataFormat === "single" ? "-active" : ""}`}
            onClick={() => setDataFormat("single")}
          >
            <p>Single Value</p>
          </button>
        </div>
      </label>
      <label htmlFor="deviceDescription">
        <p>Description</p>
        <input
          type="text"
          id="deviceDescription"
          placeholder="Type description..."
        />
      </label>
      {dataFormat === "json" ? (
        <label htmlFor="deviceMetrics">
          <p>Metrics to be tracked</p>
          <div
            className="form-dropdown"
            onClick={() =>
              setActiveDropdown([
                activeDropdown[0],
                !activeDropdown[1],
                activeDropdown[2],
              ])
            }
          >
            <p>
              Select metrics
              <span className={activeDropdown[1] ? "active-dropdown" : ""}>
                <svg
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.115648 0.945917C0.26978 0.782718 0.518931 0.782718 0.673063 0.945917L4.73075 5.24227L8.78841 0.945916C8.94254 0.782717 9.19169 0.782717 9.34583 0.945916C9.49996 1.10911 9.49996 1.37292 9.34583 1.53612L5.00945 6.12758C4.93257 6.20898 4.83166 6.24989 4.73073 6.24989C4.6298 6.24989 4.52888 6.20898 4.45201 6.12758L0.115629 1.53612C-0.0384845 1.37292 -0.0384836 1.10912 0.115648 0.945917Z"
                    fill="white"
                  />
                </svg>
              </span>
            </p>
            {activeDropdown[1] && (
              <div className="form-dropdown__options">
                <p>Metric #1</p>
                <p>Metric #2</p>
                <p>Metric #3</p>
              </div>
            )}
          </div>
        </label>
      ) : (
        <label></label>
      )}
      <label htmlFor="deviceGateway">
        <p>Gateway</p>
        <div
          className="form-dropdown"
          onClick={() =>
            setActiveDropdown([
              !activeDropdown[0],
              activeDropdown[1],
              activeDropdown[2],
            ])
          }
        >
          <p>
            {selectedGateway.length ? selectedGateway : "Select gateway"}
            <span className={activeDropdown[0] ? "active-dropdown" : ""}>
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.115648 0.945917C0.26978 0.782718 0.518931 0.782718 0.673063 0.945917L4.73075 5.24227L8.78841 0.945916C8.94254 0.782717 9.19169 0.782717 9.34583 0.945916C9.49996 1.10911 9.49996 1.37292 9.34583 1.53612L5.00945 6.12758C4.93257 6.20898 4.83166 6.24989 4.73073 6.24989C4.6298 6.24989 4.52888 6.20898 4.45201 6.12758L0.115629 1.53612C-0.0384845 1.37292 -0.0384836 1.10912 0.115648 0.945917Z"
                  fill="white"
                />
              </svg>
            </span>
          </p>
          {activeDropdown[0] && (
            <div className="form-dropdown__options">
              <p onClick={() => setSelectedGateway("Gateway 1")}>Gateway 1</p>
              <p onClick={() => setSelectedGateway("Gateway 2")}>Gateway 2</p>
              <p onClick={() => setSelectedGateway("Gateway 2")}>Gateway 3</p>
            </div>
          )}
        </div>
      </label>
      {dataFormat === "json" ? (
        <label htmlFor="devicePublic">
          <p>Public metrics</p>
          <div
            className="form-dropdown"
            onClick={() =>
              setActiveDropdown([
                activeDropdown[0],
                activeDropdown[1],
                !activeDropdown[2],
              ])
            }
          >
            <p>
              Select metrics
              <span className={activeDropdown[2] ? "active-dropdown" : ""}>
                <svg
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.115648 0.945917C0.26978 0.782718 0.518931 0.782718 0.673063 0.945917L4.73075 5.24227L8.78841 0.945916C8.94254 0.782717 9.19169 0.782717 9.34583 0.945916C9.49996 1.10911 9.49996 1.37292 9.34583 1.53612L5.00945 6.12758C4.93257 6.20898 4.83166 6.24989 4.73073 6.24989C4.6298 6.24989 4.52888 6.20898 4.45201 6.12758L0.115629 1.53612C-0.0384845 1.37292 -0.0384836 1.10912 0.115648 0.945917Z"
                    fill="white"
                  />
                </svg>
              </span>
            </p>
            {activeDropdown[2] && (
              <div className="form-dropdown__options">
                <p>Metric #1</p>
                <p>Metric #2</p>
                <p>Metric #3</p>
              </div>
            )}
          </div>
        </label>
      ) : (
        <label></label>
      )}
      <label htmlFor="deviceLocation">
        <p>Location</p>
        <div className="device-data-format">
          <input
            type="text"
            id="deviceLocation"
            placeholder="Type location..."
          />
          <span>
            <svg
              width="44"
              height="40"
              viewBox="0 0 44 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_8263)" filter="url(#filter0_d_1_8263)">
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
        </div>
      </label>
    </div>
  );
}

import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
interface ChartDeviceProps {
  name: string;
  handleSelected: (val: string, arr: any[]) => void;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDevice({
  name,
  handleSelected,
}: ChartDeviceProps) {
  const [period, setPeriod] = useState<1 | 2 | 3>(1);

  const pieChartData = {
    label: ["facebook", "insta"],
    datasets: [
      {
        label: "time spent",
        data: [58, 42],
        backgroundColor: ["#ACF254", "rgba(48, 54, 61, 0.7)"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="chart-device">
      <div className="chart-device-top">
        <h1>
          {name}
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
        </h1>
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
          Diagon Alley, 12
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
          Comment ...
        </p>
      </div>
      <div className="chart-device-content">
        <div className="chart-device-content__buttons">
          <button
            className={`chart-btn${period === 1 ? "-active" : ""}`}
            onClick={() => setPeriod(1)}
          >
            <p>Hour</p>
          </button>
          <button
            className={`chart-btn${period === 2 ? "-active" : ""}`}
            onClick={() => setPeriod(2)}
          >
            <p>Today</p>
          </button>
          <button
            className={`chart-btn${period === 3 ? "-active" : ""}`}
            onClick={() => setPeriod(3)}
          >
            <p>Week</p>
          </button>
        </div>
        <div className="chart-device-content__grid">
          <div className="chart-device-content__grid-card">
            <h2>PM2.5</h2>
            <div>
              <Doughnut data={pieChartData} options={{}} />
            </div>
          </div>
          <div className="chart-device-content__grid-card">
            <h2>CO2</h2>
          </div>
          <div className="chart-device-content__grid-card">
            <h2>Temperature</h2>
          </div>
          <div className="chart-device-content__grid-card">
            <h2>Unkown Metrics</h2>
          </div>
        </div>
      </div>
      <div className="chart-device-bottom">
        <h2>
          <span>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 25.6667C11 26.953 12.0465 28 13.3333 28H22.6667C23.9535 28 25 26.953 25 25.6667V14H11V25.6667Z"
                fill="white"
              />
              <path
                d="M20.2857 9.33333V8H15.7143V9.33333H10V12H26V9.33333H20.2857Z"
                fill="white"
              />
            </svg>
          </span>
          Remove device
        </h2>
      </div>
    </div>
  );
}

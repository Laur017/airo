import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useParams } from "react-router-dom";
interface ChartDeviceProps {
  handleSelected: (val: string, arr: any[]) => void;
  selectedDevices: any[];
}

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function ChartDevice({
  handleSelected,
  selectedDevices,
}: ChartDeviceProps) {
  const { id } = useParams();
  const [device] = selectedDevices;
  const [period, setPeriod] = useState<1 | 2 | 3>(1);
  const deviceRef = doc(firestore, `${id}`, device.id);

  const pmChartData = {
    datasets: [
      {
        data: [
          device.deviceAirData.iaqi.pm10.v * 4.8,
          100 - device.deviceAirData.iaqi.pm10.v * 4.8,
        ],
        backgroundColor: ["#ACF254", "rgba(48, 54, 61, 0.7)"],
        borderWidth: 0,
      },
    ],
  };
  const coChartData = {
    datasets: [
      {
        data: [
          device.deviceAirData.iaqi.no2.v * 9.5,
          100 - device.deviceAirData.iaqi.no2.v * 9.5,
        ],
        backgroundColor: ["#FFC700", "rgba(48, 54, 61, 0.7)"],
        borderWidth: 0,
      },
    ],
  };
  const temperatureChartData = {
    datasets: [
      {
        data: [
          device.deviceAirData.iaqi.t.v * 5,
          100 - device.deviceAirData.iaqi.t.v * 5,
        ],
        backgroundColor: ["#DBFF00", "rgba(48, 54, 61, 0.7)"],
        borderWidth: 0,
      },
    ],
  };
  const unknownChartData = {
    datasets: [
      {
        data: [100],
        backgroundColor: ["rgba(48, 54, 61, 0.7)"],
        borderWidth: 0,
      },
    ],
  };

  const options: any = {
    cutout: "75%",
    interaction: {
      mode: null,
    },
  };
  const options2: any = {
    cutout: "90%",
    interaction: {
      mode: null,
    },
  };
  const options3: any = {
    plugins: {
      legend: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const pmLineChart = {
    labels: ["07:00", "13:00", "21:00"],
    datasets: [
      {
        data: [
          device.deviceAirData.forecast.daily.pm10[0].avg,
          device.deviceAirData.forecast.daily.pm10[0].max,
          device.deviceAirData.forecast.daily.pm10[0].min,
        ],
        borderColor: "#FF5C00",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  const coLineChart = {
    labels: ["07:00", "13:00", "21:00"],
    datasets: [
      {
        data: [
          device.deviceAirData.forecast.daily.pm25[0].min,
          device.deviceAirData.forecast.daily.pm25[0].max,
          device.deviceAirData.forecast.daily.pm25[0].avg,
        ],
        borderColor: "#D2F254",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  const tempLineChart = {
    labels: ["07:00", "13:00", "21:00"],
    datasets: [
      {
        data: [
          device.deviceAirData.forecast.daily.o3[0].min,
          device.deviceAirData.forecast.daily.o3[0].max,
          device.deviceAirData.forecast.daily.o3[0].avg,
        ],
        borderColor: "#FFA002",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  const unknownLineChart = {
    labels: ["07:00", "13:00", "21:00"],
    datasets: [
      {
        data: [
          device.deviceAirData.forecast.daily.uvi[0].max,
          device.deviceAirData.forecast.daily.uvi[0].min,
          device.deviceAirData.forecast.daily.uvi[0].avg,
        ],
        borderColor: "#CF64D1",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const pmLineChartWeek = {
    labels: device.deviceAirData.forecast.daily.pm10.map(
      (el: any) => el.day.split("-")[2]
    ),
    datasets: [
      {
        data: device.deviceAirData.forecast.daily.pm10.map((el: any) => el.avg),
        borderColor: "#FF5C00",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  const coLineChartWeek = {
    labels: device.deviceAirData.forecast.daily.pm25.map(
      (el: any) => el.day.split("-")[2]
    ),
    datasets: [
      {
        data: device.deviceAirData.forecast.daily.pm25.map((el: any) => el.avg),
        borderColor: "#D2F254",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  const tempLineChartWeek = {
    labels: device.deviceAirData.forecast.daily.o3.map(
      (el: any) => el.day.split("-")[2]
    ),
    datasets: [
      {
        data: device.deviceAirData.forecast.daily.o3.map((el: any) => el.avg),
        borderColor: "#FFA002",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  const unknownLineChartWeek = {
    labels: device.deviceAirData.forecast.daily.uvi.map(
      (el: any) => el.day.split("-")[2]
    ),
    datasets: [
      {
        data: device.deviceAirData.forecast.daily.uvi.map((el: any) => el.avg),
        borderColor: "#CF64D1",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const handleRemoveDevice = async () => {
    try {
      await deleteDoc(deviceRef);
      handleSelected("", []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chart-device">
      <div className="chart-device-top">
        <h1>
          {device.deviceName}
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
          {device.deviceLocation}
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
          {device.deviceDescription}
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
        {period === 1 ? (
          <div className="chart-device-content__grid">
            <div className="chart-device-content__grid-card">
              <h2>PM2.5</h2>
              <div className="known-data">
                <Doughnut data={pmChartData} options={options} />
              </div>
              <p>{device.deviceAirData.iaqi.pm10.v}</p>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>CO2</h2>
              <div className="known-data">
                <Doughnut data={coChartData} options={options} />
              </div>
              <p>{device.deviceAirData.iaqi.no2.v}</p>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>Temperature</h2>
              <div className="known-data">
                <Doughnut data={temperatureChartData} options={options} />
              </div>
              <p>{device.deviceAirData.iaqi.t.v} °C</p>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>Unkown Metrics</h2>
              <div>
                <Doughnut data={unknownChartData} options={options2} />
              </div>
              <p>{device.deviceAirData.iaqi.dew.v}</p>
            </div>
          </div>
        ) : period === 2 ? (
          <div className="chart-device-content__grid">
            <div className="chart-device-content__grid-card">
              <h2>PM2.5</h2>
              <div className="line-chart">
                <Line data={pmLineChart} options={options3} />
              </div>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>CO2</h2>
              <div className="line-chart">
                <Line data={coLineChart} options={options3} />
              </div>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>Temperature</h2>
              <div className="line-chart">
                <Line data={tempLineChart} options={options3} />
              </div>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>Unkown Metrics</h2>
              <div className="line-chart">
                <Line data={unknownLineChart} options={options3} />
              </div>
            </div>
          </div>
        ) : (
          <div className="chart-device-content__grid">
            <div className="chart-device-content__grid-card">
              <h2>PM2.5</h2>
              <div className="line-chart">
                <Line data={pmLineChartWeek} options={options3} />
              </div>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>CO2</h2>
              <div className="line-chart">
                <Line data={coLineChartWeek} options={options3} />
              </div>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>Temperature</h2>
              <div className="line-chart">
                <Line data={tempLineChartWeek} options={options3} />
              </div>
            </div>
            <div className="chart-device-content__grid-card">
              <h2>Unkown Metrics</h2>
              <div className="line-chart">
                <Line data={unknownLineChartWeek} options={options3} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chart-device-bottom">
        <h2 onClick={() => handleRemoveDevice()}>
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

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";

export default function Home() {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [z, setZ] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [speedArr, setSpeedArr] = useState([]);
  const [speedAvg, setSpeedAvg] = useState(null);
  const frequency = 60;

  let xVal = 0;
  let yVal = 0;
  let zVal = 0;
  useEffect(() => {
    window.addEventListener(
      "devicemotion",
      (e) => {
        if (e.acceleration.x !== 0) {
          xVal = e.acceleration.x;
          yVal = e.acceleration.y;
          zVal = e.acceleration.z;

          setX(xVal);
          setY(yVal);
          setZ(zVal);

          const vx = Math.sqrt(
            Math.pow(xVal, 2) + Math.pow(yVal, 2) + Math.pow(zVal, 2)
          );

          // const vx = xVal * 0.98;
          setSpeed(vx);
          console.log(speed);

          speedArr.push(speed);
          if (speedArr.length > 20) {
            setSpeedArr([]);
          }

          var speedSum = 0;
          speedArr.forEach((val) => {
            speedSum += val;
          });

          const avgSpeed = speedSum / speedArr.length;
          setSpeedAvg(avgSpeed);
        } else {
          setX(0);
          setY(0);
          setZ(0);
        }
      },
      { frequency }
    );
  }, [frequency, speed]);
  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-blue-400">
      <div className="flex flex-col bg-black p-5 w-4/5 items-center rounded-lg shadow-lg">
        <h1 className="font-semibold my-2 text-xl text-white">
          {" "}
          Accelerometer Test{" "}
        </h1>

        <div className="flex space-x-5">
          <p className="text-neutral-600"> Device motion X:</p>
          <p className="font-bold text-red-600">{x?.toFixed(1)}</p>
        </div>

        <div className="flex space-x-5">
          <p className="text-neutral-600"> Device motion Y: </p>

          <p className="font-bold text-green-600">{y?.toFixed(1)}</p>
        </div>

        <div className="flex space-x-5">
          <p className="text-neutral-600"> Device motion Z: </p>
          <p className="font-bold text-purple-600">{z?.toFixed(1)}</p>
        </div>
        <p className="my-2 border border-blue-300 p-2 rounded-md w-3/5 text-center text-neutral-600">
          {" "}
          Speed:{" "}
          <span className="font-semibold text-lg text-white">
            {" "}
            {speed?.toFixed(1)}{" "}
          </span>
          m/s
        </p>

        <p className="my-2 border border-blue-300 p-2 rounded-md w-3/5 text-center text-neutral-600">
          {" "}
          Speed:{" "}
          <span className="font-semibold text-lg text-white">
            {" "}
            {speed?.toFixed(1) * 3.6}{" "}
          </span>
          kh/h
        </p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
            style={{ width: speed }}
          ></div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

const SpeedPage = () => {
  const [acceleration, setAcceleration] = useState({});
  const [speed, setSpeed] = useState({});
  const [previousReadings, setPreviousReadings] = useState([]);

  useEffect(() => {
    window.addEventListener("devicemotion", (e) => {
      setAcceleration({
        x: e.accelerationIncludingGravity.x,
        y: e.accelerationIncludingGravity.y,
        z: e.accelerationIncludingGravity.z,
      });

      //Add the new reading to the array
      let prev_reading = {
        x: e.accelerationIncludingGravity.x,
        y: e.accelerationIncludingGravity.y,
        z: e.accelerationIncludingGravity.z,
      };

      let newReadings = [...previousReadings, prev_reading];
      setPreviousReadings(newReadings);

      //Calculate the average of all readings
      let averageReading = { x: 0, y: 0, z: 0 };
      for (let i = 0; i < newReadings.length; i++) {
        averageReading.x += newReadings[i].x;
        averageReading.y += newReadings[i].y;
        averageReading.z += newReadings[i].z;
      }

      averageReading.x /= newReadings.length;
      averageReading.y /= newReadings.length;
      averageReading.z /= newReadings.length;

      //Calculate the stabilized value
      let stabilizedValue = { x: 0, y: 0, z: 0 };
      for (let i = 0; i < newReadings.length; i++) {
        stabilizedValue.x += newReadings[i].x - averageReading.x;
        stabilizedValue.y += newReadings[i].y - averageReading.y;
        stabilizedValue.z += newReadings[i].z - averageReading.z;
      }

      //Set the speed with only one decimal place
      setSpeed({
        x: (Math.round(stabilizedValue.x * 10) / 10).toFixed(1),
        y: (Math.round(stabilizedValue.y * 10) / 10).toFixed(1),
        z: (Math.round(stabilizedValue.z * 10) / 10).toFixed(1),
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-blue-400">
      <div className="flex flex-col bg-black p-5 w-4/5 items-center rounded-lg shadow-lg">
        {/* <p className="text-white">
          Acceleration: {JSON.stringify(acceleration)}
        </p> */}
        <p className="text-white"> Speed: {JSON.stringify(speed)}</p>
      </div>
    </div>
  );
};

export default SpeedPage;

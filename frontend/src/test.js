import { useEffect, useState } from "react";

const Test = () => {
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every second!");
    }, 3000);
    console.log(interval);
    console.log(intervalId);
    return () => {
      console.log("clear in");

      clearInterval(interval);
    };
  }, []);

  return <div></div>;
};

export default Test;

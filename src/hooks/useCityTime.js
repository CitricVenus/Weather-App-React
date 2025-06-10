import { useEffect, useState } from "react";

const getTimeForTimeZone = (timeZone) => {
  const dateStr = new Date().toLocaleString("en-US", { timeZone });
  const date = new Date(dateStr);

  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

export function useCityTime(timeZone) {
  const [cityTime, setCityTime] = useState(() => getTimeForTimeZone(timeZone));

  useEffect(() => {
    const interval = setInterval(() => {
      setCityTime(getTimeForTimeZone(timeZone));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  return cityTime;
}

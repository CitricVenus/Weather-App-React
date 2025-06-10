import { useEffect, useState } from "react";

const getTimeForTimeZone = (timeZone) => {
  const dateStr = new Date().toLocaleString("en-US", { timeZone });
  const date = new Date(dateStr);

  if (
    date.getHours() < 10 &&
    date.getMinutes() < 10 &&
    date.getSeconds() < 10
  ) {
    return {
      hours: `0${date.getHours()}`,
      minutes: `0${date.getMinutes()}`,
      seconds: `0${date.getSeconds()}`,
    };
  }

  if (date.getHours() < 10 && date.getMinutes() < 10) {
    return {
      hours: `0${date.getHours()}`,
      minutes: `0${date.getMinutes()}`,
      seconds: date.getSeconds(),
    };
  }

  if (date.getHours() < 10) {
    return {
      hours: `0${date.getHours()}`,
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  }
  if (date.getMinutes() < 10) {
    return {
      hours: date.getHours(),
      minutes: `0${date.getMinutes()}`,
      seconds: date.getSeconds(),
    };
  }

  if (date.getSeconds() < 10) {
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: `0${date.getSeconds()}`,
    };
  }
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

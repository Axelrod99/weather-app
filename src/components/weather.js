import React, { useState } from "react";
import axios from "axios";
import loadingPic from "../assets/icon/loading-1.gif";
import clearsky from "../assets/icon/icons8-weather-64.png";
import cloudysky from "../assets/icon/icons8-night-100.png";
import sunrise from "../assets/icon/icons8-sunrise.gif";
import sunset from "../assets/icon/icons8-sunset.gif";
import reload from "../assets/icon/icons8-reload (1).gif";
import humidity from "../assets/icon/icons8-humidity.gif";
import pressure from "../assets/icon/icons8-pressure.gif";
import wind from "../assets/icon/icons8-wind.gif";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todaysDate, setTodaysDate] = useState("");

  const id = "2f61dab760dc6f8a35ddbab5ca686ef5";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${id}`
      );
      setWeatherData(response.data);
      updateFormattedDate();
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const updateFormattedDate = () => {
    const date = new Date();

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const newFormattedDate = date.toLocaleDateString("en-US", options);

    setTodaysDate(newFormattedDate);
  };

  const formattedSunrise = new Date(
    `${weatherData?.sys?.sunrise}` * 1000
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedSunset = new Date(
    `${weatherData?.sys?.sunset}` * 1000
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto mt-10 pb-10">
      <div className="flex justify-center text-[32px] font-semibold pb-5">
        <p>Weather App</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="rounded-md shadow border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Get Weather
        </button>
      </form>

      <>
        {isLoading ? (
          <div className="h-[330px] w-full flex justify-center items-center">
            <img src={loadingPic} />
          </div>
        ) : (
          <>
            {weatherData ? (
              <div className="mt-4 flex flex-col gap-3 rounded-md p-4">
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleReload}
                    className="flex justify-center items-center gap-1 w-[120px] shadow border bg-white"
                  >
                    <img className="h-5 " src={reload} /> <p>Reload</p>
                  </button>
                </div>
                <div className="flex gap-1 justify-center font-semibold text-[28px] Montserrat">
                  <h2>{weatherData.name},</h2>{" "}
                  <h2>{weatherData.sys.country}</h2>
                </div>
                <div className="flex justify-center gap-3">
                  <p>lon: {weatherData.coord.lon}</p>
                  <p>lat: {weatherData.coord.lat}</p>
                </div>
                <div className="flex justify-center Axiforma-light">
                  <p>{todaysDate}</p>
                </div>
                <div className="flex justify-center items-center text-[36px] Axiforma-bold">
                  <div>
                    {weatherData.weather[0].description === "clear sky" ? (
                      <img className="w-[90px] h-[90px]" src={clearsky} />
                    ) : (
                      <img className="w-[90px] h-[90px]" src={cloudysky} />
                    )}
                  </div>
                  <p>{weatherData.main.temp}°C</p>
                </div>

                <div className="flex justify-center font-semibold text-red-400 text-[22px]">
                  <p>{weatherData.weather[0].description}</p>
                </div>

                <div className="flex gap-2 justify-center items-center text-[20px] Axiforma-bold">
                  <p>Windspeed: </p>
                  <div className="bg-[#fff] flex gap-2">
                    <img className="" src={wind} />
                    <p>{weatherData.wind.speed}m/s</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 pt-3">
                  <div className="shadow border flex flex-col gap-2 justify-center items-center text-[20px]">
                    <p className="font-semibold text-[22px]">Sunrise</p>
                    <div>
                      <img className="h-[70px] w-[90px]" src={sunrise} />
                    </div>
                    <p className="text-[18px]">{formattedSunrise}</p>
                  </div>
                  <div className="shadow border flex flex-col gap-2 justify-center items-center text-[20px]">
                    <p className="font-semibold text-[22px]">Sunset</p>
                    <div>
                      <img className="h-[70px] w-[90px]" src={sunset} />
                    </div>
                    <p className="text-[16px]">{formattedSunset}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[51vh]" />
            )}
          </>
        )}
      </>
      <ToastContainer />
    </div>
  );
};

export default Weather;

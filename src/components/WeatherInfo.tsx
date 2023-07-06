import React from 'react';

interface WeatherInfoProps {
  weatherData: any;
  currentDateTime: Date;
  country: string;
  validCountry: boolean
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  weatherData,
  currentDateTime,
  country,
  validCountry
}) => {
  const { name, main, weather } = weatherData;
  const temperatureKelvin: number = main.temp;
  const temperatureCelsius: number = temperatureKelvin - 273.15;
  const weatherDescription: string = weather[0].description;

  return (
    <div>
        {validCountry && <p>there's no country that's called {name}</p>}
      <h1>Weather in {name}</h1>
      <p>Temperature: {temperatureCelsius.toFixed(2)} °C</p>
      <p>Description: {weatherDescription}</p>
      <p>Current Country: {country}</p>
      <p>Current Date: {currentDateTime.toDateString()}</p>
      <p>Current Time: {currentDateTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default WeatherInfo;

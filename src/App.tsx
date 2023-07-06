import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from "lottie-react";
import WalkingMan from './assets/walking.json'

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null); 
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [country, setCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchThis, setSearchThis] = useState('');
  const [validCountry, setValidCountry ] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      console.log(res.data);
      setCountry(res.data.country_name);
    };

    getData()
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      const apiKey: string = import.meta.env.VITE_API_KEY as string; 

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);

  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey: string = import.meta.env.VITE_API_KEY as string; 

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchThis}&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setValidCountry(true)
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setValidCountry(false)
      }
    };

    fetchData();

  }, [searchThis]);

  useEffect(() => {
    if(searchTerm.length === 0){
      setValidCountry(true)
    }
    
  }, [searchTerm])
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
    setSearchThis(searchTerm)
  };



  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather } = weatherData;
  const temperatureKelvin: number = main.temp;
  const temperatureCelsius: number = temperatureKelvin - 273.15;
  const weatherDescription: string = weather[0].description;


  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {!validCountry && <p>there's no any place that's called {searchTerm}</p>}
      <h1>Weather in {name}</h1>
      <p>Temperature: {temperatureCelsius.toFixed(2)} °C</p>
      <p>Description: {weatherDescription}</p>
      <p>Current Country: {country}</p>
      <p>Current Date: {currentDateTime.toDateString()}</p>
      <p>Current Time: {currentDateTime.toLocaleTimeString()}</p>
      <div className='relative flex w-full justify-center'>
        <div className='absolute top-[3.6rem] left-[31.7rem] w-[120px] h-[120px] bg-yellow-400 rounded-full z-50'></div>
        <div className='absolute bg-gray-200 rounded-full overflow-hidden p-6'>
          <Lottie animationData={WalkingMan} className='h-[400px]'/>
        </div>
      </div>
      
    </div>
  );
};

export default App;
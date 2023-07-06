import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDisplay from '../components/WeatherDisplay';

const WeatherContainer: React.FC = () => {
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
    if(searchTerm.trim().length === 0){
      setValidCountry(true)
    }
    
  }, [searchTerm])
  

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchThis(searchTerm)
  };

  return (
    <div>
      <WeatherDisplay
        weatherData={weatherData}
        currentDateTime={currentDateTime}
        country={country}
        handleSearch={handleSearch}
        validCountry={validCountry}
      />
    </div>
  );
};

export default WeatherContainer;

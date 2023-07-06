import React from 'react';
import SearchForm from './SearchForm';
import WeatherInfo from './WeatherInfo';

interface WeatherDisplayProps {
  weatherData: any;
  currentDateTime: Date;
  country: string;
  handleSearch: (searchTerm: string) => void;
  validCountry: boolean
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  currentDateTime,
  country,
  handleSearch,
  validCountry,
}) => {
  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      {weatherData ? (
        <WeatherInfo
          weatherData={weatherData}
          currentDateTime={currentDateTime}
          country={country}
          validCountry={validCountry}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WeatherDisplay;

import React, { useState } from "react";

const API_KEY = "ac9d21f60ea5a2b193883ac1cfb90618";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

// Icon components
// const SearchIcon = () => (
//   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

const CloudIcon = () => (
  <svg className="w-22 h-18" fill="none" stroke="currentColor" viewBox="0 0 24 20">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const DropletsIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24 ">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 14.25c0-1.243 1.007-2.25 2.25-2.25S12 13.007 12 14.25s-1.007 2.25-2.25 2.25-2.25-1.007-2.25-2.25zM10.29 2.098l5.573 8.359A9 9 0 1110.29 2.098zM6.75 18a2.25 2.25 0 004.5 0" />
  </svg>
);

const WindIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ThermometerIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${WEATHER_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.message || "City not found");
        setWeatherData(null);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error fetching weather data");
      setWeatherData(null);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") getWeather();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-screen flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#393E46' }}>
            Weather App
          </h1>
          <p className="text-gray-600">Get current weather information for any city</p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="w-full flex gap-4">
            <div className="relative flex-1">
              {/* <div className="absolute inset-y-0 left-0 pl-4 pointer-events-none text-gray-400">
                <SearchIcon />
              </div> */}
              <input
                type="text"
                placeholder="Search for a place that you want to know the weather"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="block w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm transition-all"
                style={{ borderColor: '#393E46' }}
              />
            </div>
            <button
              onClick={getWeather}
              disabled={loading || !city.trim()}
              className="px-8 py-4 bg-white border-2 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl w-full">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {weatherData && (
          <div className="mb-8">
            {/* Current Weather */}
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full" style={{ border: '1px solid #393E46' }}>
              {/* Location */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-2" style={{ color: '#393E46' }}>
                  {weatherData.name}
                </h2>
                <p className="text-gray-600">
                  {weatherData.sys.country}
                </p>
              </div>
              
              {/* Weather Icon and Main Info */}
              <div className="mb-8">
                <div className="mb-4">
                  <img 
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    className="w-24 h-24"
                  />
                </div>
                
                <div className="text-6xl font-bold mb-2" style={{ color: '#393E46' }}>
                  {Math.round(weatherData.main.temp)}°C
                </div>
                
                <p className="text-xl text-gray-600 capitalize mb-4">
                  {weatherData.weather[0].description}
                </p>
                
                <p className="text-lg text-gray-500">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="mb-2" style={{ color: '#393E46' }}>
                    <DropletsIcon />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Humidity</div>
                  <div className="text-xl font-semibold" style={{ color: '#393E46' }}>
                    {weatherData.main.humidity}%
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="mb-2" style={{ color: '#393E46' }}>
                    <WindIcon />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Wind Speed</div>
                  <div className="text-xl font-semibold" style={{ color: '#393E46' }}>
                    {Math.round(weatherData.wind?.speed || 0)} m/s
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="mb-2" style={{ color: '#393E46' }}>
                    <ThermometerIcon />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Pressure</div>
                  <div className="text-xl font-semibold" style={{ color: '#393E46' }}>
                    {weatherData.main.pressure} hPa
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="mb-2" style={{ color: '#393E46' }}>
                    <EyeIcon />
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Visibility</div>
                  <div className="text-xl font-semibold" style={{ color: '#393E46' }}>
                    {Math.round((weatherData.visibility || 0) / 1000)} km
                  </div>
                </div>
              </div>

              {/* Additional Current Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-6">
                <div>
                  <span>Min Temp: </span>
                  <span className="font-semibold">{Math.round(weatherData.main.temp_min)}°C</span>
                </div>
                <div>
                  <span>Max Temp: </span>
                  <span className="font-semibold">{Math.round(weatherData.main.temp_max)}°C</span>
                </div>
                <div>
                  <span>Sunrise: </span>
                  <span className="font-semibold">{formatTime(weatherData.sys.sunrise)}</span>
                </div>
                <div>
                  <span>Sunset: </span>
                  <span className="font-semibold">{formatTime(weatherData.sys.sunset)}</span>
                </div>
              </div>

              {/* Wind Direction */}
              {weatherData.wind?.deg && (
                <div className="text-sm text-gray-600">
                  <span>Wind Direction: </span>
                  <span className="font-semibold">{weatherData.wind.deg}°</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-12 w-full" style={{ border: '1px solid #393E46' }}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"
                  style={{ borderColor: '#393E46' }}></div>
                <p className="text-xl font-medium" style={{ color: '#393E46' }}>Loading weather...</p>
              </div>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!weatherData && !loading && !error && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-12 w-full" style={{ border: '1px solid #393E46' }}>
              <div className="text-center">
                <div className="mb-6 flex justify-center" style={{ color: '#393E46' }}>
                  <CloudIcon />
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: '#393E46' }}>
                  Wheater Radar
                </h3>
                <h3 className="text-gray-600">Search For Place That You Want To Know The Weather!</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
import React, { Component } from 'react';

const API_KEY = '738775e31fda6a80e39cf3a9a9ccbe46'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null, // Initialize weather data state
      loading: false, // Track loading state
      error: null, // Track any errors
    };
  }

  componentDidMount() {
    const { location, query } = this.props;
    const searchLocation = location || query;

    if (searchLocation) {
      console.log(`Component did mount, fetching weather data for: ${searchLocation}`);
      this.fetchWeatherData(searchLocation);
    }
  }

  componentDidUpdate(prevProps) {
    const { location, query } = this.props;
    const prevLocation = prevProps.location || prevProps.query;
    const searchLocation = location || query;

    // Fetch weather data when location or query changes
    if (searchLocation !== prevLocation) {
      if (searchLocation) {
        console.log(`Component did update, fetching weather data for: ${searchLocation}`);
        this.fetchWeatherData(searchLocation);
      } else {
        this.setState({ weatherData: null });
      }
    }
  }

  fetchWeatherData = (searchLocation) => {
    this.setState({ loading: true, error: null });

    // Construct the API request URL
    const apiUrl = `${API_URL}?q=${searchLocation}&appid=${API_KEY}&units=metric`;

    // Log the API request URL
    console.log(`API request URL: ${apiUrl}`);

    // Make the API call
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Weather data:', data); // Log the weather data
        this.setState({
          weatherData: {
            location: data.name,
            temperature: `${data.main.temp}°C`,
            description: data.weather[0].description,
          },
          loading: false,
        });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        this.setState({ loading: false, error: 'Failed to fetch weather data' });
      });
  };

  render() {
    const { weatherData, loading, error } = this.state;

    return (
      <div className="max-w-md w-full mx-auto mt-4 p-8 bg-white rounded-lg shadow-lg">
        {loading ? (
          <p className="text-gray-700">Fetching weather...</p>
        ) : error ? (
          <p className="text-gray-700">{error}</p>
        ) : weatherData ? (
          <>
            <h2 className="text-xl font-semibold mb-2">{weatherData.location}</h2>
            <p className="text-gray-700">{weatherData.temperature}</p>
            <p className="text-gray-700">{weatherData.description}</p>
          </>
        ) : (
          <p className="text-gray-700">No weather data available</p>
        )}
      </div>
    );
  }
}


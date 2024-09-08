import React, { Component } from 'react';
import Nav from '../components/nav';
import Weather from '../components/weather';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '', // Initialize query state
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    const { query } = this.state;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="w-full">
            <input
              type="text"
              value={query}
              onChange={this.handleInputChange}
              placeholder="Search weather.."
              className="px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <Weather query={query} /> {/* Pass query as prop to Weather component */}
        <Nav />
      </div>
    );
  }
}


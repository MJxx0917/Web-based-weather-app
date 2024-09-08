import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import Weather from '../components/weather'; // Import Weather component
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const [markers, setMarkers] = useState([]);

  // Function to handle map events and add markers
  const MapEventsHandler = () => {
    const map = useMapEvents({
      dblclick(e) {
        // Fetch city name based on coordinates using reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
          .then(response => response.json())
          .then(data => {
            let city = 'Unknown';

            // Extract city name from reverse geocoding response
            if (data.address) {
              if (data.address.city) {
                city = data.address.city;
              } else if (data.address.town) {
                city = data.address.town;
              } else if (data.address.village) {
                city = data.address.village;
              } else if (data.address.road) {
                // If no city, town, or village, use the road name
                city = `Near ${data.address.road}`;
              }
            }

            // Create a new marker with position and associated city
            const newMarker = {
              position: [e.latlng.lat, e.latlng.lng],
              location: city,
            };

            // Update markers state with the new marker
            setMarkers(prevMarkers => [...prevMarkers, newMarker]);
          })
          .catch(error => {
            console.error('Error fetching city name:', error);
          });
      },
    });

    return null;
  };

  const handleRemoveMarker = (index) => {
    setMarkers(prevMarkers => prevMarkers.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen w-screen relative z-0">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Use custom hook component to handle map events */}
        <MapEventsHandler />

        {/* Render markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <div>
                <h3>{marker.location}</h3>
                <Weather location={marker.location} />
                <button onClick={() => handleRemoveMarker(index)}>Remove Marker</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;


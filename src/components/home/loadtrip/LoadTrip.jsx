
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Import custom icons for Leaflet map
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix marker icons issue in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LoadTrip = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [tripData, setTripData] = useState([]);

  const location = useLocation();
  const ids = location.state.ids;
  const token = sessionStorage.getItem('token');

  const navigate = useNavigate()

  // Fetching the calculated details
  const fetchTripCalculation = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/calculate-trip-details',
        { ids },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setName(response.data.trips.map((ele) => ele.tripName));
      setData(response.data);
      setTripData(response.data.trips.map((ele) => ele.gpsData));
    } catch (error) {
      console.error('Error fetching trip calculations', error);
    }
  };

  const tripDataName = Array.from(new Set(name));

  useEffect(() => {
    fetchTripCalculation();
  }, [ids]);

  const firstTrip = data.trips?.[0];
  const mapCenter =
    firstTrip && firstTrip.gpsData.length > 0
      ? [parseFloat(firstTrip.gpsData[0].latitude), parseFloat(firstTrip.gpsData[0].longitude)]
      : [0, 0]


      const handleClick = () => {
        navigate('/')
      }
      
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w 1/3 bg-white shadow-md flex items-center justify-center rounded-lg my-4 py-4">
        <h2 className="text-gray-800 text-lg sm:text-xl font-bold p-2">{tripDataName}</h2>
        <button
          className="ml-auto flex items-end bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg mb-2 mr-2"
          onClick={handleClick}
        >
          New
        </button>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 lg:w 1/3 bg-white shadow-md flex items-center justify-center rounded-lg my-4 py-4">
        <div className="w-full h-96 mt-4">
          {data.trips && data.trips.length > 0 ? (
            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {data.trips.map((trip) =>
                trip.gpsData.map((point, index) => (
                  <Marker key={`${trip._id}-${index}`} position={[parseFloat(point.latitude), parseFloat(point.longitude)]}>
                    <Popup>
                      <strong>Trip Name:</strong> {trip.tripName} <br />
                      <strong>Timestamp:</strong> {point.timestamp} <br />
                      <strong>Ignition:</strong> {point.ignition}
                    </Popup>
                  </Marker>
                ))
              )}
            </MapContainer>
          ) : (
            <p>No trip data available</p>
          )}
        </div>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 lg:w 1/3 bg-white shadow-lg flex flex-col items-center justify-start rounded-lg p-6 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Trip Details</h2>
        <div className="w-full space-y-4">
          <div className="flex flex-wrap justify-between space-x-4">
            <div className="flex flex-col bg-gray-50 shadow-sm p-4 rounded-lg border border-gray-200 flex-1 m-1">
              <span className="text-gray-800 text-sm sm:text-base font-semibold">Distance:</span>
              <span className="text-gray-600 text-sm sm:text-base">{data.totalDistance} km</span>
            </div>
            <div className="flex flex-col bg-gray-50 shadow-sm p-4 rounded-lg border border-gray-200 flex-1 m-1">
              <span className="text-gray-800 text-sm sm:text-base font-semibold">Duration:</span>
              <span className="text-gray-600 text-sm sm:text-base">{data.totalDuration} mins</span>
            </div>
            <div className="flex flex-col bg-gray-50 shadow-sm p-4 rounded-lg border border-gray-200 flex-1 m-1">
              <span className="text-gray-800 text-sm sm:text-base font-semibold">Stoppages:</span>
              <span className="text-gray-600 text-sm sm:text-base">{data.totalStoppageDuration}</span>
            </div>
            <div className="flex flex-col bg-gray-50 shadow-sm p-4 rounded-lg border border-gray-200 flex-1 m-1">
              <span className="text-gray-800 text-sm sm:text-base font-semibold">Idling Time:</span>
              <span className="text-gray-600 text-sm sm:text-base">{data.totalIdlingTimeInMinutes} mins</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 lg:w 1/3 bg-white shadow-lg rounded-lg p-6 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Trip Data</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-semibold text-left">Latitude</th>
              <th className="py-2 px-4 border-b font-semibold text-left">Longitude</th>
              <th className="py-2 px-4 border-b font-semibold text-left">Timestamp</th>
              <th className="py-2 px-4 border-b font-semibold text-left">Ignition</th>
            </tr>
          </thead>
          <tbody>
            {tripData.flat().map((trip, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{trip.latitude}</td>
                <td className="py-2 px-4 border-b">{trip.longitude}</td>
                <td className="py-2 px-4 border-b">{trip.timestamp}</td>
                <td className="py-2 px-4 border-b">{trip.ignition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadTrip
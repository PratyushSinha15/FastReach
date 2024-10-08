import React, { useState } from 'react';

interface Route {
  mode: string;
  description: string;
}

const RouteSearch: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState<Route | null>(null);
  const [dijkstraResult, setDijkstraResult] = useState<string | null>(null);

  const searchRoute = async () => {
    setDijkstraResult(null); // Resetting the result

    try {
      const response = await fetch(`http://localhost:5000/routes?source=${source}&destination=${destination}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.text(); 
      setDijkstraResult(result); 
    } catch (error) {
      console.error('Error fetching route:', error);
      setDijkstraResult('Error fetching route.'); 
    }
  };

  const bookTicket = () => {
    if (dijkstraResult) {
      alert('Ticket booked successfully!'); // Placeholder for booking action
    } else {
      alert('Please search for a route before booking a ticket.');
    }
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: rgb(2, 0, 36);
            background: linear-gradient(90deg, rgb(7, 0, 26) 5%, rgb(0, 0, 68) 100%);
            position: relative;
            min-height: 100vh; /* Ensure body takes at least full height */
          }

          .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: fade 2s infinite;
            opacity: 0;
          }

          @keyframes fade {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }

          .maindiv {
            background: rgba(7, 0, 26, 0.9);
            padding: 20px;
            max-width: 400px;
            margin: 50px auto;
            border-radius: 10px;
            color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1;
          }

          .title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px; /* Change title size */
            font-weight: bold; /* Change title weight */
          }

          .inputContainer {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .inputField {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            color: #333;
          }

          .searchButton, .bookButton {
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .searchButton:hover, .bookButton:hover {
            background-color: #0056b3;
          }

          .resultCard {
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
            color: #333;
            opacity: 0; /* Start hidden */
            animation: fadeIn 0.5s forwards; /* Fade in effect */
          }

          @keyframes fadeIn {
            to {
              opacity: 1; /* Fade to fully visible */
            }
          }

          .routeTitle {
            font-size: 20px; /* Change title size */
            font-weight: bold; /* Change title weight */
            margin-bottom: 10px; /* Space below title */
          }

          .routeDescription {
            font-size: 16px; /* Change description size */
            line-height: 1.5; /* Increase line height for readability */
          }

          .bookButton {
            margin-top: 10px;
            width: 100%; /* Full width */
          }
        `}
      </style>

      {/* Particle Animation */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="particle"
          style={{
            width: `${Math.random() * 10 + 5}px`, 
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}vh`, 
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`, 
          }}
        />
      ))}

      {/* JSX Structure */}
      <div className="maindiv">
        <h1 className="title">City Route Search</h1>

        <div className="inputContainer">
          <input
            type="text"
            value={source}
            placeholder="Enter source city"
            onChange={(e) => setSource(e.target.value)}
            className="inputField"
          />
          <input
            type="text"
            value={destination}
            placeholder="Enter destination city"
            onChange={(e) => setDestination(e.target.value)}
            className="inputField"
          />
          <button onClick={searchRoute} className="searchButton">
            Search
          </button>
        </div>

        {dijkstraResult && ( // Render Dijkstra result
          <div className="resultCard">
            <h2 className="routeTitle">Cost Effective Journey:</h2>
            <p className="routeDescription">{dijkstraResult}</p>
            <button onClick={bookTicket} className="bookButton">
              Book Ticket
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RouteSearch;

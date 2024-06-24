import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import DirectFlightCard from "../components/DirectFlightCard";
import ConnectingFlightCard from "../components/ConnectingFlightCard";
import PaymentForm from "../components/PaymentForm";
import FilterFlight from "../components/FilterFlight";

const FlightListPage = () => {
  const [directFlights, setDirectFlights] = useState([]);
  const [connectingFlights, setConnectingFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlights = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/flights/filter", {
        params: {
          isDirectFlight: filters.isDirectFlight,
          maxPrice: filters.maxPrice,
          maxFlightTime: filters.maxFlightTime,
        },
      });

      const { directFlights, connectingFlights } = response.data;
      setDirectFlights(directFlights || []);
      setConnectingFlights(connectingFlights || []);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleFilter = (filters) => {
    fetchFlights(filters);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 grid justify-items-center">
      <FilterFlight className="" onFilter={handleFilter} />

      {directFlights.length > 0 && (
        <div className="mt-8 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Direct Flights
          </h2>
          <div className="grid grid-cols-1 justify-items-center">
            {directFlights.map((flight) => (
              <div className="flex flex-col justify-center" key={flight.id}>
                <DirectFlightCard flight={flight} />
                <div className="my-3 mx-auto">
                  <PaymentForm
                    isConnectingFlight={false}
                    flightNumber1={flight.flightNumber}
                    economySeats1={flight.economySeat}
                    businessSeats1={flight.businessSeat}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {connectingFlights.length > 0 && (
        <div className="mt-8 grid grid-cols-1">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Connecting Flights
          </h2>
          <div className="grid grid-cols-1">
            {connectingFlights.map((flight, index) => (
              <div className="flex flex-col justify-center" key={index}>
                <ConnectingFlightCard className="w-96" flight={flight} />
                <div className="my-3 mx-auto">
                  <PaymentForm
                    isConnectingFlight={true}
                    flightNumber1={flight.flightNumber1}
                    economySeats1={flight.economySeat1}
                    businessSeats1={flight.businessSeat1}
                    flightNumber2={flight.flightNumber2}
                    economySeats2={flight.economySeat2}
                    businessSeats2={flight.businessSeat2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightListPage;

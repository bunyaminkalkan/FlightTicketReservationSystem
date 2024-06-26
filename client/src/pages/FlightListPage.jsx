import React, { useEffect, useState } from "react";
import axios from "axios";
import DirectFlightCard from "../components/DirectFlightCard";
import ConnectingFlightCard from "../components/ConnectingFlightCard";
import PaymentForm from "../components/PaymentForm";
import FilterFlight from "../components/FilterFlight";

const FlightListPage = () => {
  const [directFlights, setDirectFlights] = useState([]);
  const [connectingFlights, setConnectingFlights] = useState([]);

  const fetchFlights = async (filters = {}) => {
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
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleFilter = (filters) => {
    fetchFlights(filters);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="p-8 grid justify-items-center">
        <FilterFlight className="" onFilter={handleFilter} />

        {directFlights.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg bg-slate-200 font-semibold mb-4 text-center text-gray-800">
              Direct Flights
            </h2>
            <div className="grid grid-cols-1">
              {directFlights.map((flight) => (
                <div className="grid" key={flight.id}>
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
          <div className="mt-8">
            <h2 className="text-lg bg-slate-200 font-semibold mb-4 text-center text-gray-800">
              Connecting Flights
            </h2>
            <div className="grid grid-cols-1">
              {connectingFlights.map((flight, index) => (
                <div className="grid" key={index}>
                  <ConnectingFlightCard flight={flight} />
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
    </div>
  );
};

export default FlightListPage;

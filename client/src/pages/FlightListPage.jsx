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
    <div style={{ padding: "20px" }}>
      <FilterFlight onFilter={handleFilter} />

      {directFlights.length > 0 && (
        <>
          <h2>Direct Flights</h2>
          <Row gutter={[16, 16]}>
            {directFlights.map((flight) => (
              <Col span={8} key={flight.id}>
                <DirectFlightCard flight={flight} />
                <PaymentForm
                  isConnectingFlight={false}
                  flightNumber1={flight.flightNumber}
                  economySeats1={flight.economySeat}
                  businessSeats1={flight.businessSeat}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

      {connectingFlights.length > 0 && (
        <>
          <h2>Connecting Flights</h2>
          <Row gutter={[16, 16]}>
            {connectingFlights.map((flight, index) => (
              <Col span={8} key={index}>
                <ConnectingFlightCard flight={flight} />
                <PaymentForm
                  isConnectingFlight={true}
                  flightNumber1={flight.flightNumber1}
                  economySeats1={flight.economySeat1}
                  businessSeats1={flight.businessSeat1}
                  flightNumber2={flight.flightNumber2}
                  economySeats2={flight.economySeat2}
                  businessSeats2={flight.businessSeat2}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default FlightListPage;

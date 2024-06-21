import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col} from "antd";
import DirectFlightCard from "../components/DirectFlightCard";
import ConnectingFlightCard from "../components/ConnectingFlightCard";

const FlightListPage = () => {
  const location = useLocation();
  const { directFlights, connectingFlights } = location.state;

  return (
    <div style={{ padding: "20px" }}>
      {directFlights.length > 0 && (
        <>
          <h2>Direct Flights</h2>
          <Row gutter={[16, 16]}>
            {directFlights.map((flight) => (
              <Col span={8} key={flight.id}>
                <DirectFlightCard flight={flight} />
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
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default FlightListPage;

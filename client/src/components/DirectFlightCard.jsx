import React from "react";
import { Card } from "antd";
import PaymentForm from "../components/PaymentForm";

const DirectFlightCard = ({ flight }) => {
  return (
    <Card title={flight.flightNumber} bordered={false}>
      <p className="planeNumber">Plane Number: {flight.planeNumber}</p>
      <p className="departureLocation">
        Departure: {flight.departureLocation} at{" "}
        {new Date(flight.departureDate).toLocaleString()}
      </p>
      <p className="arrivalLocation">
        Arrival: {flight.arrivalLocation} at{" "}
        {new Date(flight.arrivalDate).toLocaleString()}
      </p>
      <p className="flightTime">Flight Time: {flight.flightTime}</p>
      <p className="buisnessPrice">Business Price: ${flight.businessPrice}</p>
      <p className="economyPrice">Economy Price: ${flight.economyPrice}</p>

      <PaymentForm
        isConnectingFlight={false}
        flightNumber1={flight.flightNumber}
        economySeats1={flight.economySeat}
        businessSeats1={flight.businessSeat}
      />
    </Card>
  );
};

export default DirectFlightCard;

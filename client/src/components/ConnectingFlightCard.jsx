import React from "react";
import { Card } from "antd";

const ConnectingFlightCard = ({ flight }) => {
  return (
    <>
      <Card
        title={`${flight.flightNumber1} & ${flight.flightNumber2}`}
        bordered={false}
      >
        <p>PlaneNumber 1: {flight.planeNumber1}</p>
        <p>
          Departure 1: {flight.departureLocation1} at{" "}
          {new Date(flight.departureDate1).toLocaleString()}
        </p>
        <p>
          Arrival 1: {flight.arrivalLocation1} at{" "}
          {new Date(flight.arrivalDate1).toLocaleString()}
        </p>
        <p>PlaneNumber 2: {flight.planeNumber2}</p>
        <p>
          Departure 2: {flight.departureLocation2} at{" "}
          {new Date(flight.departureDate2).toLocaleString()}
        </p>
        <p>
          Arrival 2: {flight.arrivalLocation2} at{" "}
          {new Date(flight.arrivalDate2).toLocaleString()}
        </p>
        <p>Total Flight Time: {flight.totalFlightTime}</p>
        <p>Total Waiting Time: {flight.totalWaitingTime}</p>
        <p>Total Time: {flight.totalTime}</p>
        <p>
          Total Business Price: ${flight.businessPrice1 + flight.businessPrice2}
        </p>
        <p>
          Total Economy Price: ${flight.economyPrice1 + flight.economyPrice2}
        </p>
      </Card>
    </>
  );
};

export default ConnectingFlightCard;

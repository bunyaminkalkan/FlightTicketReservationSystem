import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Card, Dropdown, Space, Typography} from "antd";
import PaymentForm from "../components/PaymentForm";

const DirectFlightCard = ({ flight }) => {
  const economySeat = flight.economySeat.map((seatNumber) => ({
    key: seatNumber.toString(),
    label: seatNumber,
  }));

  const businessSeat = flight.businessSeat.map((seatNumber) => ({
    key: seatNumber.toString(),
    label: seatNumber,
  }));

  const items = [
    {
      key: "1",
      label: "Economy Seat",
      children: economySeat,
    },
    {
      key: "2",
      label: "Business Seat",
      children: businessSeat,
    },
  ];

  console.log(items);
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
      <Dropdown
        menu={{
          items,
          selectable: true,
        }}
      >
        <Typography.Link>
          <Space>
            Seat
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
      <PaymentForm/>
    </Card>
  );
};

export default DirectFlightCard;

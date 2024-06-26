import React from "react";
import { Card } from "antd";
import SendIcon from "@mui/icons-material/Send";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirlinesIcon from "@mui/icons-material/Airlines";

const DirectFlightCard = ({ flight }) => {
  return (
    <Card
      title={<span style={{ fontSize: '24px', fontWeight: "normal" }}>{flight.flightNumber}</span>}
      bordered={false}
      styles={{title: {stle: {fontSize: "100px"}}}}
      style={{ width: "400px", height: "300px" , textAlign: "center"}}
    >
      <div className="flex gap-2 items-center justify-center">
        <AirlinesIcon color="primary" fontSize="small" />
        <p className="text-lg">Plane Number: {flight.planeNumber}</p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <p className="text-lg">{flight.departureLocation}</p>
        <SendIcon color="primary" fontSize="small" />
        <p className="text-lg">{flight.arrivalLocation}</p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <FlightTakeoffIcon color="primary" fontSize="small" />
        <p className="text-lg">
          {new Date(flight.departureDate).toLocaleString()}
        </p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <FlightLandIcon color="primary" fontSize="small" />
        <p className="text-lg">
          {new Date(flight.arrivalDate).toLocaleString()}
        </p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <AccessTimeIcon color="primary" fontSize="small" />
        <p className="text-lg">{flight.flightTime}</p>
      </div>
      <div className="flex gap-2 justify-center">
        <p className="text-lg">Business Price: ${flight.businessPrice}</p>
      </div>
      <div className="flex gap-2 justify-center">
        <p className="text-lg">Economy Price: ${flight.economyPrice}</p>
      </div>
    </Card>
  );
};

export default DirectFlightCard;

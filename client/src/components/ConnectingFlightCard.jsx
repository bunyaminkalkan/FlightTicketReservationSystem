import React from "react";
import { Card } from "antd";
import SendIcon from "@mui/icons-material/Send";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirlinesIcon from "@mui/icons-material/Airlines";
import FlightIcon from "@mui/icons-material/Flight";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

const ConnectingFlightCard = ({ flight }) => {
  console.log(flight);
  return (
    <>
      <Card
        title={
          <span style={{ fontSize: "24px", fontWeight: "normal" }}>
            {flight.flightNumber1} & {flight.flightNumber2}
          </span>
        }
        bordered={false}
        styles={{ title: { stle: { fontSize: "100px" } } }}
        style={{ width: "400px", height: "624px", textAlign: "center" }}
      >
        <div className="flex gap-2 items-center justify-center">
          <AirlinesIcon color="primary" fontSize="small" />
          <p className="text-lg">First Plane Number: {flight.planeNumber1}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <p className="text-lg">{flight.departureLocation1}</p>
          <SendIcon color="primary" fontSize="small" />
          <p className="text-lg">{flight.arrivalLocation1}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FlightTakeoffIcon color="primary" fontSize="small" />
          <p className="text-lg">
            {new Date(flight.departureDate1).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FlightLandIcon color="primary" fontSize="small" />
          <p className="text-lg">
            {new Date(flight.arrivalDate1).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-lg">
            First Flight Business Price: ${flight.businessPrice1}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-lg">
            Frist Flight Economy Price: ${flight.economyPrice1}
          </p>
        </div>
        <br />
        <div className="flex gap-2 items-center justify-center">
          <AirlinesIcon color="primary" fontSize="small" />
          <p className="text-lg">Second Plane Number: {flight.planeNumber2}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <p className="text-lg">{flight.departureLocation2}</p>
          <SendIcon color="primary" fontSize="small" />
          <p className="text-lg">{flight.arrivalLocation2}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FlightTakeoffIcon color="primary" fontSize="small" />
          <p className="text-lg">
            {new Date(flight.departureDate2).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FlightLandIcon color="primary" fontSize="small" />
          <p className="text-lg">
            {new Date(flight.arrivalDate2).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-lg">
            Second Flight Business Price: ${flight.businessPrice2}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-lg">
            Second Flight Economy Price: ${flight.economyPrice2}
          </p>
        </div>
        <br />
        <div className="flex gap-2 items-center justify-center">
          <FlightIcon color="primary" fontSize="small" />
          <p className="text-lg">{flight.totalFlightTime}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <PauseCircleOutlineIcon color="primary" fontSize="small" />
          <p className="text-lg">{flight.totalWaitingTime}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <AccessTimeIcon color="primary" fontSize="small" />
          <p className="text-lg">{flight.totalTime}</p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-lg">
            Total Business Price: $
            {flight.businessPrice1 + flight.businessPrice2}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-lg">
            Total Economy Price: ${flight.economyPrice1 + flight.economyPrice2}
          </p>
        </div>
      </Card>
    </>
  );
};

export default ConnectingFlightCard;

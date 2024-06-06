import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Button, message } from "antd";
import axios from "axios";
import "./SearchFlightPage.css";

const { Option } = Select;

const SearchFlightPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = "" + (d.getMonth() + 1);
    const day = "" + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      departureDay: values.departureDay ? formatDate(values.departureDay) : "",
    };
    console.log(formattedValues);
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/flights/search", {
        params: formattedValues,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      setFlights(response.data);
    } catch (error) {
      console.log(response);
      message.error("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Form
          name="flight_search"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            departureLocation: "Istanbul",
            departureDay: null,
            arrivalLocation: "New York City",
            airlineCompany: "",
          }}
        >
          <Form.Item
            name="departureLocation"
            label="Departure Location"
            rules={[
              {
                required: true,
                message: "Please select a departure location!",
              },
            ]}
          >
            <Input placeholder="Enter departure location" />
          </Form.Item>

          <Form.Item
            name="departureDay"
            label="Departure Day"
            rules={[
              { required: true, message: "Please select a departure day!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="arrivalLocation"
            label="Arrival Location"
            rules={[
              { required: true, message: "Please select an arrival location!" },
            ]}
          >
            <Input placeholder="Enter arrival location" />
          </Form.Item>

          <Form.Item name="airlineCompany" label="Airline Company">
            <Select placeholder="Select airline company (optional)">
              <Option value="">Any</Option>
              <Option value="THY">Turkish Airlines</Option>
              <Option value="BA">British Airways</Option>
              <Option value="EK">Emirates</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Search Flights
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <h2>Flight Results</h2>
        {flights.directFlights && flights.directFlights.length > 0 ? (
          <>
            <h3>Direct Flights</h3>
            <ul>
              {flights.directFlights.map((flight) => (
                <li key={flight.id}>
                  {flight.departureLocation} to {flight.arrivalLocation} on{" "}
                  {new Date(flight.departureDate).toLocaleString()} with flight
                  number {flight.flightNumber}. Business Price: $
                  {flight.businessPrice}, Economy Price: ${flight.economyPrice}.
                  <br />
                  Business Seats Available: {flight.businessSeat.join(", ")},
                  Economy Seats Available: {flight.economySeat.join(", ")}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No direct flights found</p>
        )}
        {flights.connectingFlights && flights.connectingFlights.length > 0 ? (
          <>
            <h3>Connecting Flights</h3>
            <ul>
              {flights.connectingFlights.map((flight, index) => (
                <li key={index}>
                  {flight.departureLocation1} to {flight.arrivalLocation1} on{" "}
                  {new Date(flight.departureDate1).toLocaleString()} with flight
                  number {flight.flightNumber1}. Then{" "}
                  {flight.departureLocation2} to {flight.arrivalLocation2} on{" "}
                  {new Date(flight.departureDate2).toLocaleString()} with flight
                  number {flight.flightNumber2}.
                  <br />
                  Total Economy Price: ${flight.totalEconomyPrice}, Total
                  Business Price: ${flight.totalBusinessPrice}.
                  <br />
                  Total Flight Time: {flight.totalFlightTime}, Total Waiting
                  Time: {flight.totalWaitingTime}, Total Time:{" "}
                  {flight.totalTime}.
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No connecting flights found</p>
        )}
      </div>
    </div>
  );
};

export default SearchFlightPage;

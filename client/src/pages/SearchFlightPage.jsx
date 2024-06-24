import React, { useState } from "react";
import { Form, DatePicker, Select, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchFlightPage.css";

const { Option } = Select;

const SearchFlightPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      const { connectingFlights, directFlights } = response.data;

      if (connectingFlights.length === 0 && directFlights.length === 0) {
        message.error("No flights found for the given criteria");
      } else {
        navigate("/flights", { state: response.data });
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center search-container">
      <div className="w-full max-w-md p-8 border border-gray-300 rounded-lg shadow-lg">
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
            <Select
              showSearch
              placeholder="Enter departure location"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "Istanbul",
                  label: "Istanbul",
                },
                {
                  value: "New York City",
                  label: "New York City",
                },
                {
                  value: "Berlin",
                  label: "Berlin",
                },
                {
                  value: "Los Angeles",
                  label: "Los Angeles",
                },
                {
                  value: "Paris",
                  label: "Paris",
                },
                {
                  value: "Dubai",
                  label: "Dubai",
                },
                {
                  value: "Singapore",
                  label: "Singapore",
                },
                {
                  value: "Hong Kong",
                  label: "Hong Kong",
                },
                {
                  value: "London Heathrow",
                  label: "London Heathrow",
                },
                {
                  value: "San Francisco",
                  label: "San Francisco",
                },
              ]}
            />
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
            <Select
              showSearch
              placeholder="Enter arrival location"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "Istanbul",
                  label: "Istanbul",
                },
                {
                  value: "New York City",
                  label: "New York City",
                },
                {
                  value: "Berlin",
                  label: "Berlin",
                },
                {
                  value: "Los Angeles",
                  label: "Los Angeles",
                },
                {
                  value: "Paris",
                  label: "Paris",
                },
                {
                  value: "Dubai",
                  label: "Dubai",
                },
                {
                  value: "Singapore",
                  label: "Singapore",
                },
                {
                  value: "Hong Kong",
                  label: "Hong Kong",
                },
                {
                  value: "London Heathrow",
                  label: "London Heathrow",
                },
                {
                  value: "San Francisco",
                  label: "San Francisco",
                },
              ]}
            />
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Search Flights
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SearchFlightPage;

import React, { useState } from "react";
import { Form, Button, Checkbox, TimePicker, InputNumber } from "antd";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./FilterFlight.css";

const FilterFlight = ({ onFilter }) => {
  const [form] = Form.useForm();
  const [alignment, setAlignment] = useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    form.setFieldsValue({ isDirectFlight: newAlignment });
  };

  const onFinish = (values) => {
    console.log(values);
    if (values.maxFlightTime) {
      values.maxFlightTime = values.maxFlightTime.format("HH:mm");
    }
    onFilter(values);
  };

  const format = "HH:mm";

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      className="flex flex-wrap items-center space-x-4"
    >
      <Form.Item name="isDirectFlight" valuePropName="checked">
        <Checkbox style={{ display: "none" }} />
      </Form.Item>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        size="small"
        // className="flex items-center text-white"
        classes={{ root: "toggle-group" }}
      >
        <ToggleButton
          value="true"
          className="hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Direct Flight
        </ToggleButton>
        <ToggleButton
          value=""
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          All
        </ToggleButton>
        <ToggleButton
          value="false"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Connecting Flight
        </ToggleButton>
      </ToggleButtonGroup>
      <Form.Item name="maxPrice" className="w-32">
        <InputNumber
          min={100}
          max={3000}
          className="w-full"
          placeholder="Max Price"
        />
      </Form.Item>
      <Form.Item name="maxFlightTime" className="w-32">
        <TimePicker
          format={format}
          minuteStep={15}
          placeholder="Max Total Time"
          className="w-full"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FilterFlight;

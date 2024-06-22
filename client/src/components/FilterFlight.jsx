import React from "react";
import { Form, Button, Checkbox, TimePicker, InputNumber } from "antd";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const FilterFlight = ({ onFilter }) => {
  const [form] = Form.useForm();
  const [alignment, setAlignment] = React.useState('none');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    form.setFieldsValue({ isDirectFlight: newAlignment });
  };

  const onFinish = (values) => {
    console.log(values)
    if (values.maxFlightTime) {
      values.maxFlightTime = values.maxFlightTime.format("HH:mm");
    }
    onFilter(values);
  };

  const format = "HH:mm";

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item name="isDirectFlight" valuePropName="checked">
        <Checkbox style={{ display: 'none' }} />
      </Form.Item>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="true">Direct Flight</ToggleButton>
        <ToggleButton value="none">All</ToggleButton>
        <ToggleButton value="false">Connecting Flight</ToggleButton>
      </ToggleButtonGroup>
      <Form.Item name="maxPrice">
        <InputNumber min={100} max={3000} />
      </Form.Item>
      <Form.Item name="maxFlightTime">
        <TimePicker
          format={format}
          minuteStep={15}
          placeholder="Max Total Time"
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


import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
} from "antd";
import axios from "axios";

const EditFlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8080/flights")
      .then((response) => {
        setFlights(response.data.sort((a, b) => a.id - b.id));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch flight data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this flight?"
            onConfirm={() => deleteFlight(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showEditModal = (flight) => {
    setCurrentFlight(flight);
    form.setFieldsValue(flight);
    setOpenEdit(true);
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      axios
        .put(`http://localhost:8080/flights/update/${currentFlight.id}`, {
          ...values,
          id: currentFlight.id,
        })
        .then((response) => {
          setFlights(
            flights.map((flight) =>
              flight.id === currentFlight.id ? { ...flight, ...values } : flight
            )
          );
          setOpenEdit(false);
          message.success("Update Successful");
        })
        .catch((error) => {
          message.error("Update Failed!");
        });
    });
  };

  const handleEditCancel = () => {
    setOpenEdit(false);
  };

  const handleAddOk = () => {
    addForm.validateFields().then((values) => {
      axios
        .post("http://localhost:8080/flights", values)
        .then((response) => {
          setFlights([...flights, response.data]);
          setOpenAdd(false);
          addForm.resetFields();
          message.success("Flight added successfully");
        })
        .catch((error) => {
          message.error("Failed to add flight!");
        });
    });
  };

  const handleAddCancel = () => {
    setOpenAdd(false);
    addForm.resetFields();
  };

  const deleteFlight = (id) => {
    axios
      .delete(`http://localhost:8080/flights/delete/${id}`)
      .then((response) => {
        setFlights(flights.filter((flight) => flight.id !== id));
        message.success("Flight deleted successfully");
      })
      .catch((error) => {
        message.error("Failed to delete flight!");
      });
  };

  return (
    <div className="min-h-screen">
      <div className="grid justify-items-center my-2">
        <Button
          type="primary"
          onClick={() => setOpenAdd(true)}
        >
          Add Flight
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={flights}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title="Edit Flight"
        open={openEdit}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical" name="editFlightForm">
          <Form.Item
            name="flightNumber"
            label="Flight Number"
            rules={[
              { required: true, message: "Please enter the flight number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="planeNumber"
            label="Plane Number"
            rules={[
              { required: true, message: "Please enter the plane number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="businessPrice"
            label="Business Price"
            rules={[
              {
                required: true,
                message: "Please enter the business class price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="economyPrice"
            label="Economy Price"
            rules={[
              {
                required: true,
                message: "Please enter the economy class price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="departureLocation"
            label="Departure Location"
            rules={[
              {
                required: true,
                message: "Please enter the departure location!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="departureDate"
            label="Departure Date"
            rules={[
              { required: true, message: "Please enter the departure date!" },
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            name="arrivalLocation"
            label="Arrival Location"
            rules={[
              { required: true, message: "Please enter the arrival location!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="arrivalDate"
            label="Arrival Date"
            rules={[
              { required: true, message: "Please enter the arrival date!" },
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Flight"
        open={openAdd}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        okText="Add"
      >
        <Form form={addForm} layout="vertical" name="addFlightForm">
          <Form.Item
            name="flightNumber"
            label="Flight Number"
            rules={[
              { required: true, message: "Please enter the flight number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="planeNumber"
            label="Plane Number"
            rules={[
              { required: true, message: "Please enter the plane number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="businessPrice"
            label="Business Price"
            rules={[
              {
                required: true,
                message: "Please enter the business class price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="economyPrice"
            label="Economy Price"
            rules={[
              {
                required: true,
                message: "Please enter the economy class price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="businessSeatCount"
            label="Count Of Business Seat"
            rules={[
              {
                required: true,
                message: "Please enter the count of business class seat!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="economySeatCount"
            label="Count Of Economy Seat"
            rules={[
              {
                required: true,
                message: "Please enter the count of economy class seat!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="departureLocation"
            label="Departure Location"
            rules={[
              {
                required: true,
                message: "Please enter the departure location!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="departureDate"
            label="Departure Date"
            rules={[
              { required: true, message: "Please enter the departure date!" },
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            name="arrivalLocation"
            label="Arrival Location"
            rules={[
              { required: true, message: "Please enter the arrival location!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="arrivalDate"
            label="Arrival Date"
            rules={[
              { required: true, message: "Please enter the arrival date!" },
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditFlightsPage;

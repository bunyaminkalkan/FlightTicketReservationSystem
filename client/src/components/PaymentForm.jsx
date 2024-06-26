import React, { useState } from "react";
import { Modal, Button, message, Input, TreeSelect } from "antd";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({
  isConnectingFlight,
  flightNumber1,
  economySeats1 = [],
  businessSeats1 = [],
  flightNumber2 = null,
  economySeats2 = [],
  businessSeats2 = [],
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [seat1, setSeat1] = useState();
  const [seat2, setSeat2] = useState();
  const [availableEconomySeats1, setAvailableEconomySeats1] =
    useState(economySeats1);
  const [availableBusinessSeats1, setAvailableBusinessSeats1] =
    useState(businessSeats1);
  const [availableEconomySeats2, setAvailableEconomySeats2] =
    useState(economySeats2);
  const [availableBusinessSeats2, setAvailableBusinessSeats2] =
    useState(businessSeats2);
  const [formValues, setFormValues] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleNumericInputChange = (evt) => {
    const { name, value } = evt.target;
    const numericValue = value.replace(/\D/g, "");

    setFormValues((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleTextInputChange = (evt) => {
    const { name, value } = evt.target;
    const textOnly = value.replace(/[^A-Za-z\s]/gi, "");

    setFormValues((prev) => ({ ...prev, [name]: textOnly }));
  };

  const handleInputFocus = (evt) => {
    setFormValues((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const renderDirectTreeSelect = () => {
    const economySeat = availableEconomySeats1.map((seatNumber) => ({
      value: seatNumber,
      title: seatNumber,
    }));

    const businessSeat = availableBusinessSeats1.map((seatNumber) => ({
      value: seatNumber,
      title: seatNumber,
    }));

    const treeData = [
      {
        title: "Economy Seats",
        children: economySeat,
        value: `1-0`,
        selectable: false,
      },
      {
        title: "Business Seats",
        children: businessSeat,
        value: `2-0`,
        selectable: false,
      },
    ];

    return (
      <TreeSelect
        style={{ width: "100%" }}
        value={seat1}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder={"Select Seat for Flight"}
        allowClear
        onChange={(newValue) => setSeat1(newValue)}
        treeData={treeData}
        placement="topLeft"
      />
    );
  };

  const renderConnectingTreeSelect = () => {
    const economySeat1 = availableEconomySeats1.map((seatNumber) => ({
      value: seatNumber,
      title: seatNumber,
    }));

    const businessSeat1 = availableBusinessSeats1.map((seatNumber) => ({
      value: seatNumber,
      title: seatNumber,
    }));

    const economySeat2 = availableEconomySeats2.map((seatNumber) => ({
      value: seatNumber,
      title: seatNumber,
    }));

    const businessSeat2 = availableBusinessSeats2.map((seatNumber) => ({
      value: seatNumber,
      title: seatNumber,
    }));

    const treeData1 = [
      {
        title: "Economy Seats",
        children: economySeat1,
        value: `1-0`,
        selectable: false,
      },
      {
        title: "Business Seats",
        children: businessSeat1,
        value: `2-0`,
        selectable: false,
      },
    ];

    const treeData2 = [
      {
        title: "Economy Seats",
        children: economySeat2,
        value: `3-0`,
        selectable: false,
      },
      {
        title: "Business Seats",
        children: businessSeat2,
        value: `4-0`,
        selectable: false,
      },
    ];

    return (
      <>
        <TreeSelect
          style={{ width: "100%" }}
          value={seat1}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder={"Select Seat for Flight 1"}
          allowClear
          onChange={(newValue) => setSeat1(newValue)}
          treeData={treeData1}
          placement="topLeft"
        />
        <TreeSelect
          style={{ width: "100%", marginTop: "1rem" }}
          value={seat2}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder={"Select Seat for Flight 2"}
          allowClear
          onChange={(newValue) => setSeat2(newValue)}
          treeData={treeData2}
          placement="topLeft"
        />
      </>
    );
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (!isConnectingFlight) {
      try {
        const response = await axios.post(
          "http://localhost:8080/tickets",
          {
            userId: 1,
            flightNumber: flightNumber1,
            seat: seat1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          setAvailableEconomySeats1((prevSeats) =>
            prevSeats.filter((seatNumber) => seatNumber !== seat1)
          );
          setAvailableBusinessSeats1((prevSeats) =>
            prevSeats.filter((seatNumber) => seatNumber !== seat1)
          );

          setTimeout(() => {
            setConfirmLoading(false);
            setOpen(false);
            setSeat1();
            message.success("Purchase success");
          }, 1000);
        }
      } catch (error) {
        console.error("Error purchasing ticket:", error);
        message.error("Purchase failed");
        setConfirmLoading(false);
      }
    } else {
      try {
        const response1 = await axios.post(
          "http://localhost:8080/tickets",
          {
            userId: 1,
            flightNumber: flightNumber1,
            seat: seat1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response1);

        const response2 = await axios.post(
          "http://localhost:8080/tickets",
          {
            userId: 1,
            flightNumber: flightNumber2,
            seat: seat2,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response2);

        if (response1.status === 200 && response2.status === 200) {
          setAvailableEconomySeats1((prevSeats) =>
            prevSeats.filter((seatNumber) => seatNumber !== seat1)
          );
          setAvailableBusinessSeats1((prevSeats) =>
            prevSeats.filter((seatNumber) => seatNumber !== seat1)
          );
          setAvailableEconomySeats2((prevSeats) =>
            prevSeats.filter((seatNumber) => seatNumber !== seat2)
          );
          setAvailableBusinessSeats2((prevSeats) =>
            prevSeats.filter((seatNumber) => seatNumber !== seat2)
          );

          setTimeout(() => {
            setConfirmLoading(false);
            setOpen(false);
            setSeat1();
            setSeat2();
            message.success("Purchase success");
          }, 1000);
        }
      } catch (error) {
        console.error("Error purchasing ticket:", error);
        message.error("Purchase failed");
        setConfirmLoading(false);
      }
    }
  };

  const isLoggedIn = () => {
    const isLogged = Boolean(localStorage.getItem("id"));
    if (isLogged) {setOpen(true)}
    else {navigate("/login")}
  };

  return (
    <>
      <Button
        type="primary"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={isLoggedIn}
      >
        Purchase
      </Button>

      <Modal
        title={
          <div className="text-center text-gray-800 w-full">
            Payment Information
          </div>
        }
        open={open}
        onOk={handleOk}
        okText="Purchase"
        confirmLoading={confirmLoading}
        onCancel={() => {
          setOpen(false);
          setSeat1();
          setSeat2();
        }}
      >
        <div className="flex justify-center mb-4">
          <Cards
            number={formValues.number}
            expiry={formValues.expiry}
            cvc={formValues.cvc}
            name={formValues.name}
            focused={formValues.focus}
            placeholders={{ name: "Full Name" }}
          />
        </div>
        <form className="space-y-4">
          <Input
            type="text"
            minLength={16}
            maxLength={16}
            name="number"
            placeholder="Card Number"
            value={formValues.number}
            onChange={handleNumericInputChange}
            onFocus={handleInputFocus}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            minLength={4}
            maxLength={4}
            name="expiry"
            placeholder="MM/YY"
            value={formValues.expiry}
            onChange={handleNumericInputChange}
            onFocus={handleInputFocus}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            minLength={3}
            maxLength={3}
            name="cvc"
            placeholder="CVC"
            value={formValues.cvc}
            onChange={handleNumericInputChange}
            onFocus={handleInputFocus}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            minLength={6}
            maxLength={40}
            name="name"
            placeholder="Full Name"
            value={formValues.name}
            onChange={handleTextInputChange}
            onFocus={handleInputFocus}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </form>
        <div className="mt-4">
          {isConnectingFlight
            ? renderConnectingTreeSelect()
            : renderDirectTreeSelect()}
        </div>
      </Modal>
    </>
  );
};

export default PaymentForm;

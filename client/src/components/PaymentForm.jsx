import React, { useState } from "react";
import { Modal, Button, message, Input } from "antd";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      message.success("Purchase success");
    }, 2000);
  };

  const [formValues, setFormValues] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleNumericInputChange = (evt) => {
    const { name, value } = evt.target;
    const numericValue = value.replace(/\D/g, '');
  
    setFormValues((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleTextInputChange = (evt) => {
    const { name, value } = evt.target;
    const textOnly = value.replace(/[^A-Za-z]/gi, '');
  
    setFormValues((prev) => ({ ...prev, [name]: textOnly }));
  };

  const handleInputFocus = (evt) => {
    setFormValues((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Purchase
      </Button>
      <Modal
        title="Payment Information"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <Cards
          number={formValues.number}
          expiry={formValues.expiry}
          cvc={formValues.cvc}
          name={formValues.name}
          focused={formValues.focus}
          placeholders={{ name: "Full Name" }}
        />
        <form>
          <Input
            type="text"
            maxLength={16}
            name="number"
            placeholder="Card Number"
            value={formValues.number}
            onChange={handleNumericInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            maxLength={4}
            name="expiry"
            placeholder="MM/YY"
            value={formValues.expiry}
            onChange={handleNumericInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            maxLength={3}
            name="cvc"
            placeholder="CVC"
            value={formValues.cvc}
            onChange={handleNumericInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            maxLength={40}
            name="name"
            placeholder="Full Name"
            value={formValues.name}
            onChange={handleTextInputChange}
            onFocus={handleInputFocus}
          />
        </form>
      </Modal>
    </>
  );
};

export default PaymentForm;

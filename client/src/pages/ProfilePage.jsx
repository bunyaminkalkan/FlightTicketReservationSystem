import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const password = localStorage.getItem("password");
    const id = localStorage.getItem("id");

    form.setFieldsValue({
      email,
      firstName,
      lastName,
      password,
    });

    setId(id);
  }, [form]);

  const onFinish = (values) => {
    axios
      .put(`http://localhost:8080/users/update/${id}`, values)
      .then((response) => {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("lastName", response.data.lastName);
        message.success("Update successful");
      })
      .catch((error) => {
        message.error("Update failed");
      });
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-lg bg-slate-200">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Profile Information
      </h2>
      <Form
        form={form}
        name="profileForm"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input className="w-full p-2 border border-gray-300 rounded" />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: false }]}
        >
          <Input className="w-full p-2 border border-gray-300 rounded" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: false }]}
        >
          <Input className="w-full p-2 border border-gray-300 rounded" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-gray-800 border-gray-600 text-white py-2 px-4 rounded"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#64748B"; // Tailwind hover:bg-slate-500
              e.currentTarget.style.borderColor = "#64748B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#334155";
              e.currentTarget.style.borderColor = "#334155";
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;

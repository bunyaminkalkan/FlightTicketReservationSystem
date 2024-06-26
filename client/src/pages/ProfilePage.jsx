import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
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
    console.log(values);
    axios
      .put(`http://localhost:8080/users/update/${id}`, values)
      .then((response) => {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("lastName", response.data.lastName);
        navigate("/profile");
        message.success("Update successful");
      })
      .catch((error) => {
        message.error("Update failed");
      });
  };
  return (
    <div
      className="bg-slate-100 flex justify-center items-center"
      style={{ height: "579.5px" }}
    >
      <div className="w-full max-w-md p-8 bg-slate-300 border border-gray-300 rounded-lg shadow-lg">
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
                e.currentTarget.style.backgroundColor = "#64748B";
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
    </div>
  );
};

export default ProfilePage;

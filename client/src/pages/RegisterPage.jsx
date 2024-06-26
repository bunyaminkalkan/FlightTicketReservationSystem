import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const RegisterPage = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        values
      );
      console.log(response);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("isAdmin", false);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      message.success("Registration successful");
      window.location.href = "/";
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Registration form validation failed:", errorInfo);
  };

  return (
    <div
      className="bg-slate-100 flex justify-center items-center"
      style={{ height: "579.5px" }}
    >
      <div className="w-full max-w-md p-8 bg-slate-300 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            className="mb-4"
          >
            <Input className="w-full px-3 py-2 border rounded" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-4"
          >
            <Input.Password className="w-full px-3 py-2 border rounded" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
            className="mb-4"
          >
            <Input.Password className="w-full px-3 py-2 border rounded" />
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;

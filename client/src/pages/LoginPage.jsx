import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state.from;

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        values
      );
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      if (response.data.role === "ADMIN") {
        localStorage.setItem("isAdmin", true);
      } else {
        localStorage.setItem("isAdmin", false);
      }
      message.success("Login Successfully");
      navigate(from, { replace: true });
    } catch (error) {
      message.error("Email or password is not correct!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Login form validation failed:", errorInfo);
  };

  return (
    <div
      className="bg-slate-100 flex justify-center items-center"
      style={{ height: "579.5px" }}
    >
      <div className="w-full max-w-md p-8 bg-slate-300 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form
          name="login"
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
            <Input className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-4"
          >
            <Input.Password className="w-full p-2 border border-gray-300 rounded" />
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
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", values);
      console.log(response)
      localStorage.setItem("id", response.data.id);
      if(response.data.role === 'ADMIN') {
        localStorage.setItem("isAdmin", true)
      }else {
        localStorage.setItem("isAdmin", false)
      }
      message.success("Login Successfully")
      navigate("/");
      
    } catch (error) {
      message.error("Email or password is not correct!")
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Login form validation failed:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <h1>Login</h1>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

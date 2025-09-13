import React from "react";
import { Button, Checkbox, Form, Input, ConfigProvider, theme, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        {
          name: values.name,
          mailId: values.username,
          password: values.password,
        }
      );

      if (result.status === 201) {
        message.success("Signup successful 🎉");
        localStorage.setItem("user", JSON.stringify(result.data.user || {}));
        localStorage.setItem("token", JSON.stringify(result.data.token || {}));
        navigate("/");
      } else {
        message.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      message.error("Something went wrong!");
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgContainer: "#1e1e1e",
          colorText: "#f5f5f5",
          colorBorder: "#3a3a3a",
          colorPrimary: "#1677ff",
        },
      }}
    >
      <div
        style={{
          background: "#121212",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          layout="vertical"
          style={{
            width: 400,
            padding: "2rem",
            background: "#1e1e1e",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="username"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" block onClick={() => navigate("/login")}>
              Already have an account? Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default Signup;

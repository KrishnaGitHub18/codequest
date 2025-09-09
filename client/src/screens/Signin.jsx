import React from "react";
import { Button, Checkbox, Form, Input, ConfigProvider, theme } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log("Success:", values);

      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signin`,
        {
          mailId: values.username,
          password: values.password,
        }
      );

      if (result.status === 200) {
        alert("Login successful");
        localStorage.setItem("user", JSON.stringify(result.data.user || {}));
        navigate("/");
        
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      alert("Something went wrong!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 400,
            padding: "2rem",
            background: "#1e1e1e",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: "#f5f5f5" }}>Username</span>}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#f5f5f5" }}>Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox style={{ color: "#f5f5f5" }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default Signin;

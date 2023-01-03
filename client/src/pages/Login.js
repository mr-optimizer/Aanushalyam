import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const Login = () => {
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <div className="authentication">
      <div className="authentication-form card">
        <h1 className="card-title">Welcome back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="abcde@gmail.com" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="*************" type="password" />
          </Form.Item>
          <Button className="primary-button" htmlType="submit">
            Login
          </Button>
          <Link to="/register" className="anchor">
            Click here to register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;

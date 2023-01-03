import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const Register = () => {
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <div className="authentication">
      <div className="authentication-form card">
        <h1 className="card-title">Nice To Meet You</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="abcde@gmail.com" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="*************" type="password" />
          </Form.Item>
          <Button className="primary-button" htmlType="submit">
            Register
          </Button>
          <Link to="/login" className="anchor">
            Click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;

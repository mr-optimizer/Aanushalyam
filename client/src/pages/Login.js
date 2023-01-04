import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(value) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", value);
      dispatch(hideLoading());
      if(response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong!");
    }
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

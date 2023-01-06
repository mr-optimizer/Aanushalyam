import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useState } from "react";
import { Row, Col } from "antd";
import Doctor from "./../components/DoctorCard";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "./../redux/alertSlice";

function Home() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const getData = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setDoctors(response.data.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;

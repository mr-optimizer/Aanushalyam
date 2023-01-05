import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
// import moment from "moment";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    let sDate = new Date(values.timings[0].$d);
    let eDate = new Date(values.timings[1].$d);
    let sh = "";
    let eh = "";
    let sm = "";
    let em = "";
    if (sDate.getHours() < 10) {
      sh = "0" + sDate.getHours();
    } else {
      sh = sDate.getHours();
    }
    if (sDate.getMinutes() < 10) {
      sm = "0" + sDate.getMinutes();
    } else {
      sm = sDate.getMinutes();
    }
    if (eDate.getHours() < 10) {
      eh = "0" + eDate.getHours();
    } else {
      eh = eDate.getHours();
    }
    if (eDate.getMinutes() < 10) {
      em = "0" + eDate.getMinutes();
    } else {
      em = eDate.getMinutes();
    }
    let sTime = sh + ":" + sm;
    let eTime = eh + ":" + em;
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: [sTime, eTime],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log(stime, etime);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error while updating profile");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />

      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;

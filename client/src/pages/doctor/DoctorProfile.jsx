import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
// import moment from "moment";

function DoctorProfile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
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
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            sTime, eTime
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-user-id",
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Layout>
  );
}

export default DoctorProfile;

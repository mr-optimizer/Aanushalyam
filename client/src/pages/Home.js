import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";

function Home() {
  // const navigate = useNavigate();

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      // if(!token) return navigate("/login", { replace: true });
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <Layout>
    <div>Home</div>
  </Layout>;
}

export default Home;

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserList from "./pages/admin/UserList";
import ApplyDoctor from "./pages/ApplyDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import Notifications from "./pages/Notifications";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import BookAppointment from "./pages/BookAppointment";
import PublicRouts from "./components/PublicRouts";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <Spin size="large" />
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouts>
              <Login />
            </PublicRouts>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouts>
              <Register />
            </PublicRouts>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoutes>
              <Notifications />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/user-list"
          element={
            <ProtectedRoutes>
              <UserList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/doctor-list"
          element={
            <ProtectedRoutes>
              <DoctorsList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/doctor/profile/:id"
          element={
            <ProtectedRoutes>
              <DoctorProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/book-appointment/:id"
          element={
            <ProtectedRoutes>
              <BookAppointment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoutes>
              <Appointments />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoutes>
              <DoctorAppointments />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRouts from "./components/PublicRouts";
import ApplyDoctor from "./pages/ApplyDoctor";
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

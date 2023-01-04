import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./../layout.css";
const Layout = (props) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: `/profile/`,
      icon: "ri-user-line",
    },
  ];

  //   const doctorMenu = [
  //     {
  //       name: "Home",
  //       path: "/",
  //       icon: "ri-home-line",
  //     },
  //     {
  //       name: "Appointments",
  //       path: "/doctor/appointments",
  //       icon: "ri-file-list-line",
  //     },
  //     {
  //       name: "Profile",
  //       path: `/doctor/profile/${user?._id}`,
  //       icon: "ri-user-line",
  //     },
  //   ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="wrapper">
      <div className="layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1>BD</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  className={`menu-item ${isActive && "active-menu-item"}`}
                  key={index}
                >
                  <i className={item.icon}></i>
                  {!collapsed && <Link to={item.path}>{item.name}</Link>}
                </div>
              );
            })}
            <div className="menu-item" onClick={(()=>{
                localStorage.clear();
                navigate("/login");
            })}>
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="header-bar">
              <i className="ri-notification-3-line header-action-icon"></i>
              <div>
                <Link className="anchor">{user?.name}</Link>
              </div>
            </div>
          </div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

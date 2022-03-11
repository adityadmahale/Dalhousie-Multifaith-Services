import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/home";
import LoginUser from "./components/loginUser";
import LoginChaplain from "./components/loginChaplain";
import RegisterChaplain from "./components/registerChaplain";
import RegisterUser from "./components/registerUser";
import Logout from "./components/logout";
import Profile from "./components/profile";
import ChaplainList from "./components/chaplains";
import RecoveryEmail from "./components/recoveryEmail";
import RecoveryCode from "./components/recoveryCode";
import RecoveryPassword from "./components/recoveryPassword";
import ChaplainDetails from "./components/chaplainDetails";
import NotFound from "./components/notFound";
import Header from "./components/header";
import AppointmentHistory from "./components/appointmentHistory";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const { pathname: route } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      {isHeaderRequired(route) ? <Header /> : null}
      <div className="container pt-4">
        <Routes>
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/chaplain" element={<RegisterChaplain />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/chaplain" element={<LoginChaplain />} />
          <Route path="/recovery/email" element={<RecoveryEmail />} />
          <Route path="/recovery/code" element={<RecoveryCode />} />
          <Route path="/recovery/password" element={<RecoveryPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/chaplains/:id" element={<ChaplainDetails />} />
          <Route path="/chaplains" element={<ChaplainList />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/appointment-history" element={<AppointmentHistory />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

const isHeaderRequired = (route) => {
  const noHeaderLinks = [
    "/login/user",
    "/login/chaplain",
    "/register/user",
    "/register/chaplain",
    "/recovery/email",
    "/recovery/code",
    "/recovery/password",
  ];
  if (noHeaderLinks.includes(route)) {
    return false;
  }

  return true;
};

export default App;

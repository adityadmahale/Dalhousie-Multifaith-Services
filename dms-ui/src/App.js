import React, { useEffect, useState } from "react";
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
import EventDetails from "./components/eventsDetails";
import Events from "./components/events"
import auth from "./services/authService";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { pathname: route } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    };

    getData();
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      {isHeaderRequired(route) ? <Header user={user} /> : null}
      <div className="container pt-4">
        <Routes>
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/chaplain" element={<RegisterChaplain />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/chaplain" element={<LoginChaplain />} />
          <Route path="/recovery/email" element={<RecoveryEmail />} />
          <Route path="/recovery/code" element={<RecoveryCode />} />
          <Route path="/recovery/password" element={<RecoveryPassword />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/logout"
            element={
              <ProtectedRoute user={user}>
                <Logout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          { <Route
            path="/chaplains/:id"
            element={
              <ProtectedRoute user={user}>
                <ChaplainDetails />
              </ProtectedRoute>
            }
          />}
          
          { <Route
            path="/chaplains"
            element={
              <ProtectedRoute user={user}>
                <ChaplainList />
              </ProtectedRoute>
            }
          /> }
          <Route
            path="/appointment-history"
            element={
              <ProtectedRoute user={user}>
                <AppointmentHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute user={user}>
                <Events/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute user={user}>
                <EventDetails/>
              </ProtectedRoute>
            }
          />
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

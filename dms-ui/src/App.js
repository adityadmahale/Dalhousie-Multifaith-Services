import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/common/home";
import LoginUser from "./components/auth/loginUser";
import LoginChaplain from "./components/auth/loginChaplain";
import RegisterChaplain from "./components/auth/registerChaplain";
import RegisterUser from "./components/auth/registerUser";
import Logout from "./components/auth/logout";
import Profile from "./components/profile/profile";
import ChaplainList from "./components/chaplain/chaplains";
import RecoveryEmail from "./components/recovery/recoveryEmail";
import RecoveryCode from "./components/recovery/recoveryCode";
import RecoveryPassword from "./components/recovery/recoveryPassword";
import ChaplainDetails from "./components/chaplain/chaplainDetails";
import NotFound from "./components/common/notFound";
import Header from "./components/common/header";
import AppointmentHistory from "./components/appointment/appointmentHistory";
import EventDetails from "./components/event/eventsDetails";
import Events from "./components/event/events";
import Timesheet from "./components/timesheet/timesheet"
import auth from "./services/authService";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Questionnaire from "./components/questionnaire/questionnaire";


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

          <Route
            path="/chaplains/:id"
            element={
              <ProtectedRoute user={user}>
                <ChaplainDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chaplains"
            element={
              <ProtectedRoute user={user}>
                <ChaplainList />
              </ProtectedRoute>
            }
          />

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
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute user={user}>
                <EventDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/timesheet"
            element={
              <ProtectedRoute user={user}>
                <Timesheet />
              </ProtectedRoute>
            }
          />
          <Route
              path="/questionnaire"
              element={
                <ProtectedRoute user={user}>
                  <Questionnaire />
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

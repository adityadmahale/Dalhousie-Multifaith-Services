import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import Timesheet from "./components/timesheet/timesheet";
import auth from "./services/authService";
import { ToastContainer, toast } from "react-toastify";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Questionnaire from "./components/questionnaire/questionnaire";
import AppointmentContext from "./context/appointmentContext";
import ChaplainContext from "./context/chaplainContext";
import TimesheetContext from "./context/timesheetContext";
import ListError from "./components/common/listError";
import { getAppointments, updateAppointment } from "./services/appointment";
import { getChaplains } from "./services/chaplains";
import { getEvents, addEvent, updateEvent } from "./services/events";
import { getTimesheet, createTimesheet } from "./services/timesheet";
import Homepage from "./components/homepage/homepage";
import EventContext from "./context/eventContext";

function App() {
  const { pathname: route } = useLocation();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [chaplains, setChaplains] = useState([]);
  const [events, setEvents] = useState([]);
  const [timesheet, setTimesheet] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        let user_id, chaplain_id;
        if (currentUser.user.is_staff) {
          user_id = 0;
          chaplain_id = currentUser.id;
        } else {
          user_id = currentUser.id;
          chaplain_id = 0;
        }
        const { data: dataAppointments } = await getAppointments(
          user_id,
          chaplain_id
        );
        setAppointments(dataAppointments);
        const { data: dataChaplains } = await getChaplains();
        setChaplains(dataChaplains);
        const { data: dataEvents } = await getEvents();
        setEvents(dataEvents);
        if (currentUser.user.is_staff) {
          const { data: dataTimesheet } = await getTimesheet(chaplain_id);
          setTimesheet(dataTimesheet);
        }
      }
    };

    getData();
  }, []);

  const handleTimesheetSubmit = async (createTimeEvent) => {
    try {
      await createTimesheet(createTimeEvent);
      window.location = "/";
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        toast.error(<ListError errors={Object.values(ex.response.data)} />);
      }
    }
  };

  const handleBooking = async (event) => {
    try {
      await updateEvent(event.id);
      window.location = "/";
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        toast.error(<ListError errors={Object.values(ex.response.data)} />);
      }
    }
  };

  const handleAddEvent = async (e, event) => {
    e.preventDefault();
    try {
      await addEvent(event);
      window.location = "/";
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        toast.error(<ListError errors={Object.values(ex.response.data)} />);
      }
    }
  };

  const handleConfirmClick = async (action, selectedAppointment) => {
    const originalAppointments = appointments;
    const appointmentsData = [...appointments];
    const index = appointmentsData.indexOf(selectedAppointment);
    appointmentsData[index] = { ...selectedAppointment };
    if (action === "confirm") {
      appointmentsData[index].status = "confirmed";
    } else if (action === "reject") {
      appointmentsData[index].status = "cancelled";
    }
    setAppointments(appointmentsData);
    try {
      await updateAppointment(appointmentsData[index]);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        setAppointments(originalAppointments);
        toast.error(<ListError errors={Object.values(ex.response.data)} />);
      }
    }
  };

  return (
    <TimesheetContext.Provider value={{ timesheet, handleTimesheetSubmit }}>
      <EventContext.Provider value={{ events, handleAddEvent, handleBooking }}>
        <AppointmentContext.Provider
          value={{ appointments, handleConfirmClick }}
        >
          <ChaplainContext.Provider value={{ chaplains }}>
            <React.Fragment>
              <ToastContainer />
              {isHeaderRequired(route) ? <Header user={user} /> : null}
              <div className="container pt-4">
                <Routes>
                  <Route path="/register/user" element={<RegisterUser />} />
                  <Route
                    path="/register/chaplain"
                    element={<RegisterChaplain />}
                  />
                  <Route path="/login/user" element={<LoginUser />} />
                  <Route path="/login/chaplain" element={<LoginChaplain />} />
                  <Route path="/recovery/email" element={<RecoveryEmail />} />
                  <Route path="/recovery/code" element={<RecoveryCode />} />
                  <Route
                    path="/recovery/password"
                    element={<RecoveryPassword />}
                  />
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
                        <ChaplainDetails user={user} />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/chaplains"
                    element={
                      <ProtectedRoute user={user}>
                        <ChaplainList user={user} />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/appointment-history"
                    element={
                      <ProtectedRoute user={user}>
                        <AppointmentHistory user={user} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/timesheet"
                    element={
                      <ProtectedRoute user={user}>
                        <Timesheet user={user} />
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
                    path="/questionnaire"
                    element={
                      <ProtectedRoute user={user}>
                        <Questionnaire />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/home" element={<Homepage />} />
                  <Route path="/" element={<Homepage />} />
                  <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
              </div>
            </React.Fragment>
          </ChaplainContext.Provider>
        </AppointmentContext.Provider>
      </EventContext.Provider>
    </TimesheetContext.Provider>
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

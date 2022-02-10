import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import Profile from "./components/profile";
import ChaplainList from "./components/chaplains";
import ChaplainDetails from "./components/chaplainDetails";
import NotFound from "./components/notFound";
import Recovery from "./components/recovery";
import Header from "./components/header";

function App() {
  const { pathname: route } = useLocation();

  return (
    <React.Fragment>
      {isHeaderRequired(route) ? <Header /> : null}
      <div className="container pt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chaplains/:id" element={<ChaplainDetails />} />
          <Route path="/chaplains" element={<ChaplainList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

const isHeaderRequired = (route) => {
  const noHeaderLinks = ["/login", "/register"];
  if (noHeaderLinks.includes(route)) {
    return false;
  }

  return true;
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Recovery from "./components/recovery";

function App() {
  return (
    <div className="container pt-4">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

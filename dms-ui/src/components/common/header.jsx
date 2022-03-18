import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./modal";

const Header = ({ user }) => {
  const collapseRef = React.createRef();
  const [screenWidth, setScreenWidth] = useState(0);
  const navigate = useNavigate();
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [screenWidth]);

  const handleCollapse = () => {
    if (screenWidth < 992) collapseRef.current.click();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <button
        ref={collapseRef}
        className="navbar-toggler m-2 mr-auto"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          {user && (
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" onClick={handleCollapse}>
                Home
              </NavLink>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/profile"
                onClick={handleCollapse}
              >
                Profile
              </NavLink>
            </li>
          )}

          {user && !user.user.is_staff && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/chaplains"
                onClick={handleCollapse}
              >
                Chaplains
              </NavLink>
            </li>
          )}
          {user && !user.user.is_staff && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/questionnaire"
                  onClick={handleCollapse}
                >
                  Questionnaire
                </NavLink>
              </li>
           )}
          {user && !user.user.is_staff && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/events"
                onClick={handleCollapse}
              >
                Events
              </NavLink>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/appointment-history"
                onClick={handleCollapse}
              >
                Appointments
              </NavLink>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/logout"
                onClick={handleCollapse}
              >
                Logout
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleCollapse();
                  setModalType("login");
                }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
              >
                Login
              </span>
            </li>
          )}

          {!user && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleCollapse();
                  setModalType("register");
                }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
              >
                Register
              </span>
            </li>
          )}
        </ul>
      </div>
      <Modal id="exampleModal1">{modalContent(modalType, navigate)}</Modal>
    </nav>
  );
};

const modalContent = (type, navigate) => {
  return (
    <div className="card-head">
      <div className="row">
        <div
          onClick={() => {
            navigate(`/${type}/chaplain`);
          }}
          className="col-12 col-md-6 card-individual"
          data-bs-dismiss="modal"
        >
          <i className="ri-health-book-fill ri-3x"></i>
          <p>Chaplain</p>
        </div>
        <div
          onClick={() => {
            navigate(`/${type}/user`);
          }}
          className="col-12 col-md-6 card-individual"
          data-bs-dismiss="modal"
        >
          <i className="ri-book-open-fill ri-3x"></i>
          <p>Student</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("register");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.defaultTab === "login") {
      setActiveTab("login");
    }
  }, [location.state]);

  const switchToLoginTab = () => {
    setActiveTab("login");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
          </li>
        </ul>
        <div className="tab-content p-3 border border-top-0">
          {activeTab === "register" ? (
            <Register onRegisterSuccess={switchToLoginTab} />
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

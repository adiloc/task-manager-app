import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/slices/authSlice";
import { RootState } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <span className="navbar-brand">Task Manager</span>
        {isAuthenticated && (
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;

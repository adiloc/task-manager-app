import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TaskPage from "./pages/TaskPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/" element={<ProtectedRoute element={<TaskPage />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

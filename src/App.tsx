import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import AuthPage from "./pages/AuthPage";
import TaskList from "./components/TaskList";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/tasks" element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TaskList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

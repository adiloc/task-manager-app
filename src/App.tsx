import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TaskList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

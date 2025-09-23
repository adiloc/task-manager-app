import React, { useState, useEffect, useMemo } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome</h2>
        <button className="btn btn-secondary">Logout</button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by title..."
          />
          <button className="btn btn-outline-secondary"></button>
        </div>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default TaskList;

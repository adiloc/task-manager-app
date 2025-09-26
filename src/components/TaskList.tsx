import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api, Task, User } from "../api";

// --- TaskList Component --- //
const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Search and Sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const navigate = useNavigate();
  const loggedInUser: User | null = useMemo(
    () => JSON.parse(localStorage.getItem("loggedInUser") || "null"),
    [],
  );

  const fetchTasks = useCallback(async () => {
    if (!loggedInUser) return;
    try {
      setLoading(true);
      const userTasks = await api.getTasks(loggedInUser.email);
      setTasks(userTasks);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/auth");
    } else {
      fetchTasks();
    }
  }, [loggedInUser, navigate, fetchTasks]);

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => {
        const dateA = new Date(a.createDate).getTime();
        const dateB = new Date(b.createDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [tasks, searchTerm, sortOrder]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/auth", { state: { defaultTab: "login" } });
  };

  const openModal = (task: Task | null = null) => {
    setEditingTask(task);
    setTaskTitle(task ? task.title : "");
    setTaskDescription(task ? task.description : "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setTaskTitle("");
    setTaskDescription("");
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !loggedInUser) return;

    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title: taskTitle,
        description: taskDescription,
      };
      await api.updateTask(updatedTask);
    } else {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        createDate: new Date().toISOString(),
        userId: loggedInUser.email,
      };
      await api.addTask(newTask);
    }
    await fetchTasks();
    closeModal();
  };

  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await api.deleteTask(taskId);
      await fetchTasks();
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (!loggedInUser) return null;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {loggedInUser.fname}!</h2>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={() => openModal()} className="btn btn-primary">
          Add Task
        </button>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={toggleSortOrder}
            className="btn btn-outline-secondary"
          >
            Sort by Date ({sortOrder === "asc" ? "Oldest" : "Newest"})
          </button>
        </div>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && filteredAndSortedTasks.length === 0 ? (
        <p>
          No tasks found. Get started by adding a new one or clear your search
          filter!
        </p>
      ) : (
        <ul className="list-group">
          {filteredAndSortedTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{task.title}</h5>
                <p className="mb-1">{task.description}</p>
                <small>
                  Created: {new Date(task.createDate).toLocaleDateString()}
                </small>
              </div>
              <div>
                <button
                  onClick={() => openModal(task)}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal show fade"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSaveTask}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingTask ? "Edit Task" : "Add Task"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="taskTitle"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="taskDescription"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default TaskList;

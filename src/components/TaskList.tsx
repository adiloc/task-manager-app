import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
  sortTasks,
  Task,
} from "../features/slices/taskSlice";
import { getTasks, updateTask, deleteTask } from "../api";
import AddTaskForm from "./AddTaskForm";

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks,
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(fetchTasksStart());
      try {
        const response = await getTasks(token);
        dispatch(fetchTasksSuccess(response));
      } catch (err) {
        dispatch(fetchTasksFailure("Failed to fetch tasks"));
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [dispatch, token]);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      dispatch(deleteTaskAction(id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(updatedTask);
      dispatch(updateTaskAction(updatedTask));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  const handleSaveEdit = async (task: Task) => {
    try {
      const updatedTask = { ...task, title: editingTaskTitle };
      await updateTask(updatedTask);
      dispatch(updateTaskAction(updatedTask));
      setEditingTaskId(null);
      setEditingTaskTitle("");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <AddTaskForm />
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(sortTasks("createdAt"))}
        >
          Sort by Date
        </button>
      </div>
      {filteredTasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul className="list-group">
          {filteredTasks.map((task: Task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.completed ? "list-group-item-success" : ""
              }`}
            >
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                />
              ) : (
                <span>{task.title}</span>
              )}
              <div>
                {editingTaskId === task.id ? (
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleSaveEdit(task)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-info me-2"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleToggleComplete(task)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask as updateTaskAction, deleteTask as deleteTaskAction } from "../features/slices/taskSlice";
import { updateTask, deleteTask } from "../api";
import { Task } from "../features/slices/taskSlice";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      dispatch(deleteTaskAction(task.id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(updatedTask);
      dispatch(updateTaskAction(updatedTask));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTask = { ...task, title: editedTitle, description: editedDescription };
      await updateTask(updatedTask);
      dispatch(updateTaskAction(updatedTask));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <li
      className={`list-group-item ${
        task.completed ? "list-group-item-success" : ""
      }`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            className="form-control mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button className="btn btn-primary me-2" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <small className="text-muted">
              Created: {new Date(task.createdAt).toLocaleString()}
            </small>
          </div>
          <div>
            <button className="btn btn-info me-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-success me-2" onClick={handleToggleComplete}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;

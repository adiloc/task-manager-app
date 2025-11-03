import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../api";
import { addTask } from "../features/slices/taskSlice";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    try {
      const newTask = await createTask({ title, description: "" });
      dispatch(addTask(newTask));
      setTitle("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;

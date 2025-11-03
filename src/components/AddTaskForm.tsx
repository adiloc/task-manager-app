import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../api";
import { addTask } from "../features/slices/taskSlice";
import { RootState } from "../store";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    try {
      const newTask = await createTask({ title, description }, token);
      dispatch(addTask(newTask));
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="New task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-group mb-2">
        <textarea
          className="form-control"
          placeholder="New task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;

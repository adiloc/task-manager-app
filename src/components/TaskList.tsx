import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  sortTasks,
} from "../features/slices/taskSlice";
import { getTasks } from "../api";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks,
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    dispatch(sortTasks({ sortBy: "createdAt", order: newSortOrder }));
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
        <button className="btn btn-secondary" onClick={handleSort}>
          Sort by Date {sortOrder === "asc" ? "▲" : "▼"}
        </button>
      </div>
      {filteredTasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul className="list-group">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

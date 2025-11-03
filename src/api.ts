import { User, AuthResponse } from "./types";
import { Task } from "./features/slices/taskSlice";

const simulateApiCall = <T>(callback: () => T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, delay);
  });
};

export const register = (userData: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.find(
        (user) =>
          user.username === userData.username || user.email === userData.email,
      );
      if (userExists) {
        reject(new Error("User already exists"));
      } else {
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        resolve();
      }
    }, 500);
  });
};

export const login = (userData: User): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user) =>
          user.email === userData.email && user.password === userData.password,
      );
      if (user) {
        const token = btoa(`${user.email}:${user.password}`);
        resolve({ token });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
};

export const getTasks = (token: string | null): Promise<Task[]> => {
  return simulateApiCall(() => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks;
  });
};

export const createTask = (
  taskData: Omit<Task, "id" | "completed" | "createdAt">,
): Promise<Task> => {
  return simulateApiCall(() => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: Date.now(),
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return newTask;
  });
};

export const updateTask = (taskData: Task): Promise<Task> => {
  return simulateApiCall(() => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const index = tasks.findIndex((task) => task.id === taskData.id);
    if (index !== -1) {
      tasks[index] = taskData;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    return taskData;
  });
};

export const deleteTask = (taskId: number): Promise<void> => {
  return simulateApiCall(() => {
    let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
};

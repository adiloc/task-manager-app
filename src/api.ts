import { User } from "./types";
import { Task } from "./features/slices/taskSlice";

const simulateApiCall = <T>(callback: () => T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, delay);
  });
};

export const register = (userData: Omit<User, "id">): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.find((user) => user.email === userData.email);
      if (userExists) {
        reject(new Error("User with this email already exists"));
      } else {
        const newUser: User = {
          id: Date.now(),
          ...userData,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        resolve();
      }
    }, 500);
  });
};

export const login = (
  userData: User,
): Promise<{ token: string; user: User }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user) =>
          user.email === userData.email && user.password === userData.password,
      );
      if (user) {
        const tokenPayload = {
          userId: user.id,
          email: user.email,
          exp: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
        };
        const token = btoa(JSON.stringify(tokenPayload));
        resolve({ token, user });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
};

export const getTasks = (token: string | null): Promise<Task[]> => {
  return simulateApiCall(() => {
    if (!token) {
      return [];
    }
    const tokenPayload = JSON.parse(atob(token));
    const userId = tokenPayload.userId;

    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks.filter((task) => task.userId === userId);
  });
};

export const createTask = (
  taskData: Omit<Task, "id" | "completed" | "createdAt" | "userId">,
  token: string | null,
): Promise<Task> => {
  return simulateApiCall(() => {
    if (!token) {
      throw new Error("Authentication token not found.");
    }
    const tokenPayload = JSON.parse(atob(token));
    const userId = tokenPayload.userId;

    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: Date.now(),
      userId,
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

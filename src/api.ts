// This file simulates a backend API.

export interface Task {
  id: number;
  title: string;
  description: string;
  createDate: string;
  userId: string;
}

export interface User {
  email: string;
  fname: string;
  lname: string;
}

export const api = {
  getTasks: (userId: string): Promise<Task[]> => new Promise((resolve) => {
    setTimeout(() => {
      const allTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      resolve(allTasks.filter(task => task.userId === userId));
    }, 300);
  }),

  addTask: (task: Omit<Task, 'id'>): Promise<Task> => new Promise((resolve) => {
    setTimeout(() => {
      const allTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      const newTask: Task = { ...task, id: Date.now() };
      const updatedTasks = [...allTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      resolve(newTask);
    }, 300);
  }),

  updateTask: (updatedTask: Task): Promise<Task> => new Promise((resolve, reject) => {
    setTimeout(() => {
      let allTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      const taskIndex = allTasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex > -1) {
        allTasks[taskIndex] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        resolve(updatedTask);
      } else {
        reject(new Error('Task not found'));
      }
    }, 300);
  }),

  deleteTask: (taskId: number): Promise<{ success: boolean }> => new Promise((resolve) => {
    setTimeout(() => {
      let allTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      const updatedTasks = allTasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      resolve({ success: true });
    }, 300);
  }),

  registerUser: (user: object): Promise<{ success: boolean }> => new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find((u: any) => u.email === (user as any).email);
        if (existingUser) {
          return reject(new Error('User with this email already exists.'));
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    }, 500);
  }),

  loginUser: (email: string): Promise<{ success: boolean, user: User }> => new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email);
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          resolve({ success: true, user });
        } else {
          reject(new Error('Invalid email or password.'));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  }),
};

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
};

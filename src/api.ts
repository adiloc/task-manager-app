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

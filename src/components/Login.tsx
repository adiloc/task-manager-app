import React, { lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Type Definitions --- //
interface Task {
  id: number;
  title: string;
  description: string;
  createDate: string;
  userId: string;
}

interface User {
  email: string;
  fname: string;
  lname: string;
}

const apiLoginUser = (email: string) => {
  return new Promise((resolve, reject) => {
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
  });
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // For UI purposes
  const [error, setError] = useState('');
  const navigate = useNavigate();



  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login</h2>
        <form>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper to simulate API call
const apiRegisterUser = (user: object) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        // Check for existing user
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
    }, 500); // 500ms delay
  });
};

const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fname || !lname || !email) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await apiRegisterUser({ fname, lname, email });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="form-group mb-3">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
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
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

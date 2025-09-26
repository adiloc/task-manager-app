import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "./AuthForm";
import { api } from "../api";

const Login = () => {
  const { error, setError, navigate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      await api.loginUser(email);
      navigate("/tasks");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthForm handleSubmit={handleSubmit} error={error}>
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
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </AuthForm>
  );
};

export default Login;

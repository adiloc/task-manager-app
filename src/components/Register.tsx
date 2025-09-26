import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "./AuthForm";
import { api } from "../api";

const Register = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const { error, setError } = useAuth();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fname || !lname || !email) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await api.registerUser({ fname, lname, email });
      onRegisterSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthForm handleSubmit={handleSubmit} error={error}>
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
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </AuthForm>
  );
};

export default Register;

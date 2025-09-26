import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export const useAuth = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return { error, setError, navigate };
};

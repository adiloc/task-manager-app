import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return { error, setError, navigate };
};

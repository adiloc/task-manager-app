import React from "react";

interface AuthFormProps {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  children,
  handleSubmit,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {children}
    </form>
  );
};

export default AuthForm;

import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("encodedToken");
  return token ? children : <Navigate to="/login" />;
};

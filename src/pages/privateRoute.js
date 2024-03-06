import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return  <Navigate to="/login" />
  }
  return children
}

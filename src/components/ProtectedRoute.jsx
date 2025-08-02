import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  const isLoading = localStorage.getItem("accessToken") && auth.user === null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

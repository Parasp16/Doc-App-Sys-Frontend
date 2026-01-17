import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token6163");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;

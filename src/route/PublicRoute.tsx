import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

type PublicRouteProps = {
  children: ReactNode;
};


const PublicRoute = ({ children }:PublicRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/user-profile" replace />;
  }

  return children;
};

export default PublicRoute;
import { Navigate } from "react-router-dom";
import useUser from "../store/userstore";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default PublicRoute;

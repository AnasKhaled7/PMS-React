import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) =>
  !localStorage.getItem("token") ? <Navigate to="/login" /> : children;

export default ProtectedRoute;

import { useAppSelector } from "@/hooks/useAppSelector";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouter = () => {
  const { status } = useAppSelector((state) => state.auth);

  return status === "not-authenticate" ? <Navigate to="/auth/login" replace /> : <Outlet />;
};

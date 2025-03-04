import { useAppSelector } from "@/hooks/useAppSelector";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouter = () => {
  const { status, accessToken } = useAppSelector((state) => state.auth);


  if(status === 'pending'){
    return <div>Loading auth...</div>
  }


  return status === "not-authenticate" && !accessToken ? (
    <Navigate to="/auth/login" replace />
  ) : (
    <Outlet />
  );
};

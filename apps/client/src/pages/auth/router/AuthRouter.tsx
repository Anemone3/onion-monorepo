import { Navigate, Route, Routes } from "react-router-dom";
import { LoginAuthPage } from "../LoginAuthPage";
import { RegisterAuthPage } from "../RegisterAuthPage";
import { useAppSelector } from "@/hooks/useAppSelector";

export const AuthRouter = () => {

  const { status } = useAppSelector(state=> state.auth);

  if(status === 'authenticated'){
    return <Navigate to="/"/>
  }

  return (
    <Routes>
      <Route index element={<Navigate to="login" replace />} />
      <Route path="login" element={<LoginAuthPage />} />
      <Route path="register" element={<RegisterAuthPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

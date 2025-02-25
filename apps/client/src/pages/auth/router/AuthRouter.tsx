import { Navigate, Route, Routes } from "react-router-dom";
import { LoginAuthPage } from "../LoginAuthPage";
import { RegisterAuthPage } from "../RegisterAuthPage";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="login" replace/>} />
      <Route path="login" element={<LoginAuthPage />} />
      <Route path="register" element={<RegisterAuthPage />} />
      <Route path="*" element={<Navigate to="login" replace/>} />
    </Routes>
  );
};

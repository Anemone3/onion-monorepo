import { PublicLayout } from "@/components/layout/PublicLayout";
import { lazy, Suspense } from "react";
import {  Route, Routes } from "react-router-dom";

const CartPage = lazy(() => import("@/features/cart/CartPage"));
const ProfileRoutes = lazy(() => import("@/features/profile/router/ProfileRoutes"));


export const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
      <Route element={<PublicLayout />}>
        <Route path="cart/*" element={<CartPage />} />
        <Route path="profile/*" element={<ProfileRoutes />} />
      </Route>
    </Routes>
    </Suspense>
  );
};

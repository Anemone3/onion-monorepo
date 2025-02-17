import { PublicLayout } from "@/components/layout/PublicLayout";
import CartPage from "@/features/cart/CartPage";
import { Home } from "@/features/home/Home";
import { AfterPayment } from "@/features/payment/AfterPayment";
import { Collection } from "@/features/product/Collection";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// const CartPage = lazy(() => import("@/features/cart/CartPage"));
const ProfileRoutes = lazy(
  () => import("@/features/profile/router/ProfileRoutes"),
);

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="cart/*" element={<CartPage />} />
          <Route path="profile/*" element={<ProfileRoutes />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="collection" element={<Collection />} />
          <Route path="success" element={<AfterPayment />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

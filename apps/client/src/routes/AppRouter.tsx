import { PublicLayout } from "@/components/layout/PublicLayout";
import CartPage from "@/pages/cart/CartPage";
import { Home } from "@/pages/home/Home";
import { AfterPayment } from "@/pages/payment/AfterPayment";
import { Collection } from "@/pages/product/Collection";
import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import { AuthRouter } from "@/pages/auth/router/AuthRouter";
import { useGetUserQuery, useRefreshTokenMutation } from "@/redux/api/auth.api";
import { useDispatch } from "react-redux";
import {
  setCredentials,
  setNotAuthenticate,
  setToken,
} from "@/redux/slices/authslice";
import ProfileRoutes from "@/pages/profile/router/ProfileRoutes";

// const CartPage = lazy(() => import("@/features/cart/CartPage"));
// const ProfileRoutes = lazy(
//   () => import("@/pages/profile/router/ProfileRoutes"),
// );

export const AppRoutes = () => {
  const { data: userData } = useGetUserQuery();
  const [getAccessToken, {}] = useRefreshTokenMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      getAccessToken()
        .unwrap()
        .then((data) => {
          dispatch(setToken(data.accessToken));
        })
        .catch((err) => {
          dispatch(setNotAuthenticate());

          throw err;
        });
    } else {
      dispatch(setCredentials(userData));
    }
  }, [userData]);

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
          <Route element={<PrivateRouter />}>
            <Route path="profile/*" element={<ProfileRoutes />} />
            <Route path="success" element={<AfterPayment />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route path="collection" element={<Collection />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="auth/*" element={<AuthRouter />} />
      </Routes>
    </Suspense>
  );
};

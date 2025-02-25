import { Navigate, Route, Routes } from "react-router-dom";
import { ProfilePage } from "../ProfilePage";
import { Orders } from "../components/orders/Orders";
import { Wishlist } from "../components/wishlist/Wishlist";
import { ShippingAddress } from "../components/address/ShippingAddress";
import { Password } from "../components/password/Password";
import { AccountDetail } from "../components/accountdetail/AccountDetail";

const ProfileRoutes = () => {


  return (
    <Routes>
      <Route element={<ProfilePage />}>
        <Route index element={<Navigate to="/profile/orders" />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="address" element={<ShippingAddress />} />
        <Route path="change-password" element={<Password />} />
        <Route path="detail" element={<AccountDetail/>} />
        <Route path="*" element={<Navigate to="/profile/orders" />} />
      </Route>
    </Routes>
  );
};

export default ProfileRoutes;


import { Car, Heart, Key, LogOut, ShoppingCart, User } from "lucide-react";


export const menuList = [
  {
    icon: <ShoppingCart />,
    title: "Orders",
    redirect: "orders",
  },
  {
    icon: <Heart />,
    title: "Wishlist",
    redirect: "wishlist",
  },
  {
    icon: <Car />,
    title: "Address",
    redirect: "address",
  },
  {
    icon: <Key />,
    title: "Password",
    redirect: "change-password",
  },
  {
    icon: <User />,
    title: "Account Detail",
    redirect: "detail",
  },
  {
    icon: <LogOut />,
    title: "Logout",
    redirect: "/",
  },
];
import { Search, ShoppingCart, UserCircle } from "lucide-react";
import logo from "../../assets/onion.svg";
import { Input } from "../ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Container } from "@/shared/components/Container";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MenuList = [
  { title: "Home", path: "/" },
  { title: "Categories", path: "/categories" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export const PublicLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <nav className="flex flex-wrap items-center justify-between py-5">
          <div className="flex items-center gap-5">
            <img src={logo} alt="logo" />
            <h2
              onClick={() => navigate("/")}
              className="cursor-pointer text-2xl font-semibold"
            >
              Ecommerce
            </h2>
          </div>
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {MenuList.map((i) => (
                <NavigationMenuItem key={i.title}>
                  {i.title === "Categories" ? (
                    <>
                      <NavigationMenuTrigger className="flex gap-2 font-medium text-gray-600">
                        {i.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                          <Link to="/collection">products</Link>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link to={i.path} className="text-gray-500">
                        {i.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-8 lg:flex">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search products"
                className="border-gray-300 pl-10 pr-10 placeholder:font-medium"
              />
            </div>
            <ShoppingCart
              onClick={() => navigate("/cart")}
              className="h-5 w-5 cursor-pointer text-gray-700"
            />
            <UserCircle
              onClick={() => navigate("/profile")}
              className="h-5 w-5 cursor-pointer text-gray-700"
            />
          </div>
        </nav>
      </Container>
      <main>
        <Outlet />
      </main>
    </>
  );
};

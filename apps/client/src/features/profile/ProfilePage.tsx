import { Breadcrumbs } from "@/shared/components/Breadcrumb";
import { Container } from "@/shared/components/Container";
import { NavLink, Outlet } from "react-router-dom";
import { menuList } from "./components/menu-list";


export const ProfilePage = () => {
  return (
    <>
      <Breadcrumbs
        reference="Ecommerce"
        title="My Account"
        location="My Account"
      />
      <Container>
        <div className="mt-[60px] flex min-h-screen flex-grow">
          <ul className="flex w-1/4 flex-col gap-3 border-r px-4 pt-[60px]">
            {menuList.map((i, index) => (
              <NavLink
                key={index}
                to={`/profile/${i.redirect}`}
                className={({ isActive }) =>
                  `flex h-10 items-center gap-3 rounded-sm px-7 py-2 font-medium ${isActive ? "bg-gray-200" : "text-gray-400"}`
                }
              >
                {i.icon}
                <h3>{i.title}</h3>
              </NavLink>
            ))}
          </ul>
          <div className="mx-12 flex-grow">
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  );
};

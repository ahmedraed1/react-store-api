import React from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuShoppingBag, LuPackage } from "react-icons/lu";

const Sidebar = () => {
  const linkClasses =
    "flex items-center p-3 my-1 rounded-lg hover:bg-gray-700 transition-colors";
  const activeLinkClasses = "bg-gray-700";

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ""}`
          }
        >
          <LuLayoutDashboard className="mr-3" />
          Overview
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ""}`
          }
        >
          <LuShoppingBag className="mr-3" />
          Orders
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ""}`
          }
        >
          <LuPackage className="mr-3" />
          Products
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

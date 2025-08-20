import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

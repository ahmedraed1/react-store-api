import React, { useState, useEffect } from "react";
import StatsCard from "../../components/StatsCard";
import SalesChart from "../../components/SalesChart";
import { dashboardData } from "../../data/dashboard";

const DashboardHomePage = () => {
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]); // State for chart data

  useEffect(() => {
    setStats(dashboardData.stats);
    setRecentOrders(dashboardData.recentOrders);
    setChartData(dashboardData.salesOverTime); // Set chart data
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Sales Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Sales Analytics</h2>
        <SalesChart data={chartData} />
      </div>

      {/* Recent Orders Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.orderId} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-blue-600">
                    {order.orderId}
                  </td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3 text-gray-600">{order.date}</td>
                  <td className="p-3 font-semibold">{order.total}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;

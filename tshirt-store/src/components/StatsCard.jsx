import React from "react";

const StatsCard = ({ title, value, change, changeType }) => {
  const changeColor =
    changeType === "increase" ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm ${changeColor}`}>{change} vs last month</p>
      </div>
    </div>
  );
};

export default StatsCard;

import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { dashboardData } from "../../data/dashboard";

const StatusCell = ({ status }) => {
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
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(
        status
      )}`}
    >
      {status}
    </span>
  );
};

const OrdersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dashboardData.recentOrders);
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "orderId", header: "Order ID" },
      { accessorKey: "customer", header: "Customer" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "total", header: "Total" },
      {
        accessorKey: "status",
        header: "Status",
        // Custom cell renderer for the status column
        cell: (info) => <StatusCell status={info.getValue()} />,
      },
    ],
    []
  );

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-gray-600">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

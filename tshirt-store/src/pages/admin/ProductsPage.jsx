import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { products as initialProducts } from "../../data/products"; // Using our mock data
import ProductModal from "../../components/ProductModal";
import { BiEdit, BiTrash } from "react-icons/bi";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "imageUrl",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="product"
            className="w-16 h-16 object-cover rounded-md"
          />
        ),
      },
      { accessorKey: "name", header: "Product Name" },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="p-2 text-blue-600 hover:text-blue-800"
            >
              <BiEdit size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <BiTrash size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>
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
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />
    </div>
  );
};

export default ProductsPage;

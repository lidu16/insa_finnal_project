// src/pages/AdminPage.jsx
import React from "react";
import ProductForm from "../components/ProductForm";
import AdminDashboard from "../components/AdminDashboard";

const AdminPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Page</h1>
      <ProductForm />
      <hr className="my-8 border-gray-300" />
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;

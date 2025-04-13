
import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ShopListingPage from "@/components/shop/ShopListingPage";
import ProductDetailsPage from "@/components/shop/ProductDetailsPage";

// Main Shop component with routing for list/detail view
const Shop = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <DashboardLayout title={id ? "Product Details" : "Garden Shop"}>
      {id ? <ProductDetailsPage /> : <ShopListingPage />}
    </DashboardLayout>
  );
};

export default Shop;

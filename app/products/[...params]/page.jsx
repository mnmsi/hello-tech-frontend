"use client";
import React from "react";
import Product from "@/views/product/product";
const ProductsPage = ({ params }) => {
  let page = params.params[0];
  let search = false;
  if (params.params[0] === "search") {
    page = params.params[1];
    search = true;
  }
  return (
    <div className="container">
      <Product search={search} page={page} />
    </div>
  );
};

export default ProductsPage;

"use client";
import React from "react";
import { useGetProductByBrandQuery } from "@/redux/services/auth";
import RelatedProduct from "@/components/template/relatedProduct";
import ProductCard from "@/components/productCard/productCard";
import Skeleton from "@/components/Skeleton/skeleton";

const BrandProduct = ({ params }) => {
  const { data, isLoading } = useGetProductByBrandQuery(params.slug);
  let renderProduct = null;
  if (data?.data?.length) {
    renderProduct = data?.data?.map((item, index) => (
      <div className="col-lg-3 col-6 mb-lg-4 mb-0" key={index}>
        <ProductCard
          image={item?.image_url}
          hover_image={item?.hover_image_url}
          price={item?.price}
          offer_price={item?.price_after_discount}
          name={item?.name}
          slug={item?.slug}
          id={item?.id}
          is_favorite={item?.is_favorite}
          is_in_cart={item?.is_cart}
          is_stock_out={item?.is_stock_out}
        />
      </div>
    ));
  } else {
    renderProduct = (
      <h1 className="brands_page_title text-center mt-5">No Product Found</h1>
    );
  }
  return (
    <div className="container">
      <div className="d-flex align-items-center gap-2">
        <h1
          className="brands_page_title"
          style={{
            textTransform: "capitalize",
          }}
        >
          {`Product from `}
        </h1>
        <h1
          className="brands_page_title"
          style={{
            textTransform: "capitalize",
            color: "#F25A2B",
          }}
        >
          {params.slug}
        </h1>
      </div>
      <div className="row">
        {isLoading ? <Skeleton count={4} /> : renderProduct}
      </div>
    </div>
  );
};

export default BrandProduct;

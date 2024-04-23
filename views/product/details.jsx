"use client";
import React from "react";
import ProductPreview from "@/components/template/productDetails/productPreview";
import ProductDescription from "@/components/template/productDetails/productDescription";
import RelatedProduct from "@/components/template/relatedProduct";
import {
  useGetProductDetailsQuery,
  useGetRelatedProductsQuery,
} from "@/redux/services/auth";
import { useGuestAddToCartMutation } from "@/redux/services/auth";
import Placeholder from "react-bootstrap/Placeholder";
import Skeleton from "@/components/Skeleton/skeleton";

const Details = ({ slug }) => {
  const { data, isLoading } = useGetProductDetailsQuery(slug);

  const { isLoading: productLoading, data: relatedProduct } =
    useGetRelatedProductsQuery();
  return (
    <div>
      {!isLoading ? (
        <ProductPreview data={data?.data} />
      ) : (
        <Placeholder animation="glow" as="div">
          <Placeholder
            style={{
              height: "400px",
              background: "#ddd",
              width: "100%",
              marginBottom: "20px",
            }}
          />
        </Placeholder>
      )}
      {!isLoading ? (
        <ProductDescription data={data?.data} />
      ) : (
        <Placeholder animation="glow" as="div">
          <Placeholder
            style={{
              height: "400px",
              background: "#ddd",
              width: "100%",
              marginBottom: "20px",
            }}
          />
        </Placeholder>
      )}
      {!productLoading ? (
        <RelatedProduct data={relatedProduct} />
      ) : (
        <Skeleton count={4} />
      )}
    </div>
  );
};

export default Details;

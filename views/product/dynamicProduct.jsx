import styles from "@/styles/components/dynamicProduct.module.scss";
import { useGetDynamicProductDataQuery } from "@/redux/services/auth";
import SectionTitle from "@/components/sectionTitle/sectionTitle";
import ProductCard from "@/components/productCard/productCard";
import React from "react";
import Skeleton from "@/components/Skeleton/skeleton";

const DynamicProduct = () => {
  const { data, isLoading } = useGetDynamicProductDataQuery();
  let renderDynamicProduct = null;
  if (data?.data) {
    renderDynamicProduct = data?.data?.map((item, index) => {
      return (
        <div className="lg-mb-5 mb-3" key={index}>
          <SectionTitle title={item?.section_title} />
          <div className="row">
            {item?.products?.map((item, index) => {
              return (
                <div className="col-lg-3 col-6 mb-lg-4" key={index}>
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
              );
            })}
          </div>
        </div>
      );
    });
  }
  return (
    <div className={styles.product_header}>
      {isLoading ? <Skeleton count={4} /> : renderDynamicProduct}
    </div>
  );
};

export default DynamicProduct;

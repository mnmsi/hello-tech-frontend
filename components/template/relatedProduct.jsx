import React from "react";
import ProductCard from "@/components/productCard/productCard";
import style from "@/styles/template/relatedProduct.module.scss";
import SeeAllButton from "@/components/seAllButton/seeAllButton";
const RelatedProduct = ({ data }) => {
  //******************** Product Functionality Start ***************//
  let renderProduct = null;
  if (data.data.length) {
    renderProduct = data.data.map((item, index) => {
      return (
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
      );
    });
  }
  //******************** Product Functionality End ***************//
  return (
    <div className={style.product_wrapper}>
      <h2>Related Products</h2>
      <div className="row">{renderProduct}</div>
      <div className={style.button_wrapper}>
        <SeeAllButton text="SEE ALL PRODUCTS" link="/products/gadgets" />
      </div>
    </div>
  );
};

export default RelatedProduct;

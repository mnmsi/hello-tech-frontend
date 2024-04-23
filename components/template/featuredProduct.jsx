import React, { useState, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import style from "@/styles/template/featuredProduct.module.scss";
import CategoryOffer from "@/components/categoryOffer/categoryOffer";
import ProductCard from "@/components/productCard/productCard";
import { useGetCategoriesQuery } from "@/redux/services/categories";
import { useGetFeaturedProductByCategoryQuery } from "@/redux/services/featuredProductByCategory";
import { useGetFeaturedBannerByCategoryQuery } from "@/redux/services/featureBannerByCategory";
import Skeleton from "@/components/Skeleton/skeleton";
const FeaturedProduct = () => {
  const { data: category, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const [active, setActive] = useState(skipToken);
  const [categoryId, setCategoryId] = useState(skipToken);
  useEffect(() => {
    if (category?.data?.length) {
      setActive(category?.data[0]?.id);
      setCategoryId(category?.data[0]?.id);
    }
  }, [category]);
  const { currentData: featuredProductByCategory, isLoading: productLoading } =
    useGetFeaturedProductByCategoryQuery(categoryId);
  const { currentData: featuredProductBanner, isLoading: bannerLoading } =
    useGetFeaturedBannerByCategoryQuery(categoryId);
  //******************* Category Functionality Start **************//
  const handleCategory = async (id) => {
    setActive(id);
    setCategoryId(id);
  };

  let renderCategory = null;
  if (!categoryLoading && category?.data?.length) {
    renderCategory = category?.data?.map((item, index) => {
      return (
        <div
          onClick={() => handleCategory(item.id)}
          className={`${style.tab_item} ${
            active === item.id ? style.active : ""
          }`}
          key={index}
        >
          {item.name}
        </div>
      );
    });
  }
  //******************** Category end *****************//
  //******************** Product Functionality Start ***************//
  let renderProduct = <Skeleton count={4} />;
  if (featuredProductByCategory) {
    renderProduct = featuredProductByCategory?.data?.map((item, index) => {
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
    });
  }
  //******************** Product Functionality End ***************//
  //************ Offer Banner Functionality Start ************//
  let renderOffer = null;
  if (!bannerLoading && featuredProductBanner) {
    renderOffer = (
      <div className="col-lg-3 col-6">
        <CategoryOffer
          link="/"
          image={featuredProductBanner?.data?.image_url}
        />
      </div>
    );
  }
  //************ Offer Banner Functionality End ************//
  return (
    <div className={style.featured_product_wrapper}>
      <div className="container">
        <div className={style.header}>
          <h2>Featured Products</h2>
        </div>
        <div className={style.tab_wrapper}>
          <div className={style.tab}>
            {/*maximum 6 category allowed !!*/}
            {renderCategory}
          </div>
        </div>
        <div className="row align-items-stretch">
          {productLoading ? (
            <Skeleton count={4} />
          ) : (
            <>
              {renderOffer} {renderProduct}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;

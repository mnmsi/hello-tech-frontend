"use client";
import React from "react";
import Banner from "@/components/banner/banner";
import ProductCard from "@/components/productCard/productCard";
import SeeAllButton from "@/components/seAllButton/seeAllButton";
import { useNewArrivalsQuery } from "@/redux/services/newArrivals";
import { useGetBannerQuery } from "@/redux/services/banner";
import Skeleton from "@/components/Skeleton/skeleton";

const NewArrivalsPage = () => {
  const { currentData: data, isLoading, error } = useNewArrivalsQuery();
  const {
    data: bannerData,
    isLoading: bannerLoading,
    error: bannerError,
  } = useGetBannerQuery();

  let renderHero = <Banner loading={bannerLoading} />;
  if (bannerData) {
    {
      bannerData?.data?.map((item, index) => {
        if (item.page === "new-arrivals" && item.show_on === "top") {
          renderHero = (
            <Banner loading={isLoading} key={index} image={item.image_url} />
          );
        }
      });
    }
  }

  //******************** Product Functionality Start ***************//

  let renderArrivals = <Skeleton count={4} />;
  if (data) {
    renderArrivals = data?.data.map((item, index) => {
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
    <div className="container">
      <section className="mb-lg-5 mb-4">{renderHero}</section>
      <sction className="mt-lg-5">
        <div className="row">{renderArrivals}</div>
        {/*<div className="d-flex justify-content-center mt-lg-5">*/}
        {/*  <SeeAllButton link="/products/gadgets" />*/}
        {/*</div>*/}
      </sction>
    </div>
  );
};

export default NewArrivalsPage;

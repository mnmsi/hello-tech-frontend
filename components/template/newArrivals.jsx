import React from "react";
import style from "@/styles/template/arrivals.module.scss";
import SeeAllButton from "@/components/seAllButton/seeAllButton";
import Banner from "@/components/banner/banner";
import ProductCard from "@/components/productCard/productCard";
import { useGetBannerQuery } from "@/redux/services/banner";
import { useFeatureNewArrivalsQuery } from "@/redux/services/newArrivals";
import Skeleton from "@/components/Skeleton/skeleton";
const NewArrivals = () => {
  const { data, isLoading } = useGetBannerQuery();
  const { currentData: newArrivalsData } = useFeatureNewArrivalsQuery();
  let renderHero = <Banner loading={isLoading} />;
  if (data) {
    {
      data?.data?.map((item, index) => {
        if (item.page === "new-arrivals" && item.show_on === "top") {
          renderHero = (
            <Banner
              wrapper_class="new_arrival_banner"
              key={index}
              image={item.image_url}
            />
          );
        }
      });
    }
  }
  let renderArrivals = null;
  if (newArrivalsData) {
    renderArrivals = newArrivalsData?.data?.map((item, index) => {
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
  } else {
    renderArrivals = <h5 className="text-center mt-5">No Product Found</h5>;
  }
  return (
    <>
      <div className={style.arrival_wrapper}>
        <div className="container">
          <div className={style.content_wrapper}>
            <div className={style.section_header}>
              <h2 className="title">New Arrivals</h2>
              <div className={style.see_all_button_desktop}>
                <SeeAllButton link="/new-arrivals" />
              </div>
            </div>
            <div className={style.banner_wrapper}>{renderHero}</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row section-padding">
          {isLoading ? <Skeleton count={4} /> : renderArrivals}
        </div>
        <div className={style.see_all_button_mobile}>
          <SeeAllButton link="/new-arrivals" />
        </div>
      </div>
    </>
  );
};

export default NewArrivals;

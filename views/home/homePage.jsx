"use client";
import React from "react";
import Banner from "@/components/banner/banner";
import FeaturedCategory from "@/components/template/featuredCategory";
import NewArrivals from "@/components/template/newArrivals";
import ChooseBrand from "@/components/template/chooseBrand";
import ProductReview from "@/components/template/productReview";
import FeaturedProduct from "@/components/template/featuredProduct";
import {
  useGetBannerQuery,
  useGetHomeSliderQuery,
} from "@/redux/services/banner";
import { useGetSiteSettingsQuery } from "@/redux/services/auth";
import Head from "next/head";
import DynamicProduct from "@/views/product/dynamicProduct";
import HomeSlider from "@/components/homeSlider/homeSlider";
import HomeBanner from "@/app/homeBanner/homeBanner";
const HomePage = () => {
  const { data, isLoading } = useGetBannerQuery();
  const { data: homeSliderData } = useGetHomeSliderQuery();
  const { data: siteSettings } = useGetSiteSettingsQuery();
  let renderHero = <HomeSlider data={homeSliderData} loading={isLoading} />;
  let renderHomeBottomBanner = <Banner loading={isLoading} />;
  if (data) {
    {
      data?.data?.map((item, index) => {
        if (item.page === "home" && item.show_on === "bottom") {
          renderHomeBottomBanner = (
            <Banner
              wrapper_class="home_page_bottom_banner"
              loading={isLoading}
              key={index}
              image={item.image_url}
            />
          );
        }
      });
    }
  }
  let renderSectionOrder = null;
  if (siteSettings?.section_order?.length) {
    renderSectionOrder = siteSettings?.section_order?.map((section, index) => {
      if (section?.section_name === "New Arrivals") {
        return (
          <React.Fragment key={index}>
            <section className="section-padding">
              <NewArrivals />
            </section>
            <section className="mt-4">
              <HomeBanner index={index} />
            </section>
          </React.Fragment>
        );
      }
      if (section?.section_name === "Featured Categories") {
        return (
          <React.Fragment key={index}>
            <section className="container section-padding">
              <FeaturedCategory />
            </section>
            <section className="mt-4">
              <HomeBanner index={index} />
            </section>
          </React.Fragment>
        );
      }
      if (section?.section_name === "Featured Products") {
        return (
          <React.Fragment key={index}>
            <section className="section-padding">
              <FeaturedProduct />
            </section>
            <section className="mt-4">
              <HomeBanner index={index} />
            </section>
          </React.Fragment>
        );
      }
      if (section?.section_name === "Promotional Section") {
        return (
          <React.Fragment key={index}>
            <section className="container section-padding">
              <DynamicProduct />
            </section>

            <section className="mt-4">
              <HomeBanner index={index} />
            </section>
          </React.Fragment>
        );
      }
      if (section?.section_name === "Choose Brand") {
        return (
          <React.Fragment key={index}>
            <section className="container section-padding">
              <ChooseBrand />
            </section>
            <section className="">
              <HomeBanner index={index} />
            </section>
          </React.Fragment>
        );
      }
      if (section?.section_name === "Product Review") {
        return (
          <section key={index} className="container section-padding">
            <ProductReview />
          </section>
        );
      }
    });
  } else {
    renderSectionOrder = (
      <>
        <section className="container section-padding">
          <FeaturedCategory />
        </section>
        <section className="mt-4">
          <HomeBanner index={0} />
        </section>
        <section className="section-padding">
          <NewArrivals />
        </section>
        <section className=" mt-4">
          <HomeBanner index={1} />
        </section>
        <section className="section-padding">
          <FeaturedProduct />
        </section>
        <section className="mt-4">
          <HomeBanner index={2} />
        </section>
        <section className="container section-padding">
          <ChooseBrand />
        </section>
        <section className="mt-4">
          <HomeBanner index={3} />
        </section>
        <section className="container section-padding">
          <DynamicProduct />
        </section>
        <section className="mt-4">
          <HomeBanner index={4} />
        </section>
        <section className="container section-padding">
          <ProductReview />
        </section>
      </>
    );
  }
  return (
    <div>
      <section className="container">{renderHero}</section>
      {renderSectionOrder}
      {/*<section className="container section-padding">*/}
      {/*  <FeaturedCategory />*/}
      {/*</section>*/}
      {/*<section className="container section-padding">*/}
      {/*  <HomeBanner />*/}
      {/*</section>*/}
      {/*<section className="section-padding">*/}
      {/*  <NewArrivals />*/}
      {/*</section>*/}
      {/*<section className="section-padding">*/}
      {/*  <FeaturedProduct />*/}
      {/*</section>*/}
      {/*<section className="container section-padding">*/}
      {/*  {renderHomeBottomBanner}*/}
      {/*</section>*/}
      {/*<section className="container section-padding">*/}
      {/*  <ChooseBrand />*/}
      {/*</section>{" "}*/}
      {/*<section className="container section-padding">*/}
      {/*  <DynamicProduct />*/}
      {/*</section>*/}
    </div>
  );
};

export default HomePage;

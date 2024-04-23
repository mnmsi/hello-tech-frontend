import React from "react";
import HomeBannerItem from "@/app/homeBanner/homeBannerItem";
import { useGetBannerQuery } from "@/redux/services/banner";

const HomeBanner = ({ index }) => {
  const { data, isLoading } = useGetBannerQuery();
  const LayoutOne = ({ image1, href1 }) => {
    return (
      <div className="row  align-items-stretch">
        <div className="col-lg-12 col-md-12 my-lg-4 my-3">
          <HomeBannerItem image={image1} href={href1} />
        </div>
      </div>
    );
  };
  const LayoutTwo = ({ image1, image2, href1, href2 }) => {
    return (
      <div>
        <div className="row align-items-stretch">
          <div className="col-lg-4 col-md-6  my-lg-4 my-3">
            <HomeBannerItem image={image1} href={href1} />
          </div>
          <div className="col-lg-8 col-md-6  my-lg-4 my-3">
            <HomeBannerItem image={image2} href={href2} />
          </div>
        </div>
      </div>
    );
  };
  const LayoutThree = ({ image1, image2, image3, href1, href2, href3 }) => {
    return (
      <div>
        <div className="row align-items-stretch">
          <div className="col-lg-4 col-md-6  my-lg-4 mt-0 mb-3">
            <HomeBannerItem href={href1} image={image1} />
          </div>
          <div className="col-lg-4 col-md-6  my-lg-4 my-0">
            <HomeBannerItem href={href2} image={image2} />
          </div>
          <div className="col-lg-4 col-md-12  my-lg-4 my-3">
            <HomeBannerItem href={href3} image={image3} />
          </div>
        </div>
      </div>
    );
  };
  let renderSectionOrder = null;
  if (data?.data?.length) {
    if (
      data?.data[index]?.home_banner?.length > 0 &&
      data?.data[index]?.home_banner?.length < 2
    ) {
      renderSectionOrder = (
        <LayoutOne
          image1={data?.data[index]?.home_banner[0]?.image}
          href1={data?.data[index]?.home_banner[0]?.url}
        />
      );
    } else if (
      data?.data[index]?.home_banner?.length > 1 &&
      data?.data[index]?.home_banner?.length < 3
    ) {
      renderSectionOrder = (
        <LayoutTwo
          image1={data?.data[index]?.home_banner[0]?.image}
          href1={data?.data[index]?.home_banner[0]?.url}
          image2={data?.data[index]?.home_banner[1]?.image}
          href2={data?.data[index]?.home_banner[1]?.url}
        />
      );
    } else if (data?.data[index]?.home_banner?.length > 2) {
      renderSectionOrder = (
        <LayoutThree
          image1={data?.data[index]?.home_banner[0]?.image}
          href1={data?.data[index]?.home_banner[0]?.url}
          image2={data?.data[index]?.home_banner[1]?.image}
          href2={data?.data[index]?.home_banner[1]?.url}
          image3={data?.data[index]?.home_banner[2]?.image}
          href3={data?.data[index]?.home_banner[2]?.url}
        />
      );
    }
  }
  return <div className="container">{renderSectionOrder}</div>;
};

export default HomeBanner;

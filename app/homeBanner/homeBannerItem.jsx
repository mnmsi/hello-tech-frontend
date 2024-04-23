"use client";
import React from "react";
import LazyImage from "@/components/ui/LazyImage";
import style from "@/styles/components/homeBannerItem.module.scss";
import Link from "next/link";

const HomeBannerItem = ({ image, href }) => {
  let renderBanner = null;
  if (href) {
    renderBanner = (
      <Link href={href} className={style.image_wrapper}>
        <img
          className="img-fluid"
          loading="lazy"
          src={image}
          alt="banner image"
        />
      </Link>
    );
  } else {
    renderBanner = (
      <div className={style.image_wrapper}>
        <img
          className="img-fluid"
          loading="lazy"
          src={image}
          alt="banner image"
        />
      </div>
    );
  }
  return <>{renderBanner}</>;
};

export default HomeBannerItem;

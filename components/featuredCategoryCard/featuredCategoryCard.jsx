import React from "react";
import style from "@/styles/components/featuredCategoryCard.module.scss";
import LazyImage from "@/components/ui/LazyImage";
const FeaturedCategoryCard = ({ image_url, name, count, handleClick }) => {
  return (
    <div className={style.card_wrapper} onClick={handleClick}>
      <div className={style.card_image}>
        <LazyImage alt="category" src={image_url} />
      </div>
      <div className={style.card_content}>
        <h3 className={style.card_title}>{name}</h3>
        <div></div>
        <p className={style.card_count}>{count} Products</p>
      </div>
    </div>
  );
};

export default FeaturedCategoryCard;

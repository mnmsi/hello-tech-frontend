import React from "react";
import LazyImage from "@/components/ui/LazyImage";
import Link from "next/link";
import style from "@/styles/components/categoryOffer.module.scss";

const CategoryOffer = ({ image, purpose, link }) => {
  return (
    <div className={style.section_wrapper}>
      <Link href={link}>
        <LazyImage src={image} alt="offer" />
      </Link>
    </div>
  );
};

export default CategoryOffer;

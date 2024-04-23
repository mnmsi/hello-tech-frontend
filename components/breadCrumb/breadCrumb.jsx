"use client";
import style from "@/styles/components/breadCrumb.module.scss";
import Link from "next/link";

const BreadCrumb = ({
  category = "",
  subCategory = "",
  productName = "",
  categoryLink = "",
  subCategoryLink = "",
}) => {
  return (
    <div className={style.bread_crumb_wrapper}>
      <p>
        <img src="/icons/home.svg" alt="" />
        <span>
          <Link href="/">Home</Link>
        </span>
        <span className={style.arrow}>{`>>`}</span>
        <span>
          <Link href={`${categoryLink}`}>{category}</Link>
        </span>
        <span className={style.arrow}>{`>>`}</span>
        <span className={style.productName}>{productName}</span>
      </p>
    </div>
  );
};

export default BreadCrumb;

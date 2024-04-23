"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/template/templateBrands.module.scss";
import Brand from "@/components/brand/brand";
import { useGetBrandByCategoryQuery } from "@/redux/services/popularBrand";
import { useGetCategoriesQuery } from "@/redux/services/categories";
import CategorySkeleton from "@/components/Skeleton/categorySkeleton";
import BrandSkeleton from "@/components/Skeleton/brandSkeleton";
import { useRouter } from "next/navigation";

const TemplateBrands = () => {
  const router = useRouter();
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoriesData) {
      setCategories([
        {
          id: 0,
          name: "All Brands",
          slug: "all",
        },
        ...categoriesData?.data,
      ]);
    }
  }, [categoriesData]);

  const BrandsButton = ({ name, handleClick, active }) => {
    return (
      <div className={`${style.button_wrapper} ${active ? style.active : ""}`}>
        <button onClick={handleClick}>{name}</button>
      </div>
    );
  };

  //************** Category Functionality Start **************//

  const [categoryName, setCategoryName] = useState("All Brands");
  const [categoryId, setCategoryId] = useState(0);
  const [slug, setSlug] = useState("all");
  const { currentData: brandsData, isLoading: brandLoading } =
    useGetBrandByCategoryQuery(slug);
  const handleCategory = (id, name, slug) => {
    setSlug(slug);
    setCategoryId(id);
    setCategoryName(name);
  };

  let renderCategory = <CategorySkeleton count={6} />;
  if (categories.length > 1) {
    renderCategory = categories.map((category) => {
      return (
        <BrandsButton
          key={category.id}
          name={category.name}
          handleClick={() =>
            handleCategory(category.id, category.name, category.slug)
          }
          active={categoryId === category.id}
        />
      );
    });
  }
  //************** Category Functionality End **************//
  //************** Brands Functionality Start **************//
  const handleBrand = (id, slug) => {
    router.push(`/brands/${slug}`);
  };
  let renderBrands = brandLoading && <BrandSkeleton count={6} />;
  if (brandsData?.data.length) {
    renderBrands = brandsData?.data.map((brand) => {
      return (
        <Brand
          handleClick={() => handleBrand(brand.id, brand.slug)}
          key={brand.id}
          image={brand.image_url}
        />
      );
    });
  }
  //************** Brands Functionality End **************//
  return (
    <div>
      <div className={style.category_wrapper}>{renderCategory}</div>
      <div className={style.title_wrapper}>
        <h2>{categoryName}</h2>
      </div>
      <div className={style.card_wrapper}>{renderBrands}</div>
    </div>
  );
};

export default TemplateBrands;

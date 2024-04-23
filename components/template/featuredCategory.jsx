import React from "react";
import FeaturedCategoryCard from "@/components/featuredCategoryCard/featuredCategoryCard";
import SectionTitle from "@/components/sectionTitle/sectionTitle";
import style from "@/styles/template/featuredCategory.module.scss";
import { useGetPopularCategoriesQuery } from "@/redux/services/popularCategories";
import BrandSkeleton from "@/components/Skeleton/brandSkeleton";
import { useRouter } from "next/navigation";

const FeaturedCategory = () => {
  const router = useRouter();
  const { data, isLoading } = useGetPopularCategoriesQuery();
  const handleCategoryClick = (slug) => {
    router.push(`/products/${slug}`);
  };
  let renderCategories = <BrandSkeleton height={`150px`} count={5} />;
  if (!isLoading && data?.data?.length) {
    renderCategories = data.data.map((category) => {
      return (
        <div key={category.id} className={style.grid_item}>
          <FeaturedCategoryCard
            handleClick={() => {
              handleCategoryClick(category.slug);
            }}
            image_url={category.image_url}
            index={category.id}
            name={category.name}
            count={category.count}
          />
        </div>
      );
    });
  }
  return (
    <div className={style.content_wrapper}>
      <div className={style.section_header}>
        <SectionTitle title="Featured Categories" />
      </div>
      <div className={style.grid_container}>{renderCategories}</div>
    </div>
  );
};

export default FeaturedCategory;

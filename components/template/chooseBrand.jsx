import React from "react";
import style from "@/styles/template/chooseBrand.module.scss";
import Brand from "@/components/brand/brand";
import SeeAllButton from "@/components/seAllButton/seeAllButton";
import SectionTitle from "@/components/sectionTitle/sectionTitle";
import { useGetPopularBrandQuery } from "@/redux/services/popularBrand";
import BrandSkeleton from "@/components/Skeleton/brandSkeleton";
import { useRouter } from "next/navigation";

const ChooseBrand = ({ isNotShowButton }) => {
  const router = useRouter();
  const handleBrand = (id) => {
    router.push(`/brands/${id}`);
  };
  const { data, isLoading } = useGetPopularBrandQuery();
  let renderBrand = <BrandSkeleton count={7} />;
  if (!isLoading && data) {
    renderBrand = data?.data?.map((item, index) => {
      return (
        <Brand
          handleClick={() => handleBrand(item.slug)}
          key={index}
          image={item.image_url}
        />
      );
    });
  }
  return (
    <div className={style.section_wrapper}>
      {!isNotShowButton && <SectionTitle title="Choose Brand" />}
      <div className={style.card_wrapper}>{renderBrand}</div>
      {!isNotShowButton && (
        <div className={style.button_wrapper}>
          <SeeAllButton link="/brands" text="See all Brands" />
        </div>
      )}
    </div>
  );
};

export default ChooseBrand;

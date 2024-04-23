"use client";
import Header from "@/components/header/header";
import { useGetSubCategoryQuery } from "@/redux/services/auth";

const MainHeader = () => {
  const { data, error } = useGetSubCategoryQuery();
  return (
    <div className="main-header-wrapper">
      <Header category={data?.data} error={error} />
    </div>
  );
};

export default MainHeader;

import React, { useEffect, useRef, useId } from "react";
// import ChooseBrand from "@/components/template/chooseBrand";
import { skipToken } from "@reduxjs/toolkit/query";
import style from "@/styles/template/product.module.scss";
import Select from "@/components/ui/select";
import ProductCard from "@/components/productCard/productCard";
// import SeeAllButton from "@/components/seAllButton/seeAllButton";
import Checkbox from "@/components/ui/checkbox";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
// import { useGetBrandByCategoryQuery } from "@/redux/services/popularBrand";
// import BrandSkeleton from "@/components/Skeleton/brandSkeleton";
// import Brand from "@/components/brand/brand";
import { useGetCategoriesQuery } from "@/redux/services/categories";
import { useRouter } from "next/navigation";
import {
  useGetProductMetaQuery,
  useGetProductsQuery,
} from "@/redux/services/auth";
import Skeleton from "@/components/Skeleton/skeleton";
import Pagination from "@/components/pagination/pagination";
import { useGetBrandByCategoryQuery } from "@/redux/services/popularBrand";
import BrandSkeleton from "@/components/Skeleton/brandSkeleton";
import Brand from "@/components/brand/brand";
import BrandFiltering from "@/components/brand/brandFiltering";
import Modal from "react-bootstrap/Modal";
import dynamic from "next/dynamic";
import styles from "@/styles/components/addReview.module.scss";
import { Spinner } from "react-bootstrap";

const DynamicModal = dynamic(() => import("react-bootstrap/Modal"), {
  ssr: false,
});
const Product = ({ page, search }) => {
  const titleRef = useRef();
  const key = useId();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("page")) {
        setProductParams((prev) => ({
          ...prev,
          page: localStorage.getItem("page"),
        }));
      } else {
        localStorage.setItem("page", 1);
      }
    }
    if (window.innerWidth <= 991) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  const [productParams, setProductParams] = useState({
    name: search ? page?.toString().replace(/-/g, " ") : "",
    is_official: "",
    category: search ? "" : page,
    brand: "",
    value: "",
    short_by: "",
    page: 1,
    price_from: "",
    price_to: "",
  });
  const handleLoadMore = () => {
    titleRef?.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setProductParams((prev) => ({
      ...prev,
      page: `${parseInt(prev.page) + 1}`,
    }));
  };
  const { currentData: productsData, isLoading: productLoading } =
    useGetProductsQuery(productParams);
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   if (productsData?.data?.products?.length) {
  //     setProducts(productsData?.data?.products);
  //   }
  // }, []);
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const hideSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //**************** Handle Price Filter Start ****************//
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
    if (e.target.value === "" || e.target.value < 50) {
      setProductParams({ ...productParams, price_from: "" });
    } else {
      setProductParams((prev) => ({
        ...prev,
        page: `1`,
      }));
      setProductParams({ ...productParams, price_from: e.target.value });
    }
  };
  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
    if (e.target.value === "" || e.target.value < 50) {
      setProductParams({ ...productParams, price_to: "" });
    } else {
      setProductParams({ ...productParams, price_to: e.target.value });
    }
  };
  //**************** Handle Price Filter End ****************//

  // ************** Categories Functionality Start **************//
  const { currentData: categoriesData, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const handleCategory = (slug, id, e) => {
    if (e.target.checked) {
      router.push(`/products/${slug}`);
    } else {
      router.push(`/products/gadgets`);
    }
    setCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  let renderCategories = null;
  if (categoriesData?.data.length) {
    renderCategories = categoriesData?.data.map((category) => {
      return (
        <label
          htmlFor={category.slug}
          className={style.sidebar_content_body_item}
          key={category.id}
        >
          <Checkbox
            defaultChecked={categories.includes(page) || page === category.slug}
            handleChange={(e) => handleCategory(category.slug, category.id, e)}
            value={category.slug}
            id={category.slug}
          />
          <span>
            <img
              src={category.icon}
              alt="badge"
              height="16px"
              width="16px"
              style={{ objectFit: "contain" }}
            />
            {category.name}
          </span>
        </label>
      );
    });
  }
  // ************** Categories Functionality End **************//
  // ************** Product Meta Functionality Start **************//
  const [productMeta, setProductMeta] = useState([]);
  const handleMeta = (e, id) => {
    setProductParams();

    if (e.target.checked) {
      setProductMeta((prev) => [...prev, id]);
      setProductParams((prev) => ({
        ...prev,
        value: prev.value ? prev.value + "," + id : id,
      }));
    } else {
      setProductMeta((prev) => prev.filter((item) => item !== id));
      setProductParams((prev) => ({
        ...prev,
        value: productMeta.filter((item) => item !== id).join(","),
      }));
    }
    titleRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  // console.log(productsData?.data?.meta);
  const [pageName, setPageName] = useState(skipToken);
  const [pageShow, setPageShow] = useState("");
  useEffect(() => {
    if (page) {
      setPageShow(page);
    }
    if (!search && page) {
      setPageName(page);
    }
  }, [page]);
  const { currentData: productMetaData, isLoading: productMetaLoading } =
    useGetProductMetaQuery(pageName);
  let renderProductMeta = null;
  if (productMetaData?.data.length) {
    renderProductMeta = productMetaData?.data.map((meta, index) => {
      return (
        <React.Fragment key={index}>
          <div className={style.sidebar_content_header}>
            <p>{meta.key}</p>
          </div>
          {meta.values.map((value) => {
            return (
              <div className={style.sidebar_content_body} key={value.id}>
                <label
                  htmlFor={value.id}
                  className={style.sidebar_content_body_item}
                >
                  <Checkbox
                    handleChange={(e) => handleMeta(e, value.id)}
                    id={value.id}
                  />
                  <span>{value.value}</span>
                </label>
              </div>
            );
          })}
        </React.Fragment>
      );
    });
  }
  // ************** Product Meta Functionality End **************//
  const handleOfficial = (e) => {
    setProductParams((prev) => ({
      ...prev,
      page: `1`,
    }));
    if (e.target.checked) {
      setProductParams((prev) => ({ ...prev, is_official: 1 }));
    } else {
      setProductParams((prev) => ({ ...prev, is_official: 0 }));
    }
  };
  let sidebar = (
    <div className={style.sidebar_content_wrapper} key={key}>
      <div className={style.sidebar_content}>
        <div className={style.sidebar_content_header}>
          <p>Product Type</p>
        </div>
        <div className={style.sidebar_content_body}>
          <label
            htmlFor="officaial"
            className={style.sidebar_content_body_item}
          >
            <Checkbox handleChange={(e) => handleOfficial(e)} id="officaial" />
            <span>
              <img src="/icons/badge.svg" alt="badge" />
              Official Products
            </span>
          </label>
        </div>
      </div>
      <div className={style.sidebar_content}>
        <div className={style.sidebar_content_header}>
          <p>Categories</p>
        </div>
        <div className={style.sidebar_content_body}>{renderCategories}</div>
      </div>
      <div className={style.sidebar_content}>
        <div className={style.sidebar_content_header}>
          <p>Price</p>
        </div>
        <div className={`${style.sidebar_content_body} ${style.price_wrapper}`}>
          <div className={style.price_input_wrapper}>
            <input
              onChange={handleMinPrice}
              value={minPrice}
              type="number"
              placeholder="Min"
            />
          </div>
          <div className={style.price_input_wrapper}>
            <input
              onChange={handleMaxPrice}
              value={maxPrice}
              type="number"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      {/*<div className={style.sidebar_content}>{renderProductMeta}</div>*/}
    </div>
  );
  const [brandPopup, setBrandPopup] = useState(false);
  const handleBrandPopupClose = () => {
    setBrandPopup(false);
  };
  const { currentData: brandsData, isLoading: brandLoading } =
    useGetBrandByCategoryQuery(page);
  const [brandCount, setBrandCount] = useState(
    typeof window !== "undefined" && window.innerWidth <= 991 ? 9 : 19,
  );
  const handleMoreBrand = () => {
    mobile ? setBrandPopup(true) : setBrandCount((prev) => prev + 19);
  };
  let renderMoreBrand = null;
  if (brandCount >= 9 && brandCount < brandsData?.data.length) {
    renderMoreBrand = (
      <div onClick={handleMoreBrand} className={style.read_more_button}>
        More...
      </div>
    );
  }
  // ************** Brands Functionality Start **************//
  const [brandId, setBrandId] = useState(null);
  const handleBrand = (brand) => {
    // setProducts([]);
    setProductParams((prev) => ({
      ...prev,
      page: `1`,
    }));
    setBrandPopup(false);
    setBrandId(brand);
    setProductParams((prev) => ({ ...prev, brand: brand }));
    titleRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  let renderMobileBrand = brandLoading && (
    <BrandSkeleton height="40px" count={12} />
  );
  if (brandsData?.data.length) {
    renderMobileBrand = brandsData?.data.map((brand) => {
      return (
        <BrandFiltering
          name={brand.name}
          handleClick={() => handleBrand(brand.id)}
          active={brandId === brand.id}
          key={brand.id}
          image={brand.image_url}
        />
      );
    });
  }
  let renderBrands = brandLoading && <BrandSkeleton height="40px" count={12} />;
  if (brandsData?.data.length) {
    renderBrands = brandsData?.data.slice(0, brandCount).map((brand) => {
      return (
        <BrandFiltering
          name={brand.name}
          active={brandId === brand.id}
          handleClick={() => handleBrand(brand.id)}
          key={brand.id}
          image={brand.image_url}
        />
      );
    });
  }
  //************** Brands Functionality End **************//
  const handleSort = (e) => {
    setProductParams((prev) => ({ ...prev, short_by: e.target.value }));
  };
  const handlePagination = (page) => {
    setProductParams((prev) => ({ ...prev, page: page.selected + 1 }));
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      localStorage.setItem("page", page.selected + 1);
    }
  };
  let renderPagination = "";
  if (productsData?.data?.meta?.total_pages > 1) {
    renderPagination = (
      <Pagination
        pageCount={productsData?.data?.meta?.total_pages}
        handlePageClick={handlePagination}
        pageFirstShow={productsData?.data?.meta?.current_page}
      />
    );
  }
  // ************** Products Functionality End **************//

  // ************** Products Functionality Start **************//
  let renderProducts = null;
  if (!productLoading && productsData?.data?.products?.length) {
    renderProducts = productsData?.data?.products?.map((item) => {
      return (
        <div className="col-lg-4 col-6 mb-lg-4 mb-0" key={item.id}>
          <ProductCard
            image={item?.image_url}
            hover_image={item?.hover_image_url}
            price={item?.price}
            offer_price={item?.price_after_discount}
            name={item?.name}
            slug={item?.slug}
            id={item?.id}
            is_favorite={item?.is_favorite}
            is_in_cart={item?.is_cart}
            is_stock_out={item?.is_stock_out}
          />
        </div>
      );
    });
  }

  return (
    <div ref={titleRef}>
      <div className={style.brand_wrapper}>
        {renderBrands} {renderMoreBrand}
      </div>
      <div className={style.main_section_wrapper}>
        {/*    sidebar start*/}
        {!mobile && <div className={style.sidebar_wrapper}>{sidebar}</div>}

        {/*    sidebar end*/}
        {/*    main section start*/}
        <div className={style.main_section}>
          <div className={style.main_section_header}>
            <h2
              style={{
                textTransform: "capitalize",
              }}
            >
              {pageShow
                ? pageShow?.toString().replace(/-/g, " ")
                : "All Products"}
            </h2>
            <div className={style.dropdown_wrapper}>
              <Select
                onChange={(e) => handleSort(e)}
                options={[
                  { value: "", label: "Sort by" },
                  { value: "desc", label: "Price high to low" },
                  { value: "asc", label: "Price low to high" },
                ]}
              />
            </div>
            <div className={style.mobile_filter_button_wrapper}>
              <button onClick={hideSidebar}>
                <img
                  src="/icons/filter.svg"
                  alt="filter"
                  className="img-fluid"
                />
                <span> Filter </span>
              </button>
            </div>
          </div>
          <div className="">
            <div className="row">
              {productLoading ? (
                <Skeleton isNotRow count={3} />
              ) : (
                renderProducts
              )}
            </div>
            {/*show more button*/}
            {/*{productsData?.data?.meta?.total_pages > 1 && (*/}
            {/*  <div className={style.show_more_button_wrapper}>*/}
            {/*    <button*/}
            {/*      onClick={handleLoadMore}*/}
            {/*      className={style.show_more_button}*/}
            {/*      disabled={*/}
            {/*        productsData?.data?.meta?.current_page ===*/}
            {/*        productsData?.data?.meta?.total_pages*/}
            {/*      }*/}
            {/*    >*/}
            {/*      {productLoading ? (*/}
            {/*        <Spinner size="sm" animation="border" variant="light" />*/}
            {/*      ) : (*/}
            {/*        "Show More"*/}
            {/*      )}*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*)}*/}

            <div className={style.button_wrapper}>{renderPagination}</div>
          </div>
        </div>
        {/*    main section end*/}
        <Offcanvas
          className="filter_sidebar"
          show={showSidebar}
          onHide={hideSidebar}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>FILTER</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{sidebar}</Offcanvas.Body>
        </Offcanvas>
      </div>
      <DynamicModal
        className="brand_modal_wrapper"
        centered={true}
        onHide={handleBrandPopupClose}
        show={brandPopup}
      >
        <Modal.Body>
          <div
            className={`modal_close_wrapper`}
            onClick={handleBrandPopupClose}
          >
            <img
              src="/images/close.svg"
              alt="close"
              height="30px"
              width="30px"
            />
          </div>
          <div className="brand_filtering_header">
            <h2>FILTER BY BRAND</h2>
            <div className="brand_filtering_header_border"></div>
            <div className="brand_content_wrapper">
              {brandLoading ? (
                <BrandSkeleton height="40px" count={12} />
              ) : (
                renderMobileBrand
              )}
            </div>
          </div>
        </Modal.Body>
      </DynamicModal>
    </div>
  );
};

export default Product;

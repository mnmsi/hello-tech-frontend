"use client";
import ProductCard from "@/components/productCard/productCard";
import { useGetPromotionalProductQuery } from "@/redux/services/auth";
export const PromotionalPage = () => {
  const { data, isLoading, error } = useGetPromotionalProductQuery();
  let renderPage = null;
  if (data) {
    renderPage = data?.data?.map((item, index) => {
      return (
        <div className="row" key={index}>
          <h1 className="brands_page_title  my-5">{item?.title}</h1>
          {item?.all_products?.map((product, index) => {
            return (
              <div className="col-lg-3 col-6 mb-lg-4" key={index}>
                <ProductCard
                  image={product?.image_url}
                  hover_image={product?.hover_image_url}
                  price={product?.price}
                  offer_price={product?.price_after_discount}
                  name={product?.name}
                  slug={product?.slug}
                  id={product?.id}
                  is_favorite={item?.is_favorite}
                  is_in_cart={item?.is_cart}
                  is_stock_out={item?.is_stock_out}
                />
              </div>
            );
          })}
        </div>
      );
    });
  }
  return (
    <div className="container mt-lg-5 mt-3">
      <div>
        {isLoading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          renderPage
        )}
      </div>
    </div>
  );
};

export default PromotionalPage;

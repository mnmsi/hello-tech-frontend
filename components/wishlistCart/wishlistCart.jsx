import React from "react";
import style from "@/styles/components/wishlistCard.module.scss";
import Link from "next/link";
import LazyImage from "@/components/ui/LazyImage";
const WishListCart = ({
  product_id,
  slug,
  price,
  offer_price,
  brand,
  image,
  name,
  handleTrash,
}) => {
  return (
    <div className={style.wishlist_wrapper}>
      <div className={style.wishlist_content_wrapper}>
        <div className={style.delete_icon_wrapper}>
          <button type="button" onClick={() => handleTrash(product_id)}>
            <img src="/icons/bin.svg" alt="bin" />
          </button>
        </div>
        <div className={style.wishlist_content}>
          <div className={style.wishlist_image_wrapper}>
            <div className={style.image_wrapper}>
              <LazyImage src={image} alt="product" />
            </div>
            <div className={style.content_wrapper}>
              <h3>{name}</h3>
              <h4>{brand}</h4>
              <div className={style.price_wrapper}>
                <h5>
                  <span>৳</span>
                  {offer_price ?? null}
                </h5>
                <h5>
                  <span>৳</span>
                  {price ?? null}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className={style.wishlist_button}>
          <Link href={`product/${slug}`}>BUY NOW</Link>
        </div>
      </div>
    </div>
  );
};

export default WishListCart;

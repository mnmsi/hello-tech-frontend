import React, { useEffect, useState } from "react";
import style from "@/styles/components/cart.module.scss";
import Checkbox from "@/components/ui/checkbox";
import LazyImage from "@/components/ui/LazyImage";
import Link from "next/link";
const Cart = ({
  handleTrash,
  id,
  name,
  color,
  price,
  offer_price,
  count,
  handleIncrement,
  handleDecrement,
  handleCheck,
  isCheck,
  image,
  slug,
}) => {
  return (
    <div className={style.cart_wrapper}>
      <div className={style.delete_icon}>
        <button type="button" onClick={handleTrash}>
          <img src="/icons/bin.svg" alt="bin" />
        </button>
      </div>
      <div className={style.cart}>
        <div className={style.cart_content_wrapper}>
          <div className={style.image_wrapper}>
            <div className={style.checkbox_wrapper}>
              <Checkbox
                id={id}
                defaultChecked={isCheck}
                handleChange={handleCheck}
              />
            </div>
            <LazyImage src={image} />
          </div>
          <Link
            href={`product/${slug}`}
            className={style.cart_main_content_wrapper}
          >
            <h2>{name}</h2>
            <div className={style.color_wrapper}>
              <p>{color ?? null}</p>
            </div>
            <div className={style.price_wrapper}>
              <h5 className={style.offer_price}>
                <span>৳</span>
                {offer_price ?? null}
              </h5>
              {price ? (
                <h5 className={style.price}>
                  <span>৳</span>
                  {price ?? null}
                </h5>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
      {/*    quantity*/}
      <div className={style.product_quantity_wrapper}>
        <div className={style.product_quantity}>
          <button disabled={count <= 1} onClick={handleDecrement}>
            -
          </button>
          <input disabled type="text" value={count} />
          <button disabled={count >= 5} onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>
      {/*    quantity*/}
    </div>
  );
};

export default Cart;

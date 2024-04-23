"use client";
import { useState } from "react";
import style from "@/styles/components/productCard.module.scss";
import { useRouter } from "next/navigation";
import {
  useAddToWishlistMutation,
  useDeleteWishlistMutation,
} from "@/redux/services/auth";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import Link from "next/link";

const ProductCard = ({
  id,
  image,
  hover_image,
  price,
  offer_price,
  name,
  slug,
  is_favorite,
  is_in_cart,
  is_offer_price,
  is_stock_out,
}) => {
  const router = useRouter();
  const token = getCookie("token");
  const [isFavorite, setFavorite] = useState(is_favorite);
  // const [isInCart, setInCart] = useState(is_in_cart);
  const [addToWishlist] = useAddToWishlistMutation();
  const handleRedirect = (e, slug, is_stock_out) => {
    e.preventDefault();
    e.stopPropagation();
    // router.push(`/product/${slug}`);
    //   open new tab when click ctrl + click
    if (e.ctrlKey) {
      window.open(`/product/${slug}`);
    } else {
      router.push(`/product/${slug}`);
    }
  };
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    router.push("/cart");
  };
  const handleWishList = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (token) {
      addToWishlist({ product_id: id }).unwrap();
      setFavorite(true);
    } else {
      toast.error("Please login first");
    }
  };
  const [removeFromWishlist, { isSuccess, isError, error }] =
    useDeleteWishlistMutation();
  const deleteWishlist = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (token) {
      removeFromWishlist(id, token).unwrap();
      setFavorite(false);
    } else {
      toast.error("Please login first");
    }
  };
  return (
    <div>
      {/*desktop card*/}
      <Link
        href={`/product/${slug}`}
        className={`${style.card_wrapper} ${
          is_stock_out ? style.stock_out : ""
        }`}
      >
        {is_stock_out && (
            <div className={style.stock_out_overlay}>
              {/*<span>Stock Out</span>*/}
              <img height={142} width={235} src="/icons/stock_out.jpg" alt="stock out"/>
            </div>
        )}
        {!is_stock_out && (
            <div className={style.card_overlay}>
            <div onClick={(e) => handleRedirect(e, slug, is_stock_out)}>
              <img
                src="/icons/card/eye.svg"
                alt="card"
                height="36px"
                width="36px"
              />
            </div>
            {isFavorite ? (
              <div
                className={`${token ? "d-block" : "d-none"}`}
                onClick={(e) => deleteWishlist(e, id)}
              >
                <img
                  src="/icons/card/heart_fill.svg"
                  alt="card"
                  height="36px"
                  width="36px"
                />
              </div>
            ) : (
              <div
                className={`${token ? "d-block" : "d-none"}`}
                onClick={(e) => handleWishList(e, id)}
              >
                <img
                  src="/icons/card/heart.svg"
                  alt="card"
                  height="36px"
                  width="36px"
                />
              </div>
            )}
          </div>
        )}
        <div className={`${style.card} `}>
          <div className={`${style.card_image}`}>
            <img
                width={900}
                height={360}
              src={image}
              className={`img-fluid`}
              alt="product"
              loading="lazy"
            />
            {hover_image && (
              <img
                  width={900}
                  height={360}
                loading="lazy"
                src={hover_image}
                className={style.hover_card_image}
                alt="product"
              />
            )}
          </div>
          <div className={style.card_body}>
            <div className={style.card_title}>
              {name?.length > 40 ? name.slice(0, 40) + "..." : name}
            </div>
            <div className={style.card_price}>
              <span className={style.offer_price}>
                &#2547;
                {offer_price
                  ? offer_price.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                    })
                  : price?.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                    })}
              </span>
              {offer_price !== null ? (
                <span className={style.price}>
                  &#2547;
                  {price?.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
      {/*  mobile card*/}
      <Link
        href={`/product/${slug}`}
        className={`${style.mobile_card_wrapper} ${
          is_stock_out ? style.mobile_stock_out : ""
        }`}
      >
        {is_stock_out && (
          <div className={style.mobile_stock_out_overlay}>
            {/*<span>Stock Out</span>*/}
            <img src="/icons/stock_out.jpg" alt="stock out" />
          </div>
        )}
        <div className={style.mobile_card}>
          <div className={style.mobile_card_image}>
            <img
                width={900}
                height={360}
              src={image}
              className={`img-fluid`}
              alt="product"
              loading="lazy"
            />
          </div>
          <div className={style.mobile_card_body}>
            <div className={style.mobile_card_title}>
              {name?.length > 32 ? name.slice(0, 25) + "..." : name}
            </div>
            <div className={style.card_price}>
              <span className={style.offer_price}>
                &#2547;
                {offer_price
                  ? offer_price.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                    })
                  : price?.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                    })}
              </span>
              {offer_price !== null ? (
                <span className={style.price}>
                  &#2547;
                  {price?.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                </span>
              ) : null}
            </div>
            <div className={style.mobile_card_button_wrapper}>
              <button
                disabled={is_stock_out}
                onClick={(e) => handleRedirect(e, slug, is_stock_out)}
              >
                <img src="/icons/m_cart.svg" alt="cart" className="img-fluid" />
              </button>
              {isFavorite ? (
                <button
                  disabled={is_stock_out}
                  onClick={(e) => deleteWishlist(e, id)}
                >
                  <img
                    src="/icons/m_wish_fill.svg"
                    alt="cart"
                    className="img-fluid"
                  />
                </button>
              ) : (
                <button
                  disabled={is_stock_out || !token}
                  onClick={(e) => handleWishList(e, id)}
                >
                  <img
                    src="/icons/m_wish.svg"
                    alt="cart"
                    className="img-fluid"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

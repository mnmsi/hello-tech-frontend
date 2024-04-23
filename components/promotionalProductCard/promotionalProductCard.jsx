"use client";
import style from "@/styles/components/productCard.module.scss";
import { useRouter } from "next/navigation";
const PromotionalProductCard = ({
  image,
  hover_image,
  price,
  offer_price,
  name,
  slug,
}) => {
  const router = useRouter();
  const handleRedirect = (e, slug) => {
    router.push("/product/" + slug);
    e.stopPropagation();
  };
  return (
    <div>
      {/*desktop card*/}
      <div
        onClick={(e) => handleRedirect(e, slug)}
        className={style.card_wrapper}
      >
        <div className={style.card_overlay}>
          {/*<div onClick={handleAddToCart}>*/}
          {/*  <img*/}
          {/*    src="/icons/card/card.svg"*/}
          {/*    alt="card"*/}
          {/*    height="36px"*/}
          {/*    width="36px"*/}
          {/*  />*/}
          {/*</div>*/}
          <div onClick={(e) => handleRedirect(e, slug)}>
            <img
              src="/icons/card/eye.svg"
              alt="card"
              height="36px"
              width="36px"
            />
          </div>
        </div>
        <div className={`${style.card} `}>
          <div className={`${style.card_image}`}>
            <img
              src={image}
              className={`img-fluid`}
              alt="product"
              loading="lazy"
            />
            {hover_image && (
              <img
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
      </div>
      {/*  mobile card*/}
      <div
        className={style.mobile_card_wrapper}
        onClick={(e) => handleRedirect(e, slug)}
      >
        <div className={style.mobile_card}>
          <div className={style.mobile_card_image}>
            <img
              src={image}
              className={`img-fluid`}
              alt="product"
              loading="lazy"
            />
          </div>
          <div className={style.mobile_card_body}>
            <div className={style.mobile_card_title}>
              {name?.length > 32 ? name.slice(0, 32) + "..." : name}
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
              <button onClick={(e) => handleRedirect(e, slug)}>
                <img src="/icons/m_cart.svg" alt="cart" className="img-fluid" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalProductCard;

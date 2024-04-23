"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/template/productPreview.module.scss";
import LazyImage from "@/components/ui/LazyImage";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from "next/navigation";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useDeleteWishlistMutation,
  useGuestAddToCartMutation,
} from "@/redux/services/auth";
import { useCalculateProductPriceMutation } from "@/redux/services/auth";
import { setCookie, getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import SocialShare from "@/components/social-share/socialShare";
import { Breadcrumb } from "react-bootstrap";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import DataLayer from "@/components/dataLayer/dataLayer";

const ProductPreview = ({ data }) => {
  const [isColorStock, setIsColorStock] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [isFavorite, setFavorite] = useState(data?.is_favorite);
  const token = getCookie("token");
  const router = useRouter();
  const [updatePrice] = useCalculateProductPriceMutation();
  const [newPrice, setNewPrice] = useState(
    parseInt(data?.offer_price)
      ? parseInt(data?.offer_price)
      : parseInt(data?.price),
  );
  const [oldPrice, setOldPrice] = useState(parseInt(data?.price));
  const [colorId, setColorId] = useState(null);
  const [isStock, setIsStock] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState({
    name: null,
    code: null,
    id: null,
  });

  // ******************** Handle Product Color Change ********************//

  const handleColorChange = (color, color_code, id, price, stock) => {
    setSelectedColor({
      name: color,
      code: color_code,
      id: id,
    });
    setColorId(id);
    setIsStock(stock);
    if (stock > 0) {
      setIsColorStock(true);
    } else {
      setIsColorStock(false);
    }
  };

  const handleWishList = (e, id) => {
    e.stopPropagation();
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
    if (token) {
      removeFromWishlist(id, token).unwrap();
      setFavorite(false);
    } else {
      toast.error("Please login first");
    }
  };

  useEffect(() => {
    if (data?.colors?.length === 1) {
      setSelectedColor({
        name: data?.colors[0]?.name,
        code: data?.colors[0]?.color_code,
        id: data?.colors[0]?.id,
      });
      setColorId(data?.colors[0]?.id);
      setIsStock(data?.colors[0]?.stock);
    }
  }, []);
  // ******************** Handle Product Color Change ********************//
  let renderColor = null;
  if (data?.colors?.length > 0) {
    renderColor = data?.colors?.map((item, index) => {
      return (
        <div
          // style={{
          //   backgroundColor: "red",
          // }}
          key={index}
          onClick={() =>
            handleColorChange(
              item.name,
              item.color_code,
              item.id,
              item.price,
              item.stock,
            )
          }
          className={style.product_color_item}
          style={{
            backgroundColor: "red",
            backgroundColor: item?.color_code,
            border:
              selectedColor?.id === item?.id ? `2px solid ${`#F16F24`}` : null,
          }}
        ></div>
      );
    });
  }
  // ******************** Handle Product Color Change End ********************//
  // ******************** Handle Product Feature Change ********************//
  const [featureId, setFeatureId] = useState([]);
  const handleFeature = (id, price, stock, key) => {
    if (featureId.includes(id)) {
      setFeatureId((prev) => prev.filter((item) => item !== id));
    } else {
      setFeatureId((prev) => [...prev, id]);
    }
    setIsStock(stock);
    if (selectedFeature?.[key] === id) {
      setSelectedFeature((prev) => ({ ...prev, [key]: null }));
    } else {
      setSelectedFeature((prev) => ({ ...prev, [key]: id }));
    }
  };
  useEffect(() => {
    if (Object.values(selectedFeature).length > 0 || colorId || quantity) {
      updatePrice({
        quantity: quantity,
        product_id: data?.id,
        color_id: colorId ? colorId : null,
        feature_value_id: Object.values(selectedFeature),
        // feature_value_id: [1],
      })
        .unwrap()
        .then((res) => {
          setNewPrice(res?.data?.discount_price);
          setOldPrice(res?.data?.price);
          // setOldPrice(oldPrice - res?.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [selectedFeature, colorId, quantity]);
  let renderFeature = null;
  if (data?.features?.length > 0) {
    renderFeature = Object.entries(data?.features).map(([key, values]) => {
      if (values?.values.length === 0) return null;
      return (
        <div className={style.product_size_wrapper} key={key}>
          <p>{values.key}</p>
          <div className={style.product_sizes} key={key}>
            {values?.values.map((item, index) => {
              return (
                <button
                  disabled={!item.stock}
                  key={index}
                  onClick={() =>
                    handleFeature(
                      item.id,
                      item.price,
                      item.stock,
                      values?.key,
                      values?.values,
                    )
                  }
                  className={`${style.product_size_item} ${
                    Object.values(selectedFeature).includes(item.id)
                      ? style.feature_active
                      : null
                  }`}
                >
                  {item.value}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  }
  // ******************** Handle Product Feature End ********************//
  // ******************** Handle Product Media ********************//
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (data?.medias?.length > 0) {
      let temp = [];
      data?.medias?.map((item) => {
        temp.push({
          original: item?.thumbnail_url,
          thumbnail: item?.thumbnail_url,
          stock: item?.is_stock_out,
        });
      });
      setImages(temp);
    }
  }, []);
  // ******************** Handle Product Media End ********************//
  // ******************** Handle Product Meta Data ********************//

  // ******************** Handle Product Meta Data End ********************//
  // ******************** Handle Product Quantity ********************//

  const handleQuantity = (type) => {
    if (colorId !== null) {
      if (type === "add") {
        if (quantity < isStock) {
          setQuantity(quantity + 1);
        } else {
          toast.error("Only " + isStock + " product available");
        }
      } else {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      }
    } else {
      toast.error("Please select color");
    }
  };
  // ******************** Handle Product Quantity End ********************//
  // ******************** Handle Add To Cart ********************//
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [guestAddToCart, { isLoading: isGuestAddingCart }] =
    useGuestAddToCartMutation();
  const [addToCartData, setAddToCartData] = useState({});
  // ******************** Guest Add To Cart ********************//

  const handleAddToCart = () => {
    if (colorId !== null) {
      if (quantity > isStock) {
        toast.error("Only " + isStock + " product available");
      } else {
        let formData = new FormData();
        formData.append("product_name", data?.name);
        formData.append("product_id", data?.id);
        formData.append("quantity", quantity);
        if (colorId) {
          formData.append("product_color_id", colorId);
        } else {
          toast.error("Please select color");
          return;
        }
        if (Object.values(selectedFeature).length > 0) {
          formData.append(
            "product_data",
            JSON.stringify(Object.values(selectedFeature)),
          );
        }
        if (token) {
          addToCart(formData)
            .unwrap()
            .then((res) => {
              toast.success("Product added to cart successfully");
            })
            .catch((err) => {
              toast.error(err.data.message);
            });
        } else {
          if (getCookie("guest_id") !== undefined) {
            formData.append("guest_user_id", getCookie("guest_id"));
            guestAddToCart(formData)
              .unwrap()
              .then((res) => {
                toast.success("Product added to cart successfully");
              })
              .catch((err) => {
                toast.error(err.data.message);
              });
          }
        }
        setAddToCartData({
          item_name: data?.name,
          item_id: data?.id,
          item_brand: data?.brand?.name,
          item_category: data?.category?.name,
          price: newPrice,
          quantity: quantity,
        });
      }
    } else {
      toast.error("Please select color");
    }
  };
  // ******************** Handle Add To Cart End ********************//
  // ******************** Handle Add Buy Now ********************//
  const handleBuyNow = () => {
    if (colorId !== null) {
      if (quantity > isStock) {
        toast.error("Only " + isStock + " product available");
      } else {
        let buyNowData = {
          product_code: data?.product_code,
          product_name: data?.name,
          product_color_name: selectedColor?.name,
          product_id: data?.id,
          quantity: quantity,
          product_color_id: colorId,
          product_data: Object.values(selectedFeature),
          product_price: newPrice,
          image: data?.medias?.filter(
            (item) => item.color === selectedColor.name,
          )[0]?.thumbnail_url,
        };
        if (colorId) {
          setCookie("buyNow", JSON.stringify(buyNowData), {
            path: "/",
            maxAge: 3600,
          });
          router.push("/checkout");
        } else {
          toast.error("Please select color");
        }
      }
    } else {
      toast.error("Please select color");
    }
  };
  const getThumbnailClass = (item) => {
    if (item.stock) {
      return "stock_not_available";
    } else {
      return "stock_available";
    }
  };
  const modifyImage = images.map((item) => {
    return {
      ...item,
      originalClass: getThumbnailClass(item),
      thumbnailClass: getThumbnailClass(item),
    };
  });
  return (
    <div>
      <BreadCrumb
        category={`${data?.category?.name}`}
        categoryLink={`/products/${data?.category?.slug}`}
        productName={`${data?.name}`}
      />
      <div className={style.preview_wrapper}>
        <div className={style.preview_image_wrapper}>
          <ImageGallery
            useBrowserFullscreen={false}
            items={modifyImage}
            startIndex={
              selectedColor.name === null
                ? 0
                : data?.medias?.findIndex(
                    (item) => item.color === selectedColor.name,
                  )
            }
            showNav={false}
            showPlayButton={false}
          />
        </div>
        <div className={style.preview_info_wrapper}>
          <div className={style.product_brand_wrapper}>
            <LazyImage src={data?.brand?.image_url} alt="product image" />
          </div>
          <div className={style.product_name_wrapper}>
            <h2>{data?.name}</h2>
          </div>
          <div className={style.product_price_wrapper}>
            {newPrice ? (
              <span className={style.product_discount_price}>
                &#2547;{" "}
                {newPrice.toLocaleString("en-US", { minimumFractionDigits: 0 })}
              </span>
            ) : null}
            {data?.offer_price ? (
              <span className={style.product_price}>&#2547; {oldPrice}</span>
            ) : null}
          </div>
          <div className={style.product_stock_count_wrapper}>
            <p>
              {selectedColor.name !== null && (
                <>
                  Availability: <span>Only {isStock} product available</span>
                </>
              )}
            </p>
          </div>
          <div className={style.product_stock_count_wrapper}>
            <p>
              {selectedColor.name !== null && (
                <>
                  SKU: <span>{data?.product_code}</span>
                </>
              )}
            </p>
          </div>
          {/*product color start*/}
          <div className={style.product_color_wrapper}>
            <p
              style={{
                textTransform: "capitalize",
              }}
            >
              Color: {selectedColor?.name ? selectedColor?.name : null}
            </p>
            <div className={style.product_colors}>{renderColor}</div>
          </div>
          {/*  product color end*/}
          {/*   feature */}
          {renderFeature}
          {/*   feature */}
          {/*    quantity*/}
          <p className={style.quantity_title}>Quantity</p>
          <div className={style.favorite_wrapper}>
            <div className={style.product_quantity_wrapper}>
              <div className={style.product_quantity}>
                <button
                  disabled={quantity <= 1}
                  onClick={() => handleQuantity("minus")}
                >
                  -
                </button>
                <input disabled type="text" value={quantity} />
                <button
                  disabled={quantity >= 5}
                  onClick={() => handleQuantity("add")}
                >
                  +
                </button>
              </div>
            </div>
            <div className={style.button_wrapper}>
              {isFavorite ? (
                <button
                  className={style.favorite_button}
                  onClick={(e) => deleteWishlist(e, data?.id)}
                >
                  <img
                    src="/icons/heart_fill.svg"
                    alt="cart"
                    className="img-fluid"
                  />
                </button>
              ) : (
                <button
                  className={style.favorite_button}
                  onClick={(e) => handleWishList(e, data?.id)}
                >
                  <img
                    src="/icons/heart_empty.svg"
                    alt="cart"
                    className="img-fluid"
                  />
                </button>
              )}
            </div>
          </div>
          {/*    quantity*/}
          {/*    add to cart*/}
          <div className={style.product_add_to_cart_wrapper}>
            <button disabled={isAddingToCart} onClick={handleAddToCart}>
              {" "}
              {isAddingToCart ? "Loading" : "Add to cart"}
            </button>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>
          {/*    add to cart end*/}
          {/*    product share start*/}
          <div className={style.product_share_wrapper}>
            <p>Share:</p>
            <SocialShare
              url={process.env.NEXT_PUBLIC_APP_URL + `/product/${data?.slug}`}
            />
          </div>
          {/*    product share end*/}
          <DataLayer productPreview={data} cart={addToCartData} />
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;

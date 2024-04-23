"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/templateCart.module.scss";
import Cart from "@/components/cart/cart";
import Link from "next/link";
import {
  useGuestCartListQuery,
  useUpdateGuestCartMutation,
  useDeleteGuestCartMutation,
} from "@/redux/services/auth";
import Placeholder from "react-bootstrap/Placeholder";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";

const GuestTemplateCart = () => {
  const token = getCookie("token");
  useEffect(() => {
    if (token) {
      router.push("/cart");
    }
  }, []);

  const router = useRouter();
  const { data: guestCartData, isLoading } = useGuestCartListQuery();
  const [deleteGuestCart, { isSuccess: deleteGuestSuccess }] =
    useDeleteGuestCartMutation();
  const [updateGuestCart, { isSuccess: updateGuestSuccess }] =
    useUpdateGuestCartMutation();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = guestCartData?.data?.filter((item) => item.is_checked === 1);
    let total_price = 0;
    total?.map((item) => {
      total_price += item.total_price;
    });
    setTotalPrice(total_price);
  }, [guestCartData]);
  //********** handleTrash **********//
  const handleTrash = (id) => {
    deleteGuestCart({
      cart_id: id,
      guest_user_id: getCookie("guest_id"),
    })
      .unwrap()
      .then((res) => {
        toast.success("Product removed from cart");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  //********** Handle Count **********//
  const handleCount = (id, count, type, is_check) => {
    if (type === "increment") {
      updateGuestCart({
        cart_id: id,
        guest_user_id: getCookie("guest_id"),
        quantity: count + 1,
        status: is_check,
      })
        .unwrap()
        .then((res) => {
          toast.success("Product Cart updated");
        })
        .catch((err) => {
          toast.error(err?.data?.message);
        });
    } else if (type === "decrement") {
      if (count > 1) {
        updateGuestCart({
          cart_id: id,
          guest_user_id: getCookie("guest_id"),
          quantity: count - 1,
          status: is_check,
        })
          .unwrap()
          .then((res) => {
            toast.success("Product Cart updated");
          })
          .catch((err) => {
            toast.error(err?.data?.message);
          });
      }
    }
  };

  //********** handleCheck **********//
  const handleCheck = (e, id, count) => {
    if (e.target.checked) {
      updateGuestCart({
        cart_id: id,
        guest_user_id: getCookie("guest_id"),
        status: 1,
        quantity: count,
      })
        .unwrap()
        .then((res) => {
          toast.success("Product Cart updated");
        })
        .catch((err) => {
          toast.error(err?.data?.message);
        });
    } else {
      updateGuestCart({
        cart_id: id,
        guest_user_id: getCookie("guest_id"),
        status: 0,
        quantity: count,
      })
        .unwrap()
        .then((res) => {
          toast.success("Product Cart updated");
        })
        .catch((err) => {
          toast.error(err?.data?.message);
        });
    }
  };

  //********** handleProceedToCheckout **********//

  const handleProceedToCheckout = () => {
    if (totalPrice) {
      router.push("/checkout");
      deleteCookie("buyNow");
    }
  };

  //********** renderCart **********//

  let renderCart = null;
  if (guestCartData) {
    // console.log(guestCartData?.data);
    renderCart = guestCartData?.data?.map((item, index) => {
      return (
        <Cart
          key={index}
          handleTrash={() => handleTrash(item.id)}
          handleIncrement={() =>
            handleCount(item.id, item.quantity, "increment", item.is_checked)
          }
          handleDecrement={() =>
            handleCount(item.id, item.quantity, "decrement", item.is_checked)
          }
          handleCheck={(e) => handleCheck(e, item.id, item.quantity)}
          name={item.name}
          image={item.image_url}
          slug={item.slug}
          id={item.id}
          count={item.quantity}
          isCheck={item.is_checked !== 0}
          color={item.color_name ? item.color_name : null}
          offer_price={item.total_price}
          // price={item.price === item.price_after_discount ? null : item.price}
        />
      );
    });
  }
  return (
    <div>
      <div className={styles.my_cart}>
        <p>
          My Cart (
          {guestCartData?.data?.length ? guestCartData?.data?.length : 0}){" "}
        </p>
      </div>
      <div className={styles.cart_wrapper}>
        <div>
          {isLoading ? (
            <Placeholder animation="glow">
              <Placeholder
                style={{
                  height: "100px",
                  marginBottom: "20px",
                  backgroundColor: "#ddd",
                }}
                xs={12}
              />
              <Placeholder
                style={{
                  height: "100px",
                  marginBottom: "20px",
                  backgroundColor: "#ddd",
                }}
                xs={12}
              />
              <Placeholder />
            </Placeholder>
          ) : (
            renderCart
          )}
        </div>
        <div className={styles.cart_total}>
          <div className={styles.cart_total_wrapper}>
            <p className={styles.sub_total}>Order Summary</p>
            <div className={styles.cart_total_price}>
              <p className={styles.key}>Subtotal</p>
              <p className={styles.value}>&#2547; {totalPrice}</p>
            </div>
            <div className={styles.total_price_count}>
              <p className={styles.key}>Total</p>
              <p className={styles.value}>&#2547; {totalPrice}</p>
            </div>
          </div>
          <div className={styles.cart_total_button_wrapper}>
            <button
              style={{
                cursor: totalPrice ? "pointer" : "not-allowed",
              }}
              disabled={!totalPrice}
              onClick={handleProceedToCheckout}
              type="button"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestTemplateCart;

"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/templateCart.module.scss";
import Cart from "@/components/cart/cart";
import Link from "next/link";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} from "@/redux/services/auth";
import Placeholder from "react-bootstrap/Placeholder";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";

const TemplateCart = () => {
  const token = getCookie("token");
  useEffect(() => {
    if (!token) {
      router.push("/guest-cart");
    }
  }, []);
  const router = useRouter();
  const { currentData, isLoading } = useGetCartQuery();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = currentData?.data?.filter((item) => item.is_checked === 1);
    let total_price = 0;
    total?.map((item) => {
      total_price += item.total_price;
    });
    setTotalPrice(total_price);
  }, [currentData]);
  //********** handleTrash **********//
  const [deleteCart, { isSuccess, isError, error }] = useDeleteCartMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product removed from cart");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error]);
  const handleTrash = (id) => {
    if (token) {
      deleteCart(id);
    }
  };

  //********** Handle Count **********//
  const [updateCart, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateCartMutation();
  const handleCount = (id, count, type) => {
    if (type === "increment") {
      if (token) {
        updateCart({ id: id, quantity: count + 1 })
          .unwrap()
          .then((res) => {
            toast.success("Product Cart updated");
          })
          .catch((err) => {
            toast.error(err?.data?.message);
          });
      }
    } else if (type === "decrement") {
      if (count > 1) {
        if (token) {
          updateCart({ id: id, quantity: count - 1 }).unwrap();
        }
      }
    }
  };
  //********** handleCheck **********//
  const handleCheck = (e, id) => {
    if (e.target.checked) {
      if (token) {
        updateCart({ id: id, status: 1 }).unwrap();
      }
    } else {
      if (token) {
        updateCart({ id: id, status: 0 }).unwrap();
      }
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
  if (currentData) {
    renderCart = currentData?.data?.map((item, index) => {
      return (
        <Cart
          key={index}
          handleTrash={() => handleTrash(item.id)}
          handleIncrement={() =>
            handleCount(item.id, item.quantity, "increment")
          }
          handleDecrement={() =>
            handleCount(item.id, item.quantity, "decrement")
          }
          handleCheck={(e) => handleCheck(e, item.id)}
          name={item.name}
          image={item.image_url}
          id={item.id}
          slug={item.slug}
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
      <div className={styles.add_address_button}>
        <Link href="/profile/address/add">
          <img
            src="/images/pointer.svg"
            alt="icon"
            height="21px"
            width="19px"
          />
          <span>Add Shipping Address</span>
        </Link>
      </div>
      <div className={styles.my_cart}>
        <p>
          My Cart ({currentData?.data?.length ? currentData?.data?.length : 0}){" "}
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
            {/*<div className={styles.cart_total_price}>*/}
            {/*  <p className={styles.key}>Shipping Fee</p>*/}
            {/*  <p className={styles.value}>&#2547; 0</p>*/}
            {/*</div>*/}
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
              disabled={totalPrice ? false : true}
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

export default TemplateCart;

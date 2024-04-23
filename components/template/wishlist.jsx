"use client";
import React, { useEffect } from "react";
import style from "@/styles/template/wishlist.module.scss";
import WishlistCart from "@/components/wishlistCart/wishlistCart";
import {
  useGetWishlistQuery,
  useDeleteWishlistMutation,
} from "@/redux/services/auth";
import { getCookie } from "cookies-next";
import Placeholder from "react-bootstrap/Placeholder";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const token = getCookie("token");
  const { currentData: wishlist, isLoading } = useGetWishlistQuery(token);
  const [deleteWishlist, { isSuccess, isError, error }] =
    useDeleteWishlistMutation();
  //********** handleTrash **********//
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product removed from wishlist");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error]);
  const handleTrash = (id) => {
    deleteWishlist(id, token).unwrap();
  };
  let renderWishlist = null;
  if (wishlist?.data?.length) {
    renderWishlist = wishlist?.data?.map((item, index) => {
      return (
        <WishlistCart
          handleTrash={handleTrash}
          id={item.id}
          product_id={item.product_id}
          key={index}
          slug={item.slug}
          name={item.name}
          image={item.image_url}
          price={item.price}
          offer_price={item.discount_price}
          brand={item.brand}
        />
      );
    });
  } else {
    renderWishlist = <></>;
  }
  return (
    <div className="container">
      <div className={style.wishlist}>
        <p>Wishlist ({wishlist?.data?.length})</p>
      </div>
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
          <Placeholder
            style={{
              height: "100px",
              marginBottom: "20px",
              backgroundColor: "#ddd",
            }}
            xs={12}
          />
        </Placeholder>
      ) : (
        renderWishlist
      )}
    </div>
  );
};

export default Wishlist;

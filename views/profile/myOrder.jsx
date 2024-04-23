"use client";
import React, { useState } from "react";
import styles from "@/styles/template/myOrder.module.scss";
import ProfileSidebar from "@/components/template/profileSidebar/profileSidebar";
import { useGetOrderListQuery } from "@/redux/services/auth";
import LazyImage from "@/components/ui/LazyImage";
import Offcanvas from "react-bootstrap/Offcanvas";
const MyOrder = () => {
  const { data, isLoading } = useGetOrderListQuery();
  const [show, setShow] = useState(false);
  const handleSidebar = () => {
    setShow(!show);
  };
  let renderOrderList = null;
  if (data) {
    renderOrderList = data?.data?.map((item, index) => {
      return (
        <div className={styles.order_card_wrapper} key={index}>
          <div className={styles.content_wrapper}>
            <div className={styles.order_card_header}>
              <div className={styles.order_card_header_left}>
                <h3>
                  <span>Order</span>{" "}
                  <span className={styles.order_id}>#{item?.order_key}</span>
                </h3>
                <p>Placed on {item?.created_at}</p>
              </div>
              <div className={styles.order_card_header_right}>
                <p
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {item?.status}
                </p>
              </div>
            </div>
            {item?.orders?.map((product, index) => {
              return (
                <div className={styles.order_card_body}>
                  <div className={styles.count}>
                    <p>{index + 1}.</p>
                  </div>
                  <div className={styles.image_wrapper}>
                    <div className={styles.image_container}>
                      <LazyImage
                        src={product?.product_image_url}
                        alt={product?.name}
                      />
                    </div>
                    <p>
                      {product?.name.length > 20
                        ? product?.name.slice(0, 20) + "..."
                        : product?.name}
                    </p>
                  </div>
                  <div className={styles.quantity_wrapper}>
                    <p>Quantity</p>
                    <p>{product?.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.address_wrapper}>
            <div className={styles.address}>
              <h3>Shipping Address</h3>
              <p>
                {item?.address?.address_line} {item?.address?.area}{" "}
                {item?.address?.city}, {item?.address?.division}
              </p>
            </div>
            <div className={styles.total_amount}>
              <h3>Total Amount</h3>
              <p>৳ {item?.total_price}</p>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="container">
      <div className="profile_page_wrapper">
        <div className="sidebar_content_wrapper">
          <ProfileSidebar handleClose={() => setShow(false)} />
        </div>
        <div className="offcanvas_button_wrapper">
          <button onClick={handleSidebar}>
            <img src="/icons/accounts.svg" alt="l" className="img-fluid" />
            <span>My Accounts</span>
          </button>
        </div>
        <div className="main_content_wrapper">
          <div className="section_wrapper">
            <div className="section_header">
              <h2>Order History</h2>
            </div>
            <div className="section_content">
              {/*  order card*/}
              {isLoading ? (
                <div className="loader">Loading...</div>
              ) : (
                renderOrderList
              )}
              {/*order card end*/}
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        className="profile_sidebar"
        show={show}
        onHide={() => setShow(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Accounts</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProfileSidebar handleClose={() => setShow(false)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default MyOrder;

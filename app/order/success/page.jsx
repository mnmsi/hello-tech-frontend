"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/success.module.scss";
import SeeAllButton from "@/components/seAllButton/seeAllButton";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
const SuccessPage = () => {
  const router = useRouter();
  const [data, setData] = useState();
  useEffect(() => {
    let data = getCookie("payment_success");
    if (data) {
      setData(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, []);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[new Date(data?.date).getMonth()];
  const date = new Date(data?.date).getDate();
  const year = new Date(data?.date).getFullYear();
  const hours = new Date(data?.date).getHours() % 12 || 12;
  const minutes = new Date(data?.date).getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  return (
    <div className={styles.success_page_wrapper}>
      <div className="container">
        <div className={styles.success_page}>
          <div className={styles.content_wrapper}>
            <img src="/images/tick.gif" alt="" height="63px" width="63px" />
            <h2>
              Order has been Placed <br /> Successfully!
            </h2>
            {/*<p>Order Id. #0001112233</p>*/}
            <p>
              {month} {date} {year} {hours}:{minutes} {meridiem}
            </p>
            {/*<p>March 10, 2023. 10:00 AM</p>*/}
          </div>
          <div className={styles.payment_wrapper}>
            {/*<div className={styles.payment_item}>*/}
            {/*  <div className={styles.payment_item_title}>Transaction Id</div>*/}
            {/*  <div className={styles.payment_item_value}>*/}
            {/*    {data?.transaction_id}*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className={styles.payment_item}>
              <div className={styles.payment_item_title}>Order Id</div>
              <div className={styles.payment_item_value}>{data?.order_key}</div>
            </div>
            <div className={styles.payment_item}>
              <div className={styles.payment_item_title}>Total Amount</div>
              <div className={styles.payment_item_value}>
                ৳ {data?.total_price}
              </div>
            </div>
            <div className={styles.payment_item}>
              <div className={styles.payment_item_title}>Payment Method</div>
              <div className={styles.payment_item_value}>
                {data?.payment_method}
              </div>
            </div>
          </div>
          <div className={styles.button_wrapper}>
            <SeeAllButton text="Back to shopping" link="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

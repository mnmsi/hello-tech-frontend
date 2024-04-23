"use client";
import React from "react";
import style from "@/styles/components/mobile/floatingFooter.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";

const FloatingFooter = () => {
  const token = getCookie("token");
  const pathname = usePathname();
  return (
    <div className={style.footer_wrapper}>
      <div className="container">
        <div className={style.footer_inner}>
          <Link
            href="/pre-order"
            className={`${style.footer_item} ${
              pathname === "/pre-order" ? style.active : ""
            }`}
          >
            <div className={style.footer_icon}>
              <img src="/icons/floating-bar/pre-order.svg" alt="icon" />
            </div>
            <div className={style.footer_text}>
              <p>Pre-Order</p>
            </div>
          </Link>
          <Link
            href="/new-arrivals"
            className={`${style.footer_item} ${
              pathname === "/new-arrivals" ? style.active : ""
            }`}
          >
            <div className={style.footer_icon}>
              <img src="/icons/floating-bar/trending.svg" alt="icon" />
            </div>
            <div className={style.footer_text}>
              <p>Trending</p>
            </div>
          </Link>
          <Link
            href="/"
            className={`${style.footer_item} ${
              pathname === "/" ? style.active : ""
            }`}
          >
            <div className={style.footer_icon}>
              <img src="/icons/floating-bar/home.svg" alt="icon" />
            </div>
            <div className={style.footer_text}>
              <p>Home</p>
            </div>
          </Link>
          <Link
            href={token ? "/cart" : "/guest-cart"}
            className={`${style.footer_item} ${
              (pathname === "/cart" ? style.active : "",
              pathname === "/guest-cart" ? style.active : "")
            }`}
          >
            <div className={style.footer_icon}>
              <img src="/icons/floating-bar/cart.svg" alt="icon" />
            </div>
            <div className={style.footer_text}>
              <p>Cart</p>
            </div>
          </Link>
          <Link
            href={token ? "/profile" : "/login"}
            className={`${style.footer_item} ${
              pathname === "/login"
                ? style.active
                : pathname === "/profile"
                ? style.active
                : ""
            }`}
          >
            <div className={style.footer_icon}>
              <img src="/icons/floating-bar/profile.svg" alt="icon" />
            </div>
            <div className={style.footer_text}>
              <p>Account</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FloatingFooter;

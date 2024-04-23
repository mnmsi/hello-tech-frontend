"use client";
import React, { useEffect } from "react";
import Topbar from "@/components/topbar/topbar";
import MainMenu from "@/components/mainMenu/mainMenu";
import Navbar from "@/components/navbar/navbar";
import MobileNav from "@/components/mobile/mobileNav";
import { usePathname } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";

const Header = ({ category, error }) => {
  const token = getCookie("token");
  // console.log(token);
  const pathname = usePathname();
  let path = pathname.split("/")[1];
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (path !== "products" && path !== "product") {
        localStorage.removeItem("page");
      }
    }
    if (
      typeof window !== "undefined" &&
      !token &&
      path !== "login" &&
      path !== "register"
    ) {
      setCookie("hello_tech_visited_url", pathname, {
        path: "/",
      });
    }
  });
  return (
    <header>
      <>
        <div className="desktop_nav">
          <Topbar />
          <MainMenu />
          <Navbar data={category} error={error} />
        </div>
        <div className="mobile_nav">
          <MobileNav category={category} />
        </div>
      </>
    </header>
  );
};

export default Header;

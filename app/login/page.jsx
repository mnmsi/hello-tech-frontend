"use client";
import React, { useState } from "react";
import style from "@/styles/pages/auth.module.scss";
import Login from "@/components/auth/login";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const divStyle = {
    backgroundImage: `url('/images/auth/banner.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "180px",
  };
  return (
    <div className="container mt-5">
      {/*<div className={style.login_banner} style={divStyle}>*/}
      {/*  <h1>Enjoy the full experience</h1>*/}
      {/*</div>*/}
      <div className={style.tab_wrapper}>
        <div
          className={`${style.tab}`}
          onClick={() => router.push("/register")}
        >
          Register
        </div>
        <div
          className={`${style.tab} ${style.active}`}
          onClick={() => router.push("/login")}
        >
          Sign in
        </div>
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;

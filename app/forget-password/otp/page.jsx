"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/pages/auth.module.scss";
import { useVerifyOtpMutation } from "@/redux/services/auth";
import OtpInput from "react-otp-input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Page = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [verifyOtp, { data, isLoading, isError, error }] =
    useVerifyOtpMutation();
  useEffect(() => {
    if (data) {
      toast.success("Verify otp success");
      router.push("/forget-password/reset-password");
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "hello_tech_verify_otp_user_otp",
          JSON.stringify({
            otp: otp,
            user: email,
          })
        );
      }
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, error]);

  const [inputStyle, setInputStyle] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let email = JSON.parse(
        localStorage.getItem("hello_tech_send_otp_user_info")
      );
      setEmail(email);
      if (window.innerWidth < 991) {
        setInputStyle({
          width: "40px",
          height: "40px",
          margin: "16px 5px 16px 5px",
          fontSize: "1rem",
          borderRadius: 3,
          border: "1px solid #CACACA",
        });
      } else {
        setInputStyle({
          width: "64px",
          height: "64px",
          margin: "52px 10px 32px 10px",
          fontSize: "2rem",
          borderRadius: 3,
          border: "1px solid #CACACA",
        });
      }
    }
  }, []);
  let renderOtp = <div>Loading...</div>;
  if (inputStyle !== null) {
    renderOtp = (
      <OtpInput
        containerStyle={{ justifyContent: "center" }}
        value={otp}
        inputStyle={inputStyle}
        shouldAutoFocus={true}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />
    );
  }

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    if (otp.length === 6 && otp !== "" && email !== "") {
      verifyOtp({ otp: otp, user: email });
    } else {
      toast.error("Please enter otp code");
    }
  };

  return (
    <div className="container">
      <div className={style.reset_password_wrapper}>
        <div className={style.reset_password_content_header}>
          <img src="/images/forget.svg" alt="forget" className="img-fluid" />
          <h1>Confirm Your Identity</h1>
        </div>
        <div className={style.reset_password_content_wrapper}>
          <p>
            We’ve sent you an email with the otp code to your email address{" "}
            <span>
              <strong>{email ?? null}</strong>
            </span>
          </p>
          <form onSubmit={handleSubmitOtp}>
            <div className={style.forget_password_input_wrapper}>
              {renderOtp}
              <button
                disabled={
                  isLoading || otp.length !== 6 || otp === "" || email === ""
                }
                type="submit"
                className="auth_btn"
              >
                {isLoading ? "Loading..." : "Verify"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

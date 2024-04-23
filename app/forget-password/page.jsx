"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/pages/auth.module.scss";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { useRouter } from "next/navigation";
import { useSendOtpMutation } from "@/redux/services/auth";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PhoneInput from "@/components/phoneInput/phoneInput";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [sendOtp, { data, isLoading, isError, error }] = useSendOtpMutation();
  const [user, setUser] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [isSendOtpSuccess, setIsSendOtpSuccess] = useState(false);
  useEffect(() => {
    if (data) {
      setIsSendOtpSuccess(true);
      toast.success("Send otp success");
      router.push("/forget-password/otp");
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "hello_tech_send_otp_user_info",
          JSON.stringify(user),
        );
      }
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, error]);
  const handleSendOtp = (data) => {
    if (data) {
      setUser(data.phone);
      sendOtp(data);
    } else {
      toast.error("Please enter your phone");
    }
  };
  return (
    <div className="container">
      <div className={style.reset_password_wrapper}>
        <div className={style.reset_password_content_header}>
          <img src="/images/forget.svg" alt="forget" className="img-fluid" />
          <h1>Forget Password?</h1>
        </div>
        <div className={style.reset_password_content_wrapper}>
          <p>
            Please enter your <span>email address</span> or{" "}
            <span>phone number</span> below to receive a otp, to reset your
            password
          </p>
          <form onSubmit={handleSubmit(handleSendOtp)}>
            <div className={style.forget_password_input_wrapper}>
              <label htmlFor="email">Phone Number</label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must be a number",
                  },
                  validate: (value) =>
                    value.length === 13 || "Invalid phone number",
                }}
                render={({ field: { onChange, value, ref } }) => (
                  <PhoneInput
                    value={value || ""}
                    onChange={(value) => {
                      onChange(value);
                    }}
                    ref={ref}
                    error={errors.phone?.message}
                    placeholder="Phone"
                    type="tel"
                  />
                )}
              />
              <button
                disabled={isLoading}
                style={{
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
                type="submit"
                className="auth_btn"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;

"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/pages/auth.module.scss";
import PasswordInput from "@/components/ui/PasswordInput";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
const SuccessPopup = dynamic(
  () => import("@/components/successPopup/successPopup"),
  { ssr: false },
);
import { useResetPasswordMutation } from "@/redux/services/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const NewPasswordPage = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [resetPassword, { data, isLoading, isError, error }] =
    useResetPasswordMutation();
  useEffect(() => {
    if (data) {
      setShow(true);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, error]);
  const [user, setUser] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hello_tech_send_otp_user_info" || "");
      let user = JSON?.parse(
        localStorage.getItem("hello_tech_verify_otp_user_otp"),
      );
      setUser(user);
    }
  }, []);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const passwordRef = useRef(null);
  // ******************* handle submit form  *******************
  const onsubmit = (data) => {
    let formData = new FormData();
    formData.append("password", data.password);
    formData.append("otp", user?.otp);
    formData.append("phone", user?.user);
    resetPassword(formData);
  };

  // ******************* handle success  ******************* //
  const handleHide = () => {
    setShow(false);
    router.push("/login");
    if (typeof window !== "undefined") {
      localStorage.removeItem("hello_tech_verify_otp_user_otp");
    }
  };

  return (
    <div className="container">
      <div className={style.reset_password_wrapper}>
        <div className={style.reset_password_content_header}>
          <img src="/images/forget.svg" alt="forget" className="img-fluid" />
          <h1>Create New Password</h1>
        </div>
        <div className={style.reset_password_content_wrapper}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className={style.forget_password_input_wrapper}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <PasswordInput
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Password"
                    error={errors.password?.message}
                    ref={passwordRef}
                  />
                )}
              />
              <Controller
                name="confirm_password"
                control={control}
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordRef.current.value ||
                    "The passwords do not match",
                }}
                render={({ field: { ref, onChange, value } }) => (
                  <PasswordInput
                    value={value || ""}
                    onChange={onChange}
                    ref={ref}
                    placeholder="Confirm Password"
                    error={errors.confirm_password?.message}
                  />
                )}
              />
              <button disabled={isLoading} type="submit" className="auth_btn">
                {isLoading ? "Loading..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessPopup show={show} handleClose={handleHide} />
    </div>
  );
};

export default NewPasswordPage;

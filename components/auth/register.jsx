import React, { useState, useRef, useEffect } from "react";
import PasswordInput from "@/components/ui/PasswordInput";
import InputWithIcon from "@/components/ui/InputWithIcon";
import style from "@/styles/components/auth.module.scss";
import Link from "next/link";
import SocialLogin from "@/components/socialLogin/socialLogin";
import { useSendOtpMutation, useRegisterMutation } from "@/redux/services/auth";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/checkAuth";
import { useDispatch } from "react-redux";
import PhoneInput from "@/components/phoneInput/phoneInput";
const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [sendOtp, { data, isLoading, isError, error }] = useSendOtpMutation();
  const redirectUrl = getCookie("hello_tech_visited_url");
  const [
    register,
    {
      data: registerData,
      isLoading: registerLoading,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();
  const passwordRef = useRef(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  // ******************* handle submit form  *******************
  const [user, setUser] = useState("");
  const [isSendOtpSuccess, setIsSendOtpSuccess] = useState(false);
  useEffect(() => {
    if (data) {
      setIsSendOtpSuccess(true);
      toast.success("Send otp success");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, error]);
  useEffect(() => {
    if (registerData) {
      toast.success("Register success");
      setCookie("token", registerData.token, {
        path: "/", // This is mandatory
        maxAge: 60 * 60 * 24 * 30,
      });
      dispatch(fetchUser());
      if (redirectUrl) {
        if (redirectUrl === "/login" || "/forget-password/reset-password") {
          router.push(`/`);
        }
        router.push(`${redirectUrl}`);
      } else {
        router.push(`/`);
      }
    }
    if (isRegisterError) {
      toast.error(registerError?.data?.message);
    }
  }, [registerData, registerError]);
  const onSubmit = (data) => {
    if (isSendOtpSuccess) {
      let formData = new FormData();
      formData.append("phone", user);
      formData.append("otp", data.otp);
      formData.append("password", data.password);
      register(formData);
    } else {
      toast.error("Please send otp first");
    }
  };
  // ******************* handle send otp  *******************
  const handleSendOtp = () => {
    // console.log(user, "user");
    if (user) {
      sendOtp({ phone: user });
    } else {
      toast.error("Please enter your phone number first");
    }
  };
  return (
    <div className={style.form_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.otp_wrapper}>
          <Controller
            name="user"
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
                  setUser(value);
                }}
                ref={ref}
                error={errors.user?.message}
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
            onClick={handleSendOtp}
            type="button"
            className={style.auth_btn}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </div>
        {isSendOtpSuccess && (
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { ref, onChange, value } }) => (
              <InputWithIcon
                value={value || ""}
                onChange={onChange}
                error={errors.otp?.message}
                ref={ref}
                icon="/icons/otp.svg"
                placeholder="OTP"
              />
            )}
          />
        )}
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

        <button
          disabled={isLoading || registerLoading}
          type="submit"
          style={{
            cursor: isLoading || registerLoading ? "not-allowed" : "pointer",
          }}
          className="auth_btn"
        >
          {registerLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className={style.auth_text_wrapper}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
      <span className="line">
        <p>
          <span>or continue with</span>
        </p>
      </span>
      {/*    auth sign in start*/}
      <SocialLogin />
      {/*    auth sign in end*/}
    </div>
  );
};

export default Register;

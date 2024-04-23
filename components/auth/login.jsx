import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PasswordInput from "@/components/ui/PasswordInput";
import InputWithIcon from "@/components/ui/InputWithIcon";
import style from "@/styles/components/auth.module.scss";
import Link from "next/link";
import SocialLogin from "@/components/socialLogin/socialLogin";
import { useLoginMutation } from "@/redux/services/auth";
import { toast } from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/checkAuth";
import { useDispatch } from "react-redux";
import PhoneInput from "@/components/phoneInput/phoneInput";

const Login = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const router = useRouter();
  const redirectUrl = getCookie("hello_tech_visited_url");
  const dispatch = useDispatch();
  const [login, { data, isLoading, isSuccess, isError }] = useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      if (data) {
        setCookie("token", data.token, {
          path: "/", // This is mandatory
          maxAge: 60 * 60 * 24 * 30,
        });
        dispatch(fetchUser());
        if (redirectUrl) {
          if (redirectUrl === "/register" || "forget-password/reset-password") {
            router.push(`/`);
          }
        } else {
          router.push(`/`);
        }
      }
    }
    if (isError) {
      setAuthFailed(true);
      toast.error("Login Failed");
    }
  }, [isSuccess, isError, data]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const onsubmit = (data) => {
    let formData = new FormData();
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    login(formData);
  };
  return (
    <div className={style.form_wrapper}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="">
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
        </div>
        <Controller
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, value, ref } }) => (
            <PasswordInput
              icon="/icons/password.svg"
              onChange={onChange}
              value={value || ""}
              error={errors.password?.message}
              ref={ref}
              placeholder="Password"
            />
          )}
          name="password"
        />
        <button disabled={isLoading} type="submit" className="auth_btn">
          Sign In
        </button>
      </form>
      {isAuthFailed && (
        <p className={`${style.auth_text_wrapper} text-danger text-sm`}>
          Invalid email or password{" "}
        </p>
      )}
      <p className={style.auth_text_wrapper}>
        Forgot password? <Link href="/forget-password">Reset Now.</Link>
      </p>
      <span className="line">
        <p>
          <span>or continue with</span>
        </p>
      </span>
      <SocialLogin />
    </div>
  );
};

export default Login;

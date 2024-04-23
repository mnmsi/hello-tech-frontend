import React, { forwardRef, useState } from "react";
import style from "@/styles/components/passwordInput.module.scss";
import { Form } from "react-bootstrap";
const PasswordInput = forwardRef((props, ref) => {
  const { label, error, ...rest } = props;
  const [isShowPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!isShowPassword);
  };
  return (
    <div className={style.password_input_wrapper}>
      {label && <label>{label}</label>}
      <div className={style.email_wrapper}>
        <img src="/icons/lock.svg" alt="" />
      </div>
      <input type={isShowPassword ? "text" : "password"} ref={ref} {...rest} />
      <div className={style.icon} onClick={handlePassword}>
        <img
          src={isShowPassword ? "/icons/eye_close.svg" : "/icons/eye_open.svg"}
          alt=""
        />
      </div>
      {error && (
        <Form.Text className="text-danger ms-3" style={{ fontSize: "12px" }}>
          {error}
        </Form.Text>
      )}
    </div>
  );
});

export default PasswordInput;

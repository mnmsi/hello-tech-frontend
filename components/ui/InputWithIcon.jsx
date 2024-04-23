import React, { forwardRef, useState } from "react";
import style from "@/styles/components/passwordInput.module.scss";
import { Form } from "react-bootstrap";
const InputWithIcon = forwardRef((props, ref) => {
  const { label, error, icon, ...rest } = props;
  const [isShowPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className={style.password_input_wrapper}>
      {label && <label>{label}</label>}
      <div className={style.email_wrapper}>
        <img src={icon} alt="icon" />
      </div>
      <input ref={ref} {...rest} />
      {error && (
        <Form.Text className="text-danger ms-3" style={{ fontSize: "12px" }}>
          {error}
        </Form.Text>
      )}
    </div>
  );
});

export default InputWithIcon;

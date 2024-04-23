import React, { forwardRef } from "react";
import style from "@/styles/components/input.module.scss";
const Input = forwardRef((props, ref) => {
  const { label, icon, error, ...rest } = props;
  return (
    <div className={style.input_wrapper}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input ref={ref} {...rest} />
      {error && <span className={style.input_error}>{error}</span>}
    </div>
  );
});
export default Input;

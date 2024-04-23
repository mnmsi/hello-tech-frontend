import Form from "react-bootstrap/Form";
import style from "@/styles/components/checkBox.module.scss";
import React, { forwardRef } from "react";

const CheckBox = forwardRef(
  (
    {
      label = "",
      isChecked,
      handleChange,
      id,
      error,
      value,
      disabled,
      defaultChecked,
    },
    ref
  ) => {
    return (
      <>
        <div className={style.checkbox_wrapper}>
          <Form.Check
            onChange={handleChange}
            type="checkbox"
            id={id}
            checked={isChecked}
            defaultChecked={defaultChecked}
            value={value}
            disabled={disabled}
            label={label}
            ref={ref}
          />
        </div>
        {error && <div className={style.input_error}>{error}</div>}
      </>
    );
  }
);
export default CheckBox;

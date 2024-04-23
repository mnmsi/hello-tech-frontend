import React, { forwardRef } from "react";
import style from "@/styles/components/textArea.module.scss";

const TextArea = forwardRef((props, ref) => {
  const { label, icon, error, ...rest } = props;
  return (
    <div className={style.textarea_wrapper}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <textarea ref={ref} {...rest} />
      {error && <span className={style.textarea_error}>{error}</span>}
    </div>
  );
});

export default TextArea;

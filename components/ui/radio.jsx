import { forwardRef } from "react";
import Form from "react-bootstrap/Form";
const Radio = forwardRef(
  (
    {
      label,
      error,
      name,
      value,
      defaultChecked,
      onChange,
      active,
      disabled,
      id,
      ...rest
    },
    ref,
  ) => (
    <div className={`radio_wrapper ${active ? "active" : ""}`}>
      <Form.Check
        type="radio"
        label={label}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        ref={ref}
        id={id}
        {...rest}
      />
      {error && <div className="error">{error}</div>}
    </div>
  ),
);
export default Radio;

import Select from "react-select";
import { forwardRef, useId } from "react";

const Select2 = forwardRef((props, ref) => {
  const { options, value, name, onChange, placeholder, error, label } = props;
  return (
    <div className="select_2_wrapper">
      {label && (
        <label className="select-label" htmlFor={name}>
          {label}
        </label>
      )}
      <Select
        instanceId={useId()}
        placeholder={placeholder}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        ref={ref}
      />
      {error && (
        <div className="text-danger mt-3" style={{ fontSize: "12px" }}>
          {error}
        </div>
      )}
    </div>
  );
});

export default Select2;

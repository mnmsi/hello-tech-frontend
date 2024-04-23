import { forwardRef, Fragment } from "react";
import Form from "react-bootstrap/Form";
const Select = forwardRef((props, ref) => {
  const { id, label, value, onChange, options, disabled, error } = props;
  let option = options.map((item, index) => {
    return (
      <Fragment key={index}>
        <option selected={props.selected} value={item.value}>
          {item.label}
        </option>
      </Fragment>
    );
  });
  return (
    <div className="select_wrapper">
      <Form.Group controlId={id}>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Select
          value={value}
          disabled={disabled}
          ref={ref}
          className="select"
          onChange={onChange}
        >
          {option}
        </Form.Select>
        {error && (
          <Form.Text className="text-danger ms-3" style={{ fontSize: "12px" }}>
            {error}
          </Form.Text>
        )}
      </Form.Group>
    </div>
  );
});

export default Select;

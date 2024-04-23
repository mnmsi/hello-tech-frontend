import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form } from "react-bootstrap";
const PhoneNumberInput = ({ onChange, value, error, icon }) => {
  return (
    <div className={`phone_input_wrapper`}>
      <img src="/icons/phone.svg" alt="phone" />
      <PhoneInput
        country={"bd"}
        disableDropdown={true}
        countryCodeEditable={false}
        value={value}
        onChange={onChange}
      />
      {error && (
        <Form.Text className="text-danger ms-3" style={{ fontSize: "12px" }}>
          {error}
        </Form.Text>
      )}
    </div>
  );
};

export default PhoneNumberInput;

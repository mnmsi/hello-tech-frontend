import React, { useState } from "react";
import styles from "@/styles/template/shipping.module.scss";
import AddAddress from "@/components/addAddress/addAddress";
import SelectAddress from "@/components/selectAddress/selectAddress";
import { useGetAddressQuery } from "@/redux/services/auth";
import Placeholder from "react-bootstrap/Placeholder";
const ShippingAddress = () => {
  const [isAddAddress, setIsAddAddress] = useState(true);
  const handleAddNewAddress = () => {
    setIsAddAddress(false);
  };
  const handleCancel = () => {
    setIsAddAddress(true);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={styles.address_wrapper}>
      <AddAddress fromCheckout handleCancel={handleCancel} />
    </div>
  );
};

export default ShippingAddress;

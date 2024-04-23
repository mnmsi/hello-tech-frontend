"use client";
import React, { useState } from "react";
import styles from "@/styles/template/address.module.scss";
import ProfileSidebar from "@/components/template/profileSidebar/profileSidebar";
import { useRouter } from "next/navigation";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  useGetAddressQuery,
  useDeleteAddressMutation,
} from "@/redux/services/auth";
import Placeholder from "react-bootstrap/Placeholder";
import { toast } from "react-hot-toast";

const Address = () => {
  const { data, isLoading } = useGetAddressQuery();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleSidebar = () => {
    setShow(!show);
  };
  const handleEditAddress = (id) => {
    router.push(`/profile/address/edit/${id}`);
  };
  const handleAddNewAddress = () => {
    router.push("/profile/address/add");
  };

  const [deleteAddress, { isLoading: deleteLoading, isSuccess }] =
    useDeleteAddressMutation();
  console.log(deleteLoading);
  const handleDeleteAddress = (id) => {
    deleteAddress(id).then((res) => {
      toast.success("Address deleted successfully");
    });
  };

  //*********************** Handle Address ***********************//
  let renderAddress;
  if (data) {
    renderAddress = data?.data?.map((item, index) => {
      return (
        <div className={styles.address_card} key={index}>
          <div className={styles.address_card_header}>
            <h3>{item.name}</h3>
            <div className={styles.action_wrapper}>
              <button
                className={styles.address_card_action_button}
                onClick={() => handleEditAddress(item.id)}
              >
                <img src="/icons/edit.svg" alt="edit" />
              </button>
              <button
                disabled={deleteLoading}
                className={styles.address_card_action_button}
                onClick={() => handleDeleteAddress(item.id)}
              >
                <img src="/icons/delete.svg" alt="delete" />
              </button>
            </div>
          </div>
          <div className={styles.address_card_body}>
            <p>
              {item.address_line} {item.city} {` ${item.division}   `}
            </p>
            <p>{item.phone}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="profile_page_wrapper">
        <div className="sidebar_content_wrapper">
          <ProfileSidebar />
        </div>
        <div className="offcanvas_button_wrapper">
          <button onClick={handleSidebar}>
            <img src="/icons/accounts.svg" alt="l" className="img-fluid" />
            <span>My Accounts</span>
          </button>
        </div>
        <div className="main_content_wrapper">
          <div className="section_wrapper">
            <div className="section_header">
              <h2>My Addresses</h2>
              <button
                className={styles.add_button}
                onClick={handleAddNewAddress}
              >
                <img src="/icons/add.svg" alt="add" />
                <span>Add Address</span>
              </button>
            </div>
            <div className="section_content">
              <div className={styles.address_card_wrapper}>
                {isLoading ? (
                  <>
                    <Placeholder animation="glow">
                      <Placeholder
                        style={{
                          height: "150px",
                          marginBottom: "20px",
                          backgroundColor: "#ddd",
                        }}
                        xs={12}
                      />
                    </Placeholder>
                    <Placeholder animation="glow">
                      <Placeholder
                        style={{
                          height: "150px",
                          marginBottom: "20px",
                          backgroundColor: "#ddd",
                        }}
                        xs={12}
                      />
                    </Placeholder>
                  </>
                ) : (
                  renderAddress
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        className="profile_sidebar"
        show={show}
        onHide={() => setShow(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Accounts</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProfileSidebar handleClose={() => setShow(false)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Address;

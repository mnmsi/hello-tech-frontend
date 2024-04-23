"use client";
import React, { useState } from "react";
import AddAddress from "@/components/addAddress/addAddress";
import ProfileSidebar from "@/components/template/profileSidebar/profileSidebar";
import Offcanvas from "react-bootstrap/Offcanvas";

const AddAddressPage = () => {
  const [show, setShow] = useState(false);
  const handleSidebar = () => {
    setShow(!show);
  };
  return (
    <div className="container">
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
            <AddAddress />
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
          <ProfileSidebar handleClose={() => setShow(true)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AddAddressPage;

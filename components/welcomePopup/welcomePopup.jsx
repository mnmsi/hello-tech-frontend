"use client";
import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import Modal from "react-bootstrap/Modal";
import { useGetSiteSettingsQuery } from "@/redux/services/auth";
import { skipToken } from "@reduxjs/toolkit/query";
import LazyImage from "@/components/ui/LazyImage";

const WelcomePopup = () => {
  const [show, setShow] = useState(true);
  const { data, isLoading } = useGetSiteSettingsQuery();
  useEffect(() => {
    if (getCookie("welcome-visits")) {
      setShow(false);
    }
  }, []);
  const handleClose = () => {
    setShow(false);
    setCookie("welcome-visits", true, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  };
  const handleImageLoad = () => {
    setShow(true);
  };
  let renderWelcomePopup = null;
  if (!isLoading && data?.welcome_popup_image) {
    renderWelcomePopup = (
      <Modal
        centered
        size="lg"
        keyboard={false}
        animation={false}
        show={show}
        className="welcome-popup"
        onHide={handleClose}
      >
        <Modal.Body>
          <div className="welcome_popup_close_icon_wrapper">
            <img
              onClick={handleClose}
              className="close-icon"
              src="/images/welcome-close.svg"
              alt="close"
            />
            <LazyImage
              className="welcome-popup-image"
              src={data?.welcome_popup_image}
              alt="welcome-popup"
              onLoad={handleImageLoad}
            />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
  return <>{renderWelcomePopup}</>;
};
export default WelcomePopup;

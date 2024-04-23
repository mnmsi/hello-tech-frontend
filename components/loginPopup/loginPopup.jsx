import React from "react";
import Modal from "react-bootstrap/Modal";
import Login from "@/components/auth/login";
import styles from "@/styles/components/addReview.module.scss";
const LoginPopup = ({ show, handleHide, handleLoginSuccess }) => {
  return (
    <div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login_modal"
        size="md"
        show={show}
        onHide={handleHide}
      >
        <Modal.Body>
          <div className="close-icon-wrapper" onClick={handleHide}>
            <img
              src="/images/close.svg"
              alt="close"
              height="35px"
              width="35px"
            />
          </div>
          <h2 className="login-title">Welcome Back!</h2>
          <Login />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPopup;

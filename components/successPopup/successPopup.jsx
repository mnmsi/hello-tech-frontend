import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "@/styles/components/addReview.module.scss";
import { useRouter } from "next/navigation";
const SuccessPopup = ({ handleClose, show }) => {
  const router = useRouter();
  return (
    <div>
      <Modal
        className="add_review_modal"
        size="xl"
        centered={true}
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>
          <div className={styles.modal_wrapper}>
            <div className={styles.modal_close_wrapper} onClick={handleClose}>
              <img
                src="/images/close.svg"
                alt="close"
                height="43px"
                width="43px"
              />
            </div>
            <div className={styles.success_popup_wrapper}>
              <div className={styles.image_wrapper}>
                <img src="/images/tick.gif" alt="tick" />
              </div>
              <div className={styles.success_content_wrapper}>
                <h2>
                  Password <br />
                  has been reset successfully
                </h2>
                <div className={styles.modal_footer}>
                  <button type="submit" onClick={() => router.push("/login")}>
                    Log in To Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SuccessPopup;

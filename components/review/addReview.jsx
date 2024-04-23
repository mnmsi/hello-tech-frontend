import React from "react";
import ReactStars from "react-rating-stars-component";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import styles from "@/styles/components/addReview.module.scss";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/textArea";
import { useAddReviewMutation } from "@/redux/services/auth";
import { toast } from "react-hot-toast";

const AddReview = ({ handleHide, show, product_id }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [addReview, { isLoading }] = useAddReviewMutation();
  const onSubmit = async (data) => {
    handleHide();
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("review", data.review);
    formData.append("rate", data.rating);
    formData.append("product_id", product_id);
    await addReview(formData)
      .unwrap()
      .then((res) => {
        if (res.success) {
          reset();
          toast.success("Review added successfully");
        }
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <div className={styles.add_review_modal}>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="add_review_modal"
        size="xl"
        show={show}
        onHide={handleHide}
      >
        <Modal.Body>
          <div className={styles.modal_wrapper}>
            <div className={styles.modal_close_wrapper} onClick={handleHide}>
              <img
                src="/images/close.svg"
                alt="close"
                height="43px"
                width="43px"
              />
            </div>
            <div className={styles.modal_content}>
              <div className={styles.modal_header}>
                <h1>Write a Review</h1>
              </div>
            </div>
            <div className={styles.modal_body}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Controller
                    control={control}
                    name="title"
                    rules={{ required: "This field is required" }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Review Title"
                        placeholder="Enter review title"
                        onChange={onChange}
                        value={value || ""}
                        error={errors.title?.message}
                      />
                    )}
                  />
                </div>
                <div className="mb-4">
                  <Controller
                    control={control}
                    name="review"
                    rules={{ required: "This field is required" }}
                    render={({ field: { onChange, value, ref } }) => (
                      <TextArea
                        ref={ref}
                        label="Review"
                        placeholder="Write your review here."
                        onChange={onChange}
                        rows={5}
                        value={value || ""}
                        error={errors.review?.message}
                      />
                    )}
                  />
                </div>
                <div className={styles.rating_wrapper}>
                  <p>Select Rating</p>
                  <Controller
                    name="rating"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <ReactStars
                        onChange={onChange}
                        value={value || 0}
                        count={5}
                        isHalf={true}
                        size={35}
                        classNames={`add_review_star`}
                        activeColor="#F25A2B"
                        emptyIcon={<BsStar />}
                        halfIcon={<BsStarHalf />}
                        filledIcon={<BsStarFill />}
                      />
                    )}
                  />
                  {errors.rating && (
                    <span className={styles.review_form_start_rating_error}>
                      Rating is required
                    </span>
                  )}
                </div>
                <div className={styles.modal_footer}>
                  <button
                    disabled={isLoading}
                    style={{
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddReview;

import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import styles from "@/styles/components/reviewList.module.scss";
import dynamic from "next/dynamic";
import { getCookie } from "cookies-next";
import {
  useGetReviewQuery,
  useGetTotalReviewQuery,
} from "@/redux/services/auth";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const AddReview = dynamic(() => import("@/components/review/addReview"), {
  ssr: false,
});
const LoginPopup = dynamic(() => import("@/components/loginPopup/loginPopup"), {
  ssr: false,
});

const ReviewList = ({ id }) => {
  const [isAuthModalShow, setAuthModalShow] = useState(false);
  const { data, loading, login } = useSelector((state) => state.checkAuth);
  useEffect(() => {
    if (login) {
      setAuthModalShow(false);
    }
  }, [data]);
  const token = getCookie("token");
  // console.log("token", token);
  const { data: review } = useGetReviewQuery(id);
  const { data: total_review } = useGetTotalReviewQuery(id);
  const [show, setShow] = useState(false);
  const addReview = () => {
    if (!token) {
      setAuthModalShow(true);
      return;
    } else if (total_review?.data?.is_reviewed) {
      toast.error("You have already reviewed this product");
      return;
    } else {
      setAuthModalShow(false);
      setShow(true);
    }
  };
  let renderTotalReview = null;
  if (total_review?.data?.total) {
    renderTotalReview = (
      <ReactStars
        value={total_review?.data?.average || 0}
        activeColor="#242424"
        edit={false}
        count={5}
        size={19}
        isHalf={true}
        halfIcon={<BsStarHalf />}
        filledIcon={<BsStarFill />}
        emptyIcon={<BsStar />}
      />
    );
  }
  let renderReview = null;
  if (review?.data?.length) {
    renderReview = review?.data.map((item, index) => {
      return (
        <div className={styles.review_list_card} key={index}>
          <h2>{item.title}</h2>
          <div className={styles.review}>
            <ReactStars
              value={item.rate || 0}
              // value={Number(review?.rate) || 4.5}
              activeColor="#242424"
              edit={false}
              count={5}
              size={14}
              isHalf={true}
              halfIcon={<BsStarHalf />}
              filledIcon={<BsStarFill />}
              emptyIcon={<BsStar />}
            />
          </div>
          <p className={styles.date}>{item.created_at}</p>
          <p className={styles.content}>{item.review}</p>
        </div>
      );
    });
  }
  console.log(total_review?.data?.is_reviewed);
  return (
    <div>
      {/*review summary start*/}
      <div className={styles.customer_reviews}>
        <div>
          <div className={styles.customer_reviews_header}>
            <img src="/images/star.svg" alt="star" className="img-fluid" />
            <span>{total_review?.data?.average}</span>
          </div>
          <div className={styles.customer_reviews_body}>
            <h1>Customer Reviews</h1>
          </div>
          <div className={styles.customer_reviews_footer}>
            {renderTotalReview}
            <p>
              ( {total_review?.data?.total ? total_review?.data?.total : 0}{" "}
              Reviews )
            </p>
          </div>
        </div>
        <div className={styles.button_wrapper}>
          {!total_review?.data?.is_reviewed ? (
            <button onClick={addReview}>Write a Review</button>
          ) : null}
        </div>
      </div>
      {/*review summary end*/}
      {/*  review list start*/}

      {renderReview}

      {/*  review list end*/}
      <AddReview
        product_id={id}
        show={show}
        handleHide={() => setShow(false)}
      />
      <LoginPopup
        handleLoginSuccess={() => setAuthModalShow(false)}
        show={isAuthModalShow}
        handleHide={() => setAuthModalShow(false)}
      />
    </div>
  );
};

export default ReviewList;

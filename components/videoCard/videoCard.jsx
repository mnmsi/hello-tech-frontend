import React, { useState } from "react";
import style from "@/styles/components/videoCard.module.scss";
import LazyImage from "@/components/ui/LazyImage";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";

const VideoCard = ({ type, title, thumbnail, url }) => {
  const [isPlaying, setPlaying] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const handleVideoURL = () => {
    setOpen(true);
  };
  const handleHide = () => {
    setOpen(false);
    setPlaying(false);
    document.body.classList.remove("modal-open");
  };
  return (
    <>
      <div className={style.video_card_wrapper} onClick={handleVideoURL}>
        <div className={style.video_card}>
          <div className={style.video_card_thumbnail}>
            <LazyImage className="img-fluid" src={thumbnail} alt={title} />
          </div>
          <div className={style.play_icon}>
            <img src="/icons/card/play.svg" alt="" />
          </div>
          <div className={style.video_card_title}>{title}</div>
        </div>
      </div>
      <Modal
        playing={isPlaying}
        show={isOpen}
        className="video_modal"
        onHide={handleHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        playsinline={true}
      >
        <Modal.Body>
          <div className={style.plyer_wrapper}>
            <ReactPlayer width="100%" height="100%" controls={true} url={url} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoCard;

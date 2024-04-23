import style from "@/styles/template/productPreview.module.scss";
import {
  FacebookShareButton,
  // PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import toast from "react-hot-toast";
import React from "react";
const handleCopyToClipBoard = () => {
  if (typeof window !== "undefined") {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied");
  }
};
const SocialShare = (url) => {
  return (
    <div>
      <div className={style.product_share}>
        <div className={style.product_share_item}>
          <FacebookShareButton url={url.url}>
            <img
              src="/icons/social/share/facebook.svg"
              alt="icons"
              height="24px"
              width="24px"
            />
          </FacebookShareButton>
        </div>
        <div className={style.product_share_item}>
          <WhatsappShareButton url={url.url}>
            <img
              src="/icons/social/share/whatsapp.svg"
              alt="icons"
              height="24px"
              width="24px"
            />
          </WhatsappShareButton>
        </div>
        <div className={style.product_share_item}>
          <TwitterShareButton url={url.url}>
            <img
              src="/icons/social/share/twitter.svg"
              alt="icons"
              height="24px"
              width="24px"
            />
          </TwitterShareButton>
        </div>
        <div className={style.product_share_item}>
          <button onClick={handleCopyToClipBoard}>
            <img
              src="/icons/copy_clipboard.svg"
              alt="icons"
              height="24px"
              width="24px"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;

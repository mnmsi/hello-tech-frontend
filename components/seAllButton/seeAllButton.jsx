import React from "react";
import style from "@/styles/components/sellAllButton.module.scss";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const SeeAllButton = ({
  text = "See all products",
  link = "",
  handleClick,
}) => {
  return (
    <div className={style.see_all_button_wrapper}>
      {link ? (
        <Link href={link}>
          {text} <FaArrowRight />
        </Link>
      ) : (
        <button onClick={handleClick}>
          {text} <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default SeeAllButton;

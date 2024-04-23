import style from "@/styles/components/brand.module.scss";
import Link from "next/link";
import LazyImage from "@/components/ui/LazyImage";
const Brand = ({ image = "", handleClick }) => {
  return (
    <div>
      <div className={style.brand_wrapper} onClick={handleClick}>
        <div>
          <LazyImage src={image} alt="brand" />
        </div>
      </div>
    </div>
  );
};

export default Brand;

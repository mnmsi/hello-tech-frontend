import style from "@/styles/components/brandFiltering.module.scss";
import LazyImage from "@/components/ui/LazyImage";

const BrandFiltering = ({
  image = "",
  active = "",
  handleClick,
  name = "",
}) => {
  return (
    <div
      className={`${style.brand_wrapper} ${active && style.active}`}
      onClick={handleClick}
    >
      <div className={style.brand_item}>
        <LazyImage src={image} alt="brand" />
      </div>
      <div className={style.brand_text}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default BrandFiltering;

import LazyImage from "@/components/ui/LazyImage";
import Placeholder from "react-bootstrap/Placeholder";

const Banner = ({ image, loading, wrapper_class, ...rest }) => {
  return (
    <>
      {loading ? (
        <Placeholder animation="glow" as="div">
          <Placeholder
            style={{
              height: "400px",
              background: "#ddd",
              width: "100%",
            }}
          />
        </Placeholder>
      ) : (
        <div className={wrapper_class}>
          <LazyImage
            className="img-fluid w-full"
            src={image}
            alt="Banner"
            {...rest}
          />
        </div>
      )}
    </>
  );
};

export default Banner;

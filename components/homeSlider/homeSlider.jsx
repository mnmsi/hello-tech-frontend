
import Placeholder from "react-bootstrap/Placeholder";
import ImageSlider from "@/components/imageSlider/imageSlider";
const HomeSlider = ({ data, loading, error }) => {
  return (
    <div className="home_slider_wrapper">
      {data?.data?.length ? (
        <ImageSlider images={data.data} />
      ) : (
        <Placeholder animation="glow" as="div">
          <Placeholder
            style={{
              height: "400px",
              background: "#ddd",
              width: "100%",
            }}
          />
        </Placeholder>
      )}
    </div>
  );
};

export default HomeSlider;

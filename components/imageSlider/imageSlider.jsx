
import {Carousel} from "react-bootstrap";
import LazyImage from "@/components/ui/LazyImage";
const ImageSlider = ({ images }) => {
    return (
        <section className="image-slider">
            <Carousel controls={false} indicators={false} interval={3000} pause={`hover`}>
                {images.map((item, index) => (
                    <Carousel.Item key={index}>
                        <LazyImage
                            className="d-block w-100 carousel-image"
                            src={item.image_url}
                            alt={`Slide ${index}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
};

export default ImageSlider;

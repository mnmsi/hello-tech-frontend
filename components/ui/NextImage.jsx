import LazyImage from "@/components/ui/LazyImage";

const NextImage = ({ height, width, src, alt }) => {
  return <LazyImage src={src} alt={alt} height={height} width={width} />;
};

export default NextImage;

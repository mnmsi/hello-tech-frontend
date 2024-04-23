import Details from "@/views/product/details";
import Seo from "@/components/seo/seo";
import { Suspense } from "react";

export const generateMetadata = async ({ params }) => {
  let slug = await params.slug;
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/product/details/${slug}`,
    { next: { revalidate: 10 } },
  );
  const data = await response.json();
  if (data?.data) {
    return {
      title: data?.data?.name,
      description: data?.data?.description,
      // keywords: data?.data?.keywords?.split(","), // array of keywords
    };
  } else {
    return {
      title: "Hello Tech",
      description: "Hello Tech",
      keywords: [], // array of keywords
    };
  }
};

async function getData(slug) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/product/details/${slug}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {}
}
const ProductDetails = async ({ params }) => {
  let slug = await params.slug;
  const data = await getData(slug);
  return (
    <div className="container">
      <Details slug={slug} />
      <Suspense fallback={<div></div>}>
        <Seo
          title={data?.data?.name}
          image={data?.data?.image_url}
          url={process.env.NEXT_PUBLIC_APP_URL + `/product/${slug}`}
        />
      </Suspense>
    </div>
  );
};
export default ProductDetails;

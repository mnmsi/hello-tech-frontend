"use server";

import Head from "next/head";

const Seo = async ({ title, image, description, url }) => {
  let html = description;
  if (description?.length > 160) {
    html = description.slice(0, 160) + "...";
    html = html.replace(/(<([^>]+)>)/gi, "");
  }
  return (
    <>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={html} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};
export default Seo;

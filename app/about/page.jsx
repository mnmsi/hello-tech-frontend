import style from "../../styles/pages/content.module.scss";
async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/about", {
    cache: "no-store",
  });
  return res.json();
}
export default async function page() {
  const data = await getData();
  return (
    <div className="container">
      <h1 className="mb-4">About Us</h1>
      <div
        className={style.static_content}
        dangerouslySetInnerHTML={{ __html: data?.data?.content ?? "" }}
      />
    </div>
  );
}

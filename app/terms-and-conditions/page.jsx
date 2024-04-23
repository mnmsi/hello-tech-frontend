import style from "../../styles/pages/content.module.scss";

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/terms", {
    cache: "no-cache",
  });
  if (res.status !== 200) {
    return { data: {} };
  }
  return res.json();
}

export default async function page() {
  const data = await getData();
  return (
    <div className="container">
      <h1 className="mb-4">Terms and Conditions</h1>
      <div
        className={style.static_content}
        dangerouslySetInnerHTML={{ __html: data?.data?.terms_conditions ?? "" }}
      />
    </div>
  );
}

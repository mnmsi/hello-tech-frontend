import React, { useState } from "react";
import style from "@/styles/template/productDescription.module.scss";
import LazyImage from "@/components/ui/LazyImage";
import ReactPlayer from "react-player";
import ReviewList from "@/components/review/reviewList";

const ProductDescription = ({ data }) => {
  let section = [
    {
      id: 1,
      name: "Description",
    },
    // {
    //   id: 2,
    //   name: "Specification",
    // },
    {
      id: 3,
      name: "Video",
    },
    {
      id: 4,
      name: "Review",
    },
  ];
  let renderSpecification = null;
  if (data?.specifications.length) {
    renderSpecification = data?.specifications.map((item, index) => {
      return (
        <tr key={index}>
          <td className={style.key}>
            <span>&#x2022;</span>
            {item.title}
          </td>
          <td className={style.value}>{item.value}</td>
        </tr>
      );
    });
  }
  const Description = () => {
    return (
      <div className={style.description}>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></div>
      </div>
    );
  };
  const Specification = () => {
    return (
      <div className={style.specification}>
        <LazyImage
          src={data?.banner?.image_url}
          alt="spacification"
          className="img-fluid"
        />
        <div className={style.specification_table}>
          <table className="table table-bordered">
            <tbody>{renderSpecification}</tbody>
          </table>
        </div>
      </div>
    );
  };
  const Video = () => {
    return data?.video_url ? (
      <div className={style.video}>
        <ReactPlayer
          url={data?.video_url}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
    ) : (
      <p>No Video Found</p>
    );
  };
  const Review = () => {
    return (
      <div className={style.review}>
        <ReviewList id={data?.id} />
      </div>
    );
  };
  const [active, setActive] = useState(1);
  const [content, setContent] = useState(<Description />);
  const handleClick = (id) => {
    setActive(id);
    switch (id) {
      case 1:
        setContent(<Description />);
        break;
      case 2:
        // setContent(<Specification />);
        break;
      case 3:
        setContent(<Video />);
        break;
      case 4:
        setContent(<Review />);
        break;
      default:
        break;
    }
  };
  return (
    <div className={style.description_wrapper}>
      <div className={style.tab_wrapper}>
        <div className={style.tab}>
          {section.map((item) => {
            return (
              <div
                key={item.id}
                className={`${style.tab_item} ${
                  active === item.id ? style.active : ""
                }`}
                onClick={() => handleClick(item.id)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default ProductDescription;

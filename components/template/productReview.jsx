import React, { useRef } from 'react';
import { useGetVideoReviewsQuery } from '@/redux/services/videoReviews';
import style from '@/styles/template/productReview.module.scss';
import SectionTitle from '@/components/sectionTitle/sectionTitle';
import dynamic from 'next/dynamic';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SeeAllButton from '@/components/seAllButton/seeAllButton';
import Skeleton from '@/components/Skeleton/skeleton';
const VideoCard = dynamic(() => import('@/components/videoCard/videoCard'), {
  ssr: false,
});
const ProductReview = (props) => {
  const { data, isLoading } = useGetVideoReviewsQuery();
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          draggable: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  };
  let renderVideoCard = <Skeleton count={4} />;
  if (!isLoading && data) {
    renderVideoCard = data.data.map((item, index) => {
      return (
        <VideoCard
          type='youtube'
          url={item.url}
          title={item.title}
          key={index}
          thumbnail={item.thumbnail}
        />
      );
    });
  }
  const sliderRef = useRef();
  return (
    <div>
      <div className={style.product_review_header}>
        <SectionTitle title='Product Reviews' />
        <div className={style.arrow_wrapper}>
          <div onClick={() => sliderRef.current.slickPrev()}>
            <img
              src='/icons/circle-empty.svg'
              alt='arrow'
              height='48px'
              width='48px'
            />
          </div>
          <div onClick={() => sliderRef.current.slickNext()}>
            <img
              src='/icons/circle-full.svg'
              alt='arrow'
              height='48px'
              width='48px'
            />
          </div>
        </div>
      </div>
      <div className='slider_wrapper'>
        {data ? (
          <Slider {...settings} ref={sliderRef}>
            {renderVideoCard}
          </Slider>
        ) : (
          <Skeleton count={4} />
        )}
      </div>
    </div>
  );
};

export default ProductReview;

import React from "react";
import images from "../Components/Images";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Card_home = () => {
  const responsive = {
    web: {
      breakpoint: { max: 2560, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 405 },
      items: 1,
    },
    mobile_mini: {
      breakpoint: { max: 405, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        arrows={false}
        showThumbs={false}
      >
        <div className="h-full w-full">
          <img
            src={images.carousel_img_1}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-full w-full">
          <img
            src={images.carousel_img_2}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-full w-full">
          <img
            src={images.carousel_img_3}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Card_home;

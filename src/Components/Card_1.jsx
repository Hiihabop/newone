import React from "react";
import images from "../Components/Images";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "../Components/Button";
import { Link } from "react-router-dom";

const Card_1 = () => {
  const responsive = {
    web: {
      breakpoint: { max: 2560, min: 768 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 405 },
      items: 4,
    },
    mobile_mini: {
      breakpoint: { max: 405, min: 0 },
      items: 4,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      showDots={false}
      arrows={false}
    >
      {[
        { src: images.Card_1, name: "Nuts" },
        { src: images.Card_2, name: "Almonds" },
        { src: images.Card_3, name: "Raisins" },
        { src: images.Card_4, name: "Anjeer" },
      ].map((item, index) => (
        <div key={index} className="px-2">
          <Link to="/allproducts" className="block">
            <div className="w-full h-20 flex items-center justify-center bg-white rounded-md overflow-hidden">
              <img
                src={item.src}
                alt={item.name}
                className="max-h-full object-contain"
              />
            </div>
            <div className="w-full mt-2">
              <Button Name={item.name} />
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default Card_1;

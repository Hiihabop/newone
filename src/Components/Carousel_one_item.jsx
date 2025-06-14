import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carousel_one_item = (props) => {
  return (
    <div>
      <Carousel infinite={true} showDots={false}>
        <div className="flex justify-center h-full w-[70%] mx-auto">
          <img src={props.IMG} alt="" className="w-full h-auto object-cover" />
        </div>
        <div className="flex justify-center h-full w-[70%] mx-auto">
          <img
            src={props.IMG_2}
            alt=""
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex justify-center h-full w-[70%] mx-auto">
          <img
            src={props.IMG_3}
            alt=""
            className="w-full h-auto object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Carousel_one_item;

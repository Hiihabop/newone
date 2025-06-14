import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
  
  return (
    <Link
      to={`/Single_item/${props.index}`}
      onClick={props.onclick}
      className="border rounded-md p-3 w-full max-w-sm shadow hover:shadow-lg transition duration-200"
    >
      <img
        src={props.imageSrc}
        alt={props.title}
        className="w-38 object-contain mb-2"
      />
      <h2 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
        {props.title}
      </h2>

      <div className="flex justify-between items-center gap-2 text-sm">
        <div className="flex items-center">
          <span className="text-lg font-bold text-black mr-3">
            ₹{props.offerPrice}
          </span>
          <span className="line-through text-gray-400">
            ₹{props.originalPrice}
          </span>
        </div>
        <div className="text-green-600 text-sm font-semibold">
          {props.discount}% Off
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1 text-sm">
        <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold flex items-center">
          {props.rating}
          <IoStar className="ml-1" />
        </span>
        <span className="text-gray-600 font-semibold">
          {props.ratingCount} Ratings
        </span>
      </div>

      <div className="text-green-600 text-sm font-medium mt-1">
        Free Delivery in Two Days
      </div>
    </Link>
  );
};

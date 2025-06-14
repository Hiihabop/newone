import React from "react";
import { IoStar } from "react-icons/io5";
import { Button } from "../../Components/Button";
import { FaTrashAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa6";

const ProductCard_admin = (props) => {
  return (
    <div className="group relative">
      <div className="border border-gray-200 rounded-xl p-4 w-full max-w-xs bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group-hover:border-indigo-100">
        {/* Product Image with Hover Effect */}
        <div className="relative overflow-hidden rounded-lg aspect-square mb-3 bg-gray-50">
          <img
            src={props.imageSrc}
            alt={props.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {/* Discount Badge */}
          {props.discountPercent && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              {props.discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Product Title */}
        <h2 className="text-base font-semibold text-gray-800 leading-tight line-clamp-2 min-h-[2.5rem]">
          {props.title}
        </h2>

        {/* Price Section */}
        <div className="mt-3 flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                ₹{props.offerPrice}
              </span>
              <span className="text-sm line-through text-gray-400">
                ₹{props.originalPrice}
              </span>
            </div>
            {props.discount && (
              <div className="text-xs text-indigo-600 font-medium">
                {props.discount}
              </div>
            )}
          </div>
        </div>

        {/* Rating Section */}
        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
            <IoStar className="mr-1 text-yellow-400" />
            {props.rating}
          </span>
          <span className="text-xs text-gray-500">
            ({props.ratingCount} ratings)
          </span>
        </div>

        {/* Delivery Info */}
        <div className="mt-2 flex items-center text-xs text-green-600 font-medium">
          <FaTruck className="mr-1" />
          Free delivery in 2 days
        </div>

        {/* Delete Button with Smooth Transition */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={props.Delete_d}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
          >
            <FaTrashAlt className="text-sm" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard_admin;

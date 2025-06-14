import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../Components/Button";
import Carousel_one_item from "../Components/Carousel_one_item";
import RatingStats from "../Components/RatingStats";
import { getAll, getone } from "../Axios/axios";
import { BiLike } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { IoPlayForward, IoStar } from "react-icons/io5";
import Header from "../Components/Header";
import Single_item_One from "../Components/Single_item_One";
import { ProductCard } from "../Components/ProductCard";
import { FaCartShopping } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Single_item = () => {
  const { index } = useParams();
  const ind = index;

  const navigate = useNavigate();
  const [Getoneitem, setGetoneitem] = useState([]);

  const [Alldried_fruit, setAlldried_fruit] = useState([]);

  useEffect(() => {
    data();
  }, []);

  const data = () => {
    getone(setGetoneitem, ind);
  };

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    getAll(setAlldried_fruit);
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(
      (item) => item.name === Getoneitem.name
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase its Qty
      cart[existingItemIndex].Qty = String(
        Number(cart[existingItemIndex].Qty) + 1
      );
    } else {
      // If item doesn't exist, add it with Qty = 1
      const itemToAdd = { ...Getoneitem, Qty: "1", id: ind };
      cart.push(itemToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success('Item added to cart!');
  };

  const onclickrefresh = (index) => {
    navigate(`/Single_item/${index}`);
    window.scrollTo(0, 0);
    data();
  };

  return (
    <div className="">
      <Header />
      <ToastContainer />
      <div className="h-full p-[16px] pt-0 relative ">
        <div>
          <Carousel_one_item
            IMG={Getoneitem.img1}
            IMG_2={Getoneitem.img2}
            IMG_3={Getoneitem.img3}
          />
        </div>
        <div className="flex">
          <div className="">
            <p className="font-medium line-clamp-2">{Getoneitem.name}</p>
          </div>
          <div className="flex items-center ml-2">
            <div className="flex flex-col items-center mr-3">
              <BiLike className="text-[#8b8ba3] text-xl" />
              <p className="text-sm">Wishlist</p>
            </div>
            <div className="flex flex-col items-center">
              <IoMdShare className="text-[#8b8ba3] text-xl" />
              <p className="text-sm">Share</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-2">
            ₹{Getoneitem.selling_price}.00
          </h1>
          <h1 className="text-[#8b8ba3] line-through mr-2">
            ₹{Getoneitem.mrp}.00
          </h1>
          <div className="text-green-600 text-sm font-semibold">
            {Math.round(
              ((Getoneitem.mrp - Getoneitem.selling_price) / Getoneitem.mrp) *
                100
            )}
            % Off
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm">
          <span className="bg-green-600 text-white px-2 rounded-full py-0.5  text-sm font-semibold flex items-center">
            {(Math.random() * 1 + 4).toFixed(1)}
            <IoStar className="ml-1" />
          </span>
          <span className="text-gray-600 font-semibold">
            {Getoneitem.ratingCount} Ratings
          </span>
        </div>
        <p className="text-sm font-semibold mt-2">Free Delivery</p>
        {/* <RatingStats ratingCount={Getoneitem.ratingCount} /> */}
        <div
          className=" space-y-2 text-sm text-gray-800 "
          dangerouslySetInnerHTML={{ __html: Getoneitem.features }}
        ></div>
        <div className="">
          {Getoneitem.comments &&
            Getoneitem.comments.map((comment, index) => (
              <div key={index} className="ml-5 mb-5">
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold flex items-center">
                    {Getoneitem.rating}
                    <IoStar className="ml-1" />
                  </span>
                  <span className="text-gray-600 font-semibold">Very Good</span>
                </div>
                <p className="font-medium text-sm mt-1">{comment.body}</p>
                {/* <div className="flex items-center mt-1">
                  <GoCheckCircleFill className="text-sm text-[#8b8ba3]" />
                  <p className="text-[#8b8ba3] text-sm mb-0.5 ml-2">
                    Certified Buyer,Kozhikode {total} Days ago
                  </p>
                </div> */}
              </div>
            ))}
        </div>
        <div className="mt-5 grid grid-cols-2 max-[350px]:grid-cols-1 gap-1">
          {Alldried_fruit.map((e, index) => {
            return (
              <ProductCard
                key={index}
                onclick={() => onclickrefresh(e.id)}
                index={e.id}
                imageSrc={e.img1}
                discountPercent={e.discountPercent}
                title={e.name}
                discount={Math.round(((e.mrp - e.selling_price) / e.mrp) * 100)}
                originalPrice={e.mrp}
                offerPrice={e.selling_price}
                rating={(Math.random() * 4 + 1).toFixed(1)}
                ratingCount={e.ratingCount}
              />
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-16 ">
        <Single_item_One
          B_text_1={
            <div className="flex justify-center items-center py-2.5 text-md">
              <FaCartShopping className="mr-2" /> <p>Add to Cart</p>
            </div>
          }
          onClick={addToCart}
          B_text_2={
            <div className="flex justify-center items-center py-2.5 text-md">
              <IoPlayForward className="mr-2" /> <p>Buy Now</p>
            </div>
          }
          link={`/payment/${ind}`}
        />
      </div>
    </div>
  );
};

export default Single_item;

import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../Axios/axios";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const opneaddtocatd = () => {
    getitems();
    setIsRightSidebarOpen(true);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeAll = () => {
    setIsSidebarOpen(false);
    setIsRightSidebarOpen(false);
  };

  const [itemsget, setitemsget] = useState([]);

  useEffect(() => {
    getitems();
  }, []);

  const updateQty = (id, type) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        let newQty = parseInt(item.Qty || 1);
        if (type === "increment") newQty++;
        if (type === "decrement" && newQty > 1) newQty--;
        return { ...item, Qty: newQty };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    getitems(); // refresh list
  };

  const getitems = () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    setitemsget(items);
  };

  const deleteCartItemById = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cartData.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    getitems();
  };

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartTotal(calculateTotal());
  }, [itemsget]);

  const calculateTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach((item) => {
      total += item.selling_price * (parseInt(item.Qty) || 1);
    });
    return total.toFixed(2);
  };

  return (
    <div>
      <header className="p-[16px] flex justify-between">
        <div className="flex items-center">
          <IoMdMenu className="text-2xl mr-5" onClick={toggleSidebar} />
          <Link to={"/"} className="text-2xl font-extrabold">
            D-Shop
          </Link>
        </div>
        <div className="flex items-center">
          {/* <IoSearchSharp className="text-2xl mr-5" /> */}
          <TiShoppingCart
            className="text-2xl"
            onClick={() => opneaddtocatd()}
          />
        </div>
      </header>

      {/* right side */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-lg transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "w-[60%] translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-between">
          <h1 className="text-2xl font-extrabold">D-Shop</h1>
          <button
            className="text-xl font-bold cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          <ul className="space-y-4">
            <li className="font-semibold">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="font-semibold">
              <Link to={"/allproducts"}>All Products</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* lefter side */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
          isRightSidebarOpen ? "w-[90%] translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            className="text-xl font-bold cursor-pointer"
            onClick={() => setIsRightSidebarOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Cart content */}
        <div className="flex flex-col h-[90%] justify-between p-4">
          <div className=" overflow-auto snap-y">
            {Array.isArray(itemsget) &&
              itemsget.map((e, index) => {
                return (
                  <div key={index} className="flex my-3">
                    <div>
                      <img className="w-20" src={e.img1} alt="" />
                    </div>
                    <div className="flex flex-col justify-center w-[67%] max-[372px]:w-[60%]">
                      <div className="flex justify-between ml-5 items-center gap-4">
                        <div className="w-[80%]">
                          <p className="truncate text-sm">{e.name}</p>
                          <span className="">₹ {e.selling_price}</span>{" "}
                          <span className="ml-1 text-xs line-through">
                            ₹ {e.mrp}
                          </span>
                        </div>
                        <button
                          className="text-[#82858f] text-lg"
                          onClick={() => deleteCartItemById(e.id)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                      <div className="flex justify-between ml-5 gap-4 w-[100%]  ">
                        <p className="text-sm">Size: {e.size || 0} </p>
                        <div className="flex items-center border rounded-full bg-gray-100 overflow-hidden w-24">
                          <button
                            className="px-2 text-black"
                            onClick={() => updateQty(e.id, "decrement")}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={String(e.Qty).padStart(2, "0")}
                            readOnly
                            className="text-center w-full bg-transparent"
                          />
                          <button
                            className="px-2 text-black"
                            onClick={() => updateQty(e.id, "increment")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className=""></div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="bg-white">
            <div className="flex justify-between font-medium text-sm mt-2">
              <span>Cart totle : </span>
              <span>₹ {cartTotal}</span>
            </div>
            <div className="flex justify-between font-medium text-sm mt-2 border-dotted border-b-2 pb-2 border-black ">
              <span>Shipping : </span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-medium text-sm mt-2 border-dotted border-b-2 pb-2 border-black ">
              <span>To Pay : </span>
              <span>₹ {cartTotal}</span>
            </div>
            <div className="flex justify-between mt-5">
              <div className="flex flex-col items-center">
                <p className="font-medium">₹ {cartTotal}</p>
                <p className="text-xs font-medium">Inclusive of all taxes</p>
              </div>
              <Link
                to="/addtocard"
                className="w-[50%] bg-[#273b53] text-white py-2 rounded-md hover:bg-[#172a42] transition text-center"
              >
                Confirm Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {(isSidebarOpen || isRightSidebarOpen) && (
        <div
          onClick={closeAll}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}
    </div>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const Single_item_One = (props) => {
  return (
    <div className="fixed max-w-[500px] mx-auto flex justify-between items-center bg-white border-t w-full pr-0 py-2.5">
      <div className="w-1/2 text-center">
        <button
          type="button"
          onClick={props.onClick}
          className="border border-[#273b53] w-[90%] rounded-lg text-sm font-semibold"
        >
          {props.B_text_1}
        </button>
      </div>
      <div className="w-1/2 flex justify-center">
        <Link
          to={props.link}
          className="bg-[#273b53] text-white w-[90%] rounded-lg text-sm font-semibold flex justify-center"
        >
          {props.B_text_2}
        </Link>
      </div>
    </div>
  );
};

export default Single_item_One;

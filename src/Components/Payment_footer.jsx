import React from "react";

const Payment_footer = (props) => {
  return (
    <div className="flex bg-white justify-between items-center border-t pt-2">
      <div className="w-1/2 text-left">
        <p className="font-semibold">₹{props.res}</p>
        <p className="font-semibold text-sm">VIEW PRICE DETAILS</p>
      </div>
      <div className="w-1/2 text-center">
        <button
          disabled={props.disabled} 
          onClick={props.onClick}
          className="bg-[#273b53] w-[90%] py-3 text-white rounded-lg text-sm"
        >{props.B_text}
        </button>
      </div>
    </div>
  );
};

export default Payment_footer;

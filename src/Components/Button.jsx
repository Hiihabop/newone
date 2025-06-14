import React from "react";

export const Button = (props) => {
  return (
    <div>
      <button onClick={props.onclick} className="w-full text-sm max-[414px]:text-[12px] block bg-[linear-gradient(45deg,_rgba(166,_109,_48,1),_rgba(255,_229,_142,1)_50%,_rgba(224,_176,_87,1)_100%)] text-center px-2 py-1 rounded-md font-semibold">
        {props.Name}
      </button>
    </div>
  );
};

export const Input = (props) => {
  return (
    <div className="relative w-full mt-4">
      <input
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        className={`peer w-full border ${props.error ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500`}
        placeholder=""
      />
      <label className="absolute left-3 -top-3 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1">
        {props.label || "Label"}
      </label>
      {props.error && <p className="text-red-500 text-xs mt-1">{props.error}</p>}
    </div>
  );
};


export const Button2 = (porps) => {
  return (
    <button className="bg-[#273b53] w-[90%] py-2 text-white rounded-lg text-sm">
      {porps.B_text}
    </button>
  );
};

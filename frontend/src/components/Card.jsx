import React from "react";
import book from "../assets/img1.jfif";

const Card = ({data}) => {
  return (
    <div className=" my-3 w-full sm:max-w-md  sm:shadow-md p-2 flex flex-col items-center  gap-2">
      <h3 className="text-xl font-semibold text-center">{data.bk_name}</h3>
      <div className="flex w-full">
        <img
          src={book}
          alt=""
          className="object-cover w-full h-[300px]"
          srcset=""
        />
      </div>
      <p className="text-justify text-sm text-gray-500">
       {data.author}
      </p>
      <h2 className="font-semibold">
        stocks left <span className="text-red-600">{data.stocks}</span>
      </h2>
      <button className="px-5 py-2 rounded-sm text-white font-semibold bg-slate-700">
        Lend now
      </button>
    </div>
  );
};

export default Card;

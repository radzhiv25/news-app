import React from "react";

const Navbar = () => {
  return (
    <div className="md:w-3/4 md:mx-auto mx-5 my-5 py-2 px-3 border border-dashed rounded-md ">
      <div className="flex items-center gap-2">
        <div className="md:size-10 size-8 rounded-full bg-gradient-to-br from-gray-300 to-black animate-gradient"></div>
        <div className="">
          <h1 className="bg-gradient-to-br from-gray-300 via-black bg-clip-text text-transparent md:text-2xl text-xl font-semibold leading-none">
            Aconews
          </h1>
          <p className="text-xs leading-none">news at one place</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

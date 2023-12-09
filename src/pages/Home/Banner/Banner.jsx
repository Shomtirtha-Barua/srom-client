import React from "react";

const Banner = () => {
  return (
    <>
      <div className="banner pt-12">
        <div className="title   rounded-lg mx-auto text-center w-6/12">
          <h1 className="text-8xl text-rose-500 font-semibold">SROM</h1>
          <p className="text-4xl font-light text-lime-500">
            Buy and Sell Service
          </p>
          <p className="font-normal text-slate-400 mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto culpa quidem architecto amet quod sint tempore minus porro adipisci? Nostrum ipsam incidunt sint atque mollitia magni laudantium exercitationem repudiandae adipisci.</p>
          {/* 
          <div className="flex items-center mt-10  p-6 space-x-6 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
            <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
              <span>All categories</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="bg-gray-100 outline-none"
                type="text"
                placeholder="Article name or keyword..."
              />
            </div>
            <div className="bg-sky-500 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
              <span>Search</span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Banner;

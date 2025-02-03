import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="flex flex-col items-center space-y-8 px-4">
            {[1, 2].map((item) => (
              <div key={item} className="w-full max-w-md text-center">
                <img
                  src="laptop.jpg"
                  alt="Laptop and notes"
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
                <h1 className="text-black py-4 text-2xl font-semibold">
                  Going all-in With millennial design
                </h1>
                <p className="text-base text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  sunt doloribus architecto ducimus totam, cum quaerat praesentium
                  quo, excepturi in necessitatibus, at ex tempore hic laborum ab
                  quam blanditiis eligendi.
                </p>
              </div>
            ))}
          </div>

         
          <div></div>

          
          <div className="flex flex-col items-start px-4">
            <input
              className="rounded border border-gray-300 px-3 py-2 mb-4 w-full max-w-xs"
              type="text"
              placeholder="Search..."
            />
            <div className="w-full max-w-xs">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Categories
              </h3>
              <ul className="space-y-2">
                {[{ name: "Crafts", count: 3 }, { name: "Design", count: 5 }, { name: "Handmade", count: 7 }, { name: "Knitting", count: 4 }, { name: "Wood", count: 8 }].map((category, index) => (
                  <li key={index} className="flex justify-between text-gray-600 w-full">
                    <span>{category.name}</span>
                    <span>{category.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

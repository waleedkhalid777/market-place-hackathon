"use client";
import React, { useState } from "react";

const All = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Add image URLs to the slides array
  const slides = [
    { imageUrl: "/sli.png" },
    { imageUrl: "/sli2.png" },
    { imageUrl: "/sli3.png" },
    { imageUrl: "/sli.png" },
    { imageUrl: "/sli2.png" },
  ];

  
  const scroll = (direction: number) => {
    const newIndex = activeIndex + direction;
    if (newIndex >= 0 && newIndex < slides.length) {
      setActiveIndex(newIndex);
      setScrollPosition(newIndex * -100);
    }
  };

  
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setScrollPosition(index * -100);
  };

  return (
    <div className="relative bg-orange-50 py-12 md:py-20">
      <div className="mx-6 sm:mx-12 md:mx-16 flex flex-col md:flex-row items-center justify-between">
      
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-poppins font-bold">
            50+ beautiful Rooms <br /> inspiration
          </h1>
          <p className="text-gray-800 pt-4 sm:pt-6 md:pt-8">
            Our designers have already created a lot of beautiful <br /> prototypes of rooms to inspire you.
          </p>
        </div>

      
        <div className="flex-1 w-full overflow-hidden">
          <div className="mt-8 sm:mt-12 md:mt-16">
            <div className="flex items-center justify-center">
              <div className="relative w-full overflow-hidden">
                <div
                  className="flex space-x-4 transition-transform duration-300"
                  style={{ transform: `translateX(${scrollPosition}px)` }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-48 md:w-56 lg:w-64 h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden shadow-md"
                    >
                      <img
                        src={slide.imageUrl}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="flex justify-between mt-4 md:mt-6">
              <button
                onClick={() => scroll(-1)} // Scroll left
                aria-label="Scroll Left"
                role="button"
                className="text-gray-700 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                &#8592;
              </button>
              <button
                onClick={() => scroll(1)} 
                aria-label="Scroll Right"
                role="button"
                className="text-gray-700 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                disabled={activeIndex === slides.length - 1}
              >
                &#8594;
              </button>
            </div>

            
            <div className="flex justify-center space-x-2 mt-4 md:mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? "bg-black" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>

            
            <div className="flex justify-center mt-6">
              <button className="bg-red-500 text-white px-6 py-3 hover:bg-red-600 transition-colors">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default All;

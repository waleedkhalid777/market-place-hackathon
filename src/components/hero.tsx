"use client"
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero bg.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority={true} 
          className="z-0"
        />
        

        <div className="flex items-center justify-center sm:justify-end w-[90%] sm:w-[75%] md:w-[620px] h-auto max-w-lg absolute bottom-1/4 sm:right-8 left-1/2 transform sm:-translate-x-0 -translate-x-1/2 bg-[rgb(255,243,227)] rounded-lg p-6 mt-6">
            <div>
              <h2 className="text-xl font-poppins text-gray-700 mx-2">New Arrival</h2>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-poppins text-red-600 mt-2 mx-2 space-y-3">
                Discover Our <br />New Collection
              </h1>
              <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec <br />ullamcorper mattis.
              </p>
              <button className="mt-6 px-6 py-3 mx-2 bg-red-600 text-white hover:bg-blue-700 transition duration-200">
                Buy Now
              </button>
            </div>
          </div>
      </div>

      
      
    </div>
  );
};

export default HeroSection;

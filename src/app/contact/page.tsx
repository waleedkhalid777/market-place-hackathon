// pages/contact.tsx
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

const Contact: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/shop.jpg" 
            alt="Shop Hero Background"
            layout="fill"
            objectFit="cover"
            priority
            className="z-0 blur-[3px]" 
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-black">Contact</h1>
          <div className="flex justify-center mt-2">
            <h2 className="text-xl font-bold text-black">Home</h2>
            <MdKeyboardArrowRight className="text-2xl text-black mx-2" />
            <h2 className="text-xl font-bold text-black">contact</h2>
          </div>
        </div>
      </div>

      
      <div className="font-sans p-5">
        <h1 className="text-2xl text-center mb-1">Get In Touch With Us</h1>
        <p className="text-red-500 text-center mb-5">
          For more information about our product & services, please feel free
          to drop us an email. Our staff will always be there to help you out.
          Do not hesitate!
        </p>

        <div className="flex flex-wrap justify-between mt-5">
          
          <div className="w-full md:w-2/5 leading-7 text-sm text-gray-800">
            <div className="mb-4">
              <strong className="block mb-1">Address</strong>
              328 5th SE Avenue, New York NY10000, United States
            </div>

            <div className="mb-4">
              <strong className="block mb-1">Phone</strong>
              Mobile: (+84) 546-6789<br />
              Hotline: (+84) 456-6789
            </div>

            <div>
              <strong className="block mb-1">Working Time</strong>
              Monday-Friday: 9:00 - 22:00<br />
              Saturday-Sunday: 9:00 - 21:00
            </div>
          </div>

        
          <div className="w-full md:w-1/2 p-5 border border-gray-300 rounded bg-white">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-1 font-bold"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Abc"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-1 font-bold"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Abc@def.com"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block mb-1 font-bold"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="This is optional"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="block mb-1 font-bold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Hi! I'd like to ask about..."
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-yellow-500 text-white px-5 py-2 rounded text-sm hover:bg-yellow-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        
        <div className="flex flex-wrap justify-between mt-10 pt-5 border-t border-gray-300 text-sm text-gray-600">
          <p>🌟 High-quality crafted from top materials</p>
          <p>🛡️ Warranty Protection Over 2 years</p>
          <p>🚚 Free Shipping Order over $150</p>
          <p>📞 24/7 Dedicated Support</p>
        </div>
      </div>
    </>
  );
};

export default Contact;

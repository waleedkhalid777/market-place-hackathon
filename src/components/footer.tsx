import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white p-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 flex-wrap border border-gray-700">
        {/* Logo Section */}
        <div className="text-2xl font-bold">Funiro</div>

        
        <p className="text-center md:text-left">
          400 University Drive Suite 200 <br />
          Coral Gabies <br />
          FL 33134 USA
        </p>

        
        <div>
          <p className="text-gray-500 mb-2">Links</p>
          <ul className="flex flex-col items-center md:items-start space-y-2 cursor-pointer text-black">
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        
        <div>
          <p className="text-gray-500 mb-2">Help</p>
          <ul className="flex flex-col items-center md:items-start space-y-2 cursor-pointer text-black">
            <li>Payment Option</li>
            <li>Returns</li>
            <li>Privacy Policies</li>
          </ul>
        </div>

        
        <div className="w-full md:w-auto text-center">
          <p className="text-gray-500 mb-2">Newsletter</p>
          <form
            action="#"
            method="POST"
            className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0"
          >
            <input
              type="email"
              className="px-4 py-2 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600 md:rounded-l-md md:rounded-r-none"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md md:rounded-l-none md:rounded-r-md hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        
        <div className="w-full text-center mt-4 md:mt-0 text-gray-500 text-sm">
          © {new Date().getFullYear()} Funiro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;

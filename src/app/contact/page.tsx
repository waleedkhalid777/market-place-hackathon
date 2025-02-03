"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill out all required fields.");
      return;
    }

    // Simulate form submission
    setFormStatus("Submitting...");

    // Fake API call
    setTimeout(() => {
      setFormStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="relative h-80 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
          <motion.h1
            className="text-4xl font-bold text-black"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Contact
          </motion.h1>
          <motion.div
            className="flex justify-center mt-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <h2 className="text-xl font-bold text-black">Home</h2>
            <MdKeyboardArrowRight className="text-2xl text-black mx-2" />
            <h2 className="text-xl font-bold text-black">contact</h2>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="font-sans p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h1 className="text-2xl text-center mb-1">Get In Touch With Us</h1>
        <p className="text-red-500 text-center mb-5">
          For more information about our product & services, please feel free
          to drop us an email. Our staff will always be there to help you out.
          Do not hesitate!
        </p>

        <div className="flex flex-wrap justify-between mt-5">
          <motion.div
            className="w-full md:w-2/5 leading-7 text-sm text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
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
          </motion.div>

          <div className="w-full md:w-1/2 p-5 border border-gray-300 rounded bg-white">
            <form onSubmit={handleSubmit}>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <label htmlFor="name" className="block mb-1 font-bold">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Abc"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 1 }}
              >
                <label htmlFor="email" className="block mb-1 font-bold">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Abc@def.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 1 }}
              >
                <label htmlFor="subject" className="block mb-1 font-bold">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="This is optional"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </motion.div>

              <motion.div
                className="mb-5"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                <label htmlFor="message" className="block mb-1 font-bold">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Hi! I'd like to ask about..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="bg-yellow-500 text-white px-5 py-2 rounded text-sm hover:bg-yellow-600"
                whileHover={{ scale: 1.1 }} // Slight zoom on hover
                whileTap={{ scale: 0.95 }} // Tap effect
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                Submit
              </motion.button>
            </form>

            {/* Display form status */}
            {formStatus && (
              <motion.p
                className={`mt-4 text-sm ${
                  formStatus.includes("Thank you")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
              >
                {formStatus}
              </motion.p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-10 pt-5 border-t border-gray-300 text-sm text-gray-600">
          <p>🌟 High-quality crafted from top materials</p>
          <p>🛡️ Warranty Protection Over 2 years</p>
          <p>🚚 Free Shipping Order over $150</p>
          <p>📞 24/7 Dedicated Support</p>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;

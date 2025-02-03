"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Client from "@/sanity/lib/sanityclient";
import Link from "next/link";

// Define the product type
type Product = {
  id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  tags?: string[];
  discountPercentage?: number;
  isNew?: boolean;
};

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {
          _id,
          title,
          description,
          "image": productImage.asset->url,
          price,
          tags,
          discountPercentage,
          isNew
        }`;
        const data = await Client.fetch(query);
        setProducts(
          data.map((product: any) => ({
            ...product,
            id: product._id,
          }))
        );
      } catch (error) {
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  if (!isClient) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      {notification && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
      {/* Products Section */}
      <h1 className="text-black font-poppins text-2xl text-center py-10">Our Products</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }} // Initial animation state
        animate={{ opacity: 1 }} // Final animation state
        transition={{ duration: 1 }} // Transition duration
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="relative text-center group max-w-full"
            initial={{ opacity: 0, y: 50 }} // Initial animation for each product
            whileInView={{ opacity: 1, y: 0 }} // Final animation when the element comes into view
            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }} // Staggered delay for each product
            viewport={{ once: true }} // Animate only once when in view
          >
            <div className="w-full h-72 overflow-hidden bg-gray-100 relative">
              {product.image ? (
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }} // Zoom in effect on hover
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }} // Slight scale-up effect for hover button
              >
                <Link href={`/product/${product.id}`}>
                  <button className="text-red-600 font-bold px-4 py-2 bg-white hover:bg-gray-200">
                    Add to Cart
                  </button>
                </Link>
              </motion.div>
            </div>
            <div className="bg-gray-200 w-full text-left p-4">
              <h3 className="text-lg text-gray-800 font-bold">{product.title}</h3>
              <p className="text-sm text-gray-600">
                {product.description.length > 100
                  ? product.description.slice(0, 100) + "..."
                  : product.description}
              </p>
              <h3 className="text-lg font-medium text-red-600">Rp {product.price}</h3>
              {product.isNew && (
                <span className="text-xs text-green-500 font-semibold">New Arrival</span>
              )}
              {product.discountPercentage && (
                <span className="text-xs text-blue-500 font-semibold">
                  {product.discountPercentage}% Off
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Product;

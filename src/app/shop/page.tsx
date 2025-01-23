"use client";
import React, { useEffect, useState } from "react";
import Client from "@/sanity/lib/sanityclient";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPercentage?: number;
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {
          _id,
          title,
          description,
          "image": productImage.asset->url,
          price,
          discountPercentage
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

  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/shop.jpg"
            alt="Shop Hero Background"
            layout="fill"
            objectFit="cover"
            priority={true}
            className="z-0 blur-[3px]"
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-black">Shop</h1>
          <div className="flex justify-center mt-2">
            <h2 className="text-xl font-bold text-black">Home</h2>
            <MdKeyboardArrowRight className="text-2xl text-black mx-2" />
            <h2 className="text-xl font-bold text-black">Shop</h2>
          </div>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-black font-poppins text-2xl text-center py-10">
          All Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const discountedPrice = product.discountPercentage
              ? product.price - (product.price * (product.discountPercentage / 100))
              : product.price;

            return (
              <div key={product.id} className="relative text-center group max-w-full">
                <div className="w-full h-72 overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                    <Link href={`/product/${product.id}`} passHref>
                      <button className="text-white font-bold px-4 py-2 bg-blue-600 hover:bg-blue-500">
                        Add to Cart
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="bg-gray-200 w-full text-left p-4">
                  <h3 className="text-lg text-gray-800 font-bold">{product.title}</h3>
                  <p className="text-sm text-gray-600">{truncateDescription(product.description)}</p>
                  <div className="flex items-center justify-between">
                    {product.discountPercentage && (
                      <span className="text-sm text-red-500 line-through">
                        Rp {product.price.toLocaleString()}
                      </span>
                    )}
                    <h3 className="text-lg font-medium text-red-600">
                      Rp {discountedPrice.toLocaleString()}
                    </h3>
                  </div>
                 
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
